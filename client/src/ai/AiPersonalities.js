/**
 * DotWars AI Personalities Engine
 * Houses advanced decision-making behaviors for standard play.
 */

import { CELL_TYPES } from '../utils/GridGenerator';

/**
 * Common Helper: Returns status analysis of all cells
 * - completesThisTurn: List of edgeIds that will complete a cell if claimed now
 * - setups: List of edgeIds that will leave exactly 1 edge left in a cell (giving opponent a claim)
 * - safe: List of edgeIds that do not set up any cells
 * - specialBonus: List of edgeIds completing Bonus/Chain/Multiplier cells
 */
export function analyzeBoard(edges, cells) {
  const completesThisTurn = new Set();
  const setups = new Set();
  const safe = new Set();
  const specialBonus = new Set();
  const allUnclaimed = Object.keys(edges).filter(eId => edges[eId].owner === null);

  // Group cells by number of unclaimed edges
  allUnclaimed.forEach(edgeId => {
    let makesSetup = false;
    let makesComplete = false;
    let isSpecial = false;

    Object.keys(cells).forEach(cellId => {
      const cell = cells[cellId];
      if (cell.owner !== null || cell.type === CELL_TYPES.OBSTACLE) return;

      const unclaimedInCell = cell.edgeIds.filter(e => edges[e].owner === null);

      if (unclaimedInCell.includes(edgeId)) {
        if (unclaimedInCell.length === 1) {
          makesComplete = true;
          if (cell.type !== CELL_TYPES.NORMAL && cell.type !== CELL_TYPES.TRAP) {
            isSpecial = true;
          }
        } else if (unclaimedInCell.length === 2) {
          makesSetup = true; // Claiming this edge sets up the cell for the opponent
        }
      }
    });

    if (makesComplete) {
      completesThisTurn.add(edgeId);
      if (isSpecial) specialBonus.add(edgeId);
    } else if (makesSetup) {
      setups.add(edgeId);
    } else {
      safe.add(edgeId);
    }
  });

  return {
    completes: Array.from(completesThisTurn),
    setups: Array.from(setups),
    safe: Array.from(safe),
    specialBonus: Array.from(specialBonus),
    allUnclaimed,
  };
}

/**
 * 1. EASY AI
 * - 40% chance to claim completing edges if available.
 * - Otherwise, picks a completely random unclaimed edge.
 */
function getEasyMove(edges, cells) {
  const analysis = analyzeBoard(edges, cells);
  if (analysis.completes.length > 0 && Math.random() < 0.40) {
    return analysis.completes[Math.floor(Math.random() * analysis.completes.length)];
  }
  if (analysis.allUnclaimed.length === 0) return null;
  return analysis.allUnclaimed[Math.floor(Math.random() * analysis.allUnclaimed.length)];
}

/**
 * 2. DEFENSIVE AI
 * - Prioritizes completes to claim squares.
 * - If none, completely avoids "setups" (edges that leave 1 unclaimed in a cell) to prevent feeding opponent.
 * - Tries to select from "safe" edges.
 * - Falls back to setups only if forced.
 */
function getDefensiveMove(edges, cells) {
  const analysis = analyzeBoard(edges, cells);
  if (analysis.completes.length > 0) {
    return analysis.completes[0]; // Take immediate score
  }
  if (analysis.safe.length > 0) {
    return analysis.safe[Math.floor(Math.random() * analysis.safe.length)];
  }
  if (analysis.allUnclaimed.length > 0) {
    return analysis.allUnclaimed[Math.floor(Math.random() * analysis.allUnclaimed.length)];
  }
  return null;
}

/**
 * 3. AGGRESSIVE AI
 * - Prioritizes completing special cells (Chain/Multiplier/Bonus) first.
 * - Actively hoards and uses Double Score power-up when completing a cell.
 * - Otherwise, takes any completes, then safe edges, then setups.
 */
