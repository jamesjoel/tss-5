import { create } from 'zustand';
import { generateGrid, CELL_TYPES, getEdgeId } from '../utils/GridGenerator';

export const GAME_MODES = {
  ONLINE_PVP: 'ONLINE_PVP',
  FRIEND: 'FRIEND',
  LOCAL: 'LOCAL',
  AI: 'AI',
  COOP: 'COOP',
  PUZZLE: 'PUZZLE',
  BLITZ: 'BLITZ',
  CAMPAIGN: 'CAMPAIGN',
  BOSS: 'BOSS',
};

export const GAME_STATUS = {
  IDLE: 'IDLE',
  MATCHMAKING: 'MATCHMAKING',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ENDED: 'ENDED',
};

export const POWERUPS = {
  DOUBLE_SCORE: 'DOUBLE_SCORE',   // Doubles next score
  FREEZE_OPPONENT: 'FREEZE_OPPONENT', // Forces opponent to skip turn
  STEAL_SQUARE: 'STEAL_SQUARE',   // Steals an opponent's captured cell
  SHIELD: 'SHIELD',               // Shields a cell from being stolen or captured by opponent
  TIME_BONUS: 'TIME_BONUS',       // Adds 15 seconds to turn timer
  GHOST_LINE: 'GHOST_LINE',       // Standard line claim that doesn't trigger standard completion checks
};

const INITIAL_STATE = {
  gridState: { nodes: {}, edges: {}, cells: {} },
  gameMode: GAME_MODES.LOCAL,
  gameStatus: GAME_STATUS.IDLE,
  players: ['player_1', 'player_2'], // up to 4 for coop: ['player_1', 'player_2', 'player_3', 'player_4']
  currentPlayer: 'player_1',
  scores: { player_1: 0, player_2: 0, player_3: 0, player_4: 0 },
  combos: {
    activePlayer: null,
    streak: 0,
    multiplier: 1,
  },
  powerUpsInventory: {
    player_1: [POWERUPS.DOUBLE_SCORE, POWERUPS.FREEZE_OPPONENT],
    player_2: [POWERUPS.SHIELD, POWERUPS.STEAL_SQUARE],
    player_3: [],
    player_4: [],
  },
  activePowerUps: {
    frozenPlayer: null,
    doubleScore: null, // playerId having active double score
    shields: {}, // cellId -> playerId who shielded it
  },
  undoTokens: {
    player_1: 3,
    player_2: 3,
  },
  timers: {
    turnLimit: 30, // seconds
    turnTimeLeft: 30,
    matchTimeElapsed: 0,
  },
  matchHistory: [], // stack of states for undo
  winner: null,
  activeParticles: [], // { id, x, y, color }
};

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  /**
   * Reset game state completely
   */
  resetGame: () => set(INITIAL_STATE),

  /**
   * Initialize a new game session with grid type, dimensions, and game mode
   */
  initGame: (mode, gridType, rows = 5, cols = 5, customPlayers = null) => {
    const grid = generateGrid(gridType, rows, cols);
    const playersList = customPlayers || (mode === GAME_MODES.COOP ? ['player_1', 'player_2', 'player_3'] : ['player_1', 'player_2']);

    const defaultScores = {};
    const defaultInventory = {};
    const defaultUndo = {};
    playersList.forEach(p => {
      defaultScores[p] = 0;
      defaultInventory[p] = [POWERUPS.DOUBLE_SCORE, POWERUPS.FREEZE_OPPONENT, POWERUPS.STEAL_SQUARE];
      defaultUndo[p] = 2; // two undo tokens
    });

    set({
      ...INITIAL_STATE,
      gridState: grid,
      gameMode: mode,
      gameStatus: GAME_STATUS.ACTIVE,
      players: playersList,
      currentPlayer: playersList[0],
      scores: defaultScores,
      powerUpsInventory: defaultInventory,
      undoTokens: defaultUndo,
      matchHistory: [],
    });

    // Start timer interval
    get().startTimers();
  },

  /**
   * Timers core loop
   */
  startTimers: () => {
    if (get().timerInterval) clearInterval(get().timerInterval);

    const interval = setInterval(() => {
      const { gameStatus, timers, currentPlayer, players } = get();
      if (gameStatus !== GAME_STATUS.ACTIVE) {
        clearInterval(interval);
        return;
      }

      const nextTimeLeft = timers.turnTimeLeft - 1;
      if (nextTimeLeft <= 0) {
        // Turn Timeout: force turn cycle
        const nextIdx = (players.indexOf(currentPlayer) + 1) % players.length;
        set({
          currentPlayer: players[nextIdx],
          timers: {
            ...timers,
            turnTimeLeft: timers.turnLimit,
            matchTimeElapsed: timers.matchTimeElapsed + 1,
          },
          combos: { activePlayer: null, streak: 0, multiplier: 1 },
        });
      } else {
        set({
          timers: {
            ...timers,
            turnTimeLeft: nextTimeLeft,
            matchTimeElapsed: timers.matchTimeElapsed + 1,
          },
        });
      }
    }, 1000);

    set({ timerInterval: interval });
  },

  /**
   * Save snapshot of grid, scores, and active players to history for Undo operations
   */
  pushHistory: () => {
    const { gridState, scores, currentPlayer, combos, activePowerUps, undoTokens } = get();
    // Deep clone state definitions
    const snapshot = JSON.stringify({
      gridState,
      scores,
      currentPlayer,
      combos,
      activePowerUps,
      undoTokens: { ...undoTokens },
    });
    set(state => ({
      matchHistory: [...state.matchHistory, snapshot],
    }));
  },

  /**
   * Execute Undo action using tokens
   */
  useUndo: (playerId) => {
    const { undoTokens, matchHistory } = get();
    if (undoTokens[playerId] <= 0 || matchHistory.length === 0) return false;

    const previousSnapshots = [...matchHistory];
    const targetSnap = previousSnapshots.pop();
    const restoredState = JSON.parse(targetSnap);

    set(state => ({
      gridState: restoredState.gridState,
      scores: restoredState.scores,
      currentPlayer: restoredState.currentPlayer,
      combos: restoredState.combos,
      activePowerUps: restoredState.activePowerUps,
      undoTokens: {
        ...restoredState.undoTokens,
        [playerId]: undoTokens[playerId] - 1, // Decrement token
      },
      matchHistory: previousSnapshots,
    }));
    return true;
  },

  /**
   * Claim an edge by ID and evaluate box captures
   */
  claimEdge: (edgeId, playerId) => {
    const { gridState, currentPlayer, players, scores, combos, activePowerUps, timers, gameStatus } = get();
    if (gameStatus !== GAME_STATUS.ACTIVE) return;

    const edge = gridState.edges[edgeId];
    if (!edge || edge.owner !== null) return;

    // Check if player is frozen
    if (activePowerUps.frozenPlayer === playerId) {
      set(state => ({
        activePowerUps: { ...state.activePowerUps, frozenPlayer: null },
      }));
      // Cycle turn immediately
      const nextIdx = (players.indexOf(playerId) + 1) % players.length;
      set({ currentPlayer: players[nextIdx] });
      return;
    }

    // 1. Push history before modification
    get().pushHistory();

    // 2. Mark edge owner
    const updatedEdges = {
      ...gridState.edges,
      [edgeId]: { ...edge, owner: playerId },
    };

    let cellsCaptured = [];
    const updatedCells = { ...gridState.cells };
    const updatedScores = { ...scores };
    const activeShields = activePowerUps.shields || {};

    // 3. Evaluate adjacent cells
    Object.keys(updatedCells).forEach(cId => {
      const cell = updatedCells[cId];
      if (cell.owner !== null || cell.type === CELL_TYPES.OBSTACLE) return;

      // Check if all edges are claimed
      const allClaimed = cell.edgeIds.every(eId => updatedEdges[eId] && updatedEdges[eId].owner !== null);
      if (allClaimed) {
        // Check Shield status
        if (activeShields[cId] && activeShields[cId] !== playerId) {
          // Shielded! Ownership transfers to the shield creator instead of the completer!
          const shieldOwner = activeShields[cId];
          updatedCells[cId] = { ...cell, owner: shieldOwner };
          cellsCaptured.push({ id: cId, owner: shieldOwner, wasShielded: true });
        } else {
          updatedCells[cId] = { ...cell, owner: playerId };
          cellsCaptured.push({ id: cId, owner: playerId, wasShielded: false });
        }
      }
    });

    // 4. Score Math & Special Cell trigger execution
    let newStreak = combos.streak;
    let newMultiplier = combos.multiplier;
    let turnMaintained = false;

    if (cellsCaptured.length > 0) {
      turnMaintained = true;
      cellsCaptured.forEach(captured => {
        const owner = captured.owner;
        const cell = updatedCells[captured.id];
        let cellBasePoints = 10;

        // Apply cell properties
        if (cell.type === CELL_TYPES.BONUS) {
          cellBasePoints += 15; // bonus points
        } else if (cell.type === CELL_TYPES.TRAP) {
          cellBasePoints = -10; // trap card
          newStreak = 0;
          newMultiplier = 1;
          turnMaintained = false; // hit a trap, forfeit bonus turn!
        } else if (cell.type === CELL_TYPES.MULTIPLIER) {
          newMultiplier += 1;
        }

        // Apply Double Score powerup
        let scoreVal = cellBasePoints;
        if (activePowerUps.doubleScore === owner) {
          scoreVal *= 2;
        }

        // Apply streak combo multiplier
        if (cell.type !== CELL_TYPES.TRAP) {
          newStreak += 1;
          if (newStreak % 2 === 0) {
            newMultiplier += 1;
          }
          scoreVal *= newMultiplier;
        }

        updatedScores[owner] = (updatedScores[owner] || 0) + scoreVal;

        // Chain reactions and particles are disabled until the core board loop is stable on device.
      });

      // Clear double points usage
      if (activePowerUps.doubleScore === playerId) {
        set(state => ({
          activePowerUps: { ...state.activePowerUps, doubleScore: null },
        }));
      }
    } else {
      // No cells completed this turn
      newStreak = 0;
      newMultiplier = 1;
    }

    // 5. Turn allocation cycling
    let nextPlayer = currentPlayer;
    if (!turnMaintained) {
      const currentIdx = players.indexOf(currentPlayer);
      nextPlayer = players[(currentIdx + 1) % players.length];
    }

    set({
      gridState: {
        ...gridState,
        edges: updatedEdges,
        cells: updatedCells,
      },
      scores: updatedScores,
      currentPlayer: nextPlayer,
      combos: {
        activePlayer: turnMaintained ? currentPlayer : null,
        streak: newStreak,
        multiplier: newMultiplier,
      },
      timers: {
        ...timers,
        turnTimeLeft: timers.turnLimit,
      },
    });

    // 6. Check Win conditions
    const allCaptured = Object.keys(updatedCells).every(cId => {
      const cell = updatedCells[cId];
      return cell.owner !== null || cell.type === CELL_TYPES.OBSTACLE;
    });

    if (allCaptured) {
      clearInterval(get().timerInterval);
      // Determine highest score winner
      let highestScore = -9999;
      let winnerId = null;
      Object.keys(updatedScores).forEach(pId => {
        if (updatedScores[pId] > highestScore) {
          highestScore = updatedScores[pId];
          winnerId = pId;
        }
      });

      set({
        gameStatus: GAME_STATUS.ENDED,
        winner: winnerId,
      });
    }
  },

  /**
   * Activate specific inventory powerups
   */
  activatePowerUp: (powerUpType, playerId) => {
    const { powerUpsInventory, activePowerUps, timers } = get();
    const inventory = powerUpsInventory[playerId] || [];
    const index = inventory.indexOf(powerUpType);

    if (index === -1) return false; // not owned

    // Remove from inventory
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);

    const nextActivePowerUps = { ...activePowerUps };

    switch (powerUpType) {
      case POWERUPS.DOUBLE_SCORE:
        nextActivePowerUps.doubleScore = playerId;
        break;

      case POWERUPS.FREEZE_OPPONENT:
        // Set opponent to freeze on their next move execution
        const opponentId = get().players.find(p => p !== playerId);
        nextActivePowerUps.frozenPlayer = opponentId;
        break;

      case POWERUPS.TIME_BONUS:
        set({
          timers: {
            ...timers,
            turnTimeLeft: Math.min(timers.turnTimeLeft + 15, timers.turnLimit),
          },
        });
        break;

      case POWERUPS.SHIELD:
        // Shields a random uncaptured cell
        const unownedCells = Object.keys(get().gridState.cells).filter(c => get().gridState.cells[c].owner === null);
        if (unownedCells.length > 0) {
          const targetCell = unownedCells[Math.floor(Math.random() * unownedCells.length)];
          nextActivePowerUps.shields = {
            ...nextActivePowerUps.shields,
            [targetCell]: playerId,
          };
        }
        break;

      case POWERUPS.STEAL_SQUARE:
        // Instantly steals one random opponent square if available
        const opponentSquares = Object.keys(get().gridState.cells).filter(
          c => get().gridState.cells[c].owner !== null && get().gridState.cells[c].owner !== playerId
        );
        if (opponentSquares.length > 0) {
          const targetCellId = opponentSquares[Math.floor(Math.random() * opponentSquares.length)];
          const previousOwner = get().gridState.cells[targetCellId].owner;

          // Shift cell ownership
          const updatedCells = {
            ...get().gridState.cells,
            [targetCellId]: { ...get().gridState.cells[targetCellId], owner: playerId },
          };

          // Re-balance points
          const updatedScores = {
            ...get().scores,
            [previousOwner]: Math.max(0, (get().scores[previousOwner] || 0) - 10),
            [playerId]: (get().scores[playerId] || 0) + 10,
          };

          set(state => ({
            gridState: { ...state.gridState, cells: updatedCells },
            scores: updatedScores,
          }));
        }
        break;

      default:
        break;
    }

    set(state => ({
      powerUpsInventory: {
        ...state.powerUpsInventory,
        [playerId]: updatedInventory,
      },
      activePowerUps: nextActivePowerUps,
    }));

    return true;
  },

  /**
   * Spawn dynamic particles on captures
   */
  spawnParticles: (x, y, color) => {
    const id = `p_${Date.now()}_${Math.random()}`;
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI / 6) * i;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        id: `${id}_${i}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1.0,
      });
    }

    set(state => ({
      activeParticles: [...state.activeParticles, ...newParticles],
    }));

    // Trigger particle physics step
    if (!get().particlesActive) {
      get().updateParticles();
    }
  },

  updateParticles: () => {
    set({ particlesActive: true });
    const interval = setInterval(() => {
      const { activeParticles } = get();
      if (activeParticles.length === 0) {
        clearInterval(interval);
        set({ particlesActive: false });
        return;
      }

      const nextParticles = activeParticles
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15, // gravity effect
          life: p.life - 0.08,
        }))
        .filter(p => p.life > 0);

      set({ activeParticles: nextParticles });
    }, 30);
  },
}));