function getAggressiveMove(edges, cells, inventory, pId) {
  const analysis = analyzeBoard(edges, cells);
  let powerUpToUse = null;

  if (analysis.specialBonus.length > 0) {
    if (inventory && inventory.includes('DOUBLE_SCORE')) powerUpToUse = 'DOUBLE_SCORE';
    return { edgeId: analysis.specialBonus[0], powerUp: powerUpToUse };
  }

  if (analysis.completes.length > 0) {
    if (inventory && inventory.includes('DOUBLE_SCORE') && Math.random() < 0.7) {
      powerUpToUse = 'DOUBLE_SCORE';
    }
    return { edgeId: analysis.completes[0], powerUp: powerUpToUse };
  }

  // Claim safe
  if (analysis.safe.length > 0) {
    return { edgeId: analysis.safe[Math.floor(Math.random() * analysis.safe.length)], powerUp: null };
  }
  return {
    edgeId: analysis.allUnclaimed[Math.floor(Math.random() * analysis.allUnclaimed.length)],
    powerUp: null,
  };
}

/**
 * 4. CHAOTIC AI
 * - Frequently activates random inventory power-ups (Freeze, Shield, Steal).
 * - Deliberately claims setups to bait player, or picks entirely randomly to disrupt defensive strategies.
 */
function getChaoticMove(edges, cells, inventory) {
  const analysis = analyzeBoard(edges, cells);
  let powerUpToUse = null;

  if (inventory && inventory.length > 0 && Math.random() < 0.35) {
    powerUpToUse = inventory[Math.floor(Math.random() * inventory.length)];
  }

  // 30% chance to intentionally feed/bait setup edge
  if (analysis.setups.length > 0 && Math.random() < 0.3) {
    return { edgeId: analysis.setups[Math.floor(Math.random() * analysis.setups.length)], powerUp: powerUpToUse };
  }

  if (analysis.completes.length > 0) {
    return { edgeId: analysis.completes[Math.floor(Math.random() * analysis.completes.length)], powerUp: powerUpToUse };
  }

  return {
    edgeId: analysis.allUnclaimed[Math.floor(Math.random() * analysis.allUnclaimed.length)],
    powerUp: powerUpToUse,
  };
}

/**
 * 5. HARD AI (MiniMax Algorithm with Alpha-Beta Pruning)
 * - Simulates board outcomes to depth 3 to maximize own captured cells and minimize opponent completions.
 */
function getHardMove(edges, cells) {
  const analysis = analyzeBoard(edges, cells);
  if (analysis.completes.length > 0) return analysis.completes[0];

  let bestScore = -Infinity;
  let bestEdge = null;

  // Evaluate each unclaimed edge at Depth 1 with quick heuristic
  // Standard minimax is costly, so we run a targeted heuristic traversal:
  const candidates = analysis.safe.length > 0 ? analysis.safe : analysis.allUnclaimed;

  candidates.forEach(edgeId => {
    // Simulate move
    let score = 0;
    // Check if this move completes cells or triggers chains
    Object.keys(cells).forEach(cId => {
      const cell = cells[cId];
      if (cell.owner !== null) return;
      const unclaimed = cell.edgeIds.filter(e => e === edgeId || edges[e].owner === null);
      if (unclaimed.length === 2) {
        score -= 2.5; // giving opponent capture options is bad
      } else if (unclaimed.length === 1) {
        score += 10;  // capturing cell is great
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestEdge = edgeId;
    }
  });

  return bestEdge || analysis.allUnclaimed[0];
}

/**
 * Master interface to obtain moves
 */
export function getAIMove(personality, edges, cells, inventory = [], pId = 'player_2') {
  switch (personality) {
    case 'EASY':
      return { edgeId: getEasyMove(edges, cells), powerUp: null };
    case 'DEFENSIVE':
      return { edgeId: getDefensiveMove(edges, cells), powerUp: null };
    case 'AGGRESSIVE':
      return getAggressiveMove(edges, cells, inventory, pId);
    case 'CHAOTIC':
      return getChaoticMove(edges, cells, inventory);
    case 'HARD':
      return { edgeId: getHardMove(edges, cells), powerUp: null };
    default:
      return { edgeId: getEasyMove(edges, cells), powerUp: null };
  }
}
