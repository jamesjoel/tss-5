import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import COLORS from '../constants/Colors';
import { useGameStore, GAME_MODES, GAME_STATUS } from '../store/useGameStore';
import GameBoard from '../components/GameBoard';
import PowerUpBar from '../components/PowerUpBar';
import GlassCard from '../components/GlassCard';
import { getAIMove } from '../ai/AiPersonalities';
import { getBossMove, corruptorAction, hiveMindSpread, BOSS_TYPES } from '../ai/BossMechanics';

/**
 * GameScreen Component
 * The central playing field of DotWars, tying state to interactive AI or Boss scripts.
 */
export const GameScreen = ({ route, navigation }) => {
  const difficulty = route?.params?.difficulty || 'HARD';
  const bossType = route?.params?.bossType || null;
  const sessionConfig = route?.params?.sessionConfig || null;

  const {
    gridState,
    gameMode,
    gameStatus,
    currentPlayer,
    scores,
    combos,
    timers,
    winner,
    claimEdge,
    useUndo,
    undoTokens,
    resetGame,
    powerUpsInventory,
    activatePowerUp,
  } = useGameStore();

  // 1. Trigger local AI/Boss moves
  useEffect(() => {
    if (gameStatus !== GAME_STATUS.ACTIVE) return;

    const isAITurn = currentPlayer === 'player_2' || currentPlayer === 'boss_bot';
    if (!isAITurn) return;

    const aiDelay = setTimeout(() => {
      const activeState = useGameStore.getState();

      if (gameMode === GAME_MODES.AI) {
        // Execute AI Personality move
        const { edgeId, powerUp } = getAIMove(
          difficulty,
          activeState.gridState.edges,
          activeState.gridState.cells,
          activeState.powerUpsInventory.player_2,
          'player_2'
        );

        if (powerUp) {
          activeState.activatePowerUp(powerUp, 'player_2');
        }
        if (edgeId) {
          activeState.claimEdge(edgeId, 'player_2');
        }
      } else if (gameMode === GAME_MODES.BOSS) {
        const bossId = 'boss_bot';
        
        // Execute Corruptor line deletion trigger (if selected)
        if (bossType === BOSS_TYPES.CORRUPTOR) {
          const corruptedEdge = corruptorAction(
            activeState.gridState,
            (newGrid) => useGameStore.setState({ gridState: newGrid }),
            (newScores) => useGameStore.setState({ scores: newScores }),
            activeState.scores
          );
          if (corruptedEdge) {
            // Log warning or effect
            console.log(`Corruptor vaporized edge ${corruptedEdge}`);
          }
        }

        // Standard AI-driven boss claim
        const { edgeId } = getBossMove(bossType, activeState.gridState, [], bossId);
        
        if (edgeId) {
          activeState.claimEdge(edgeId, bossId);

          // Execute Hive Mind propagation
          if (bossType === BOSS_TYPES.HIVE_MIND) {
            // Find if any cell was captured by boss
            const afterState = useGameStore.getState();
            Object.keys(afterState.gridState.cells).forEach(cId => {
              if (afterState.gridState.cells[cId].owner === bossId) {
                hiveMindSpread(
                  afterState.gridState,
                  cId,
                  bossId,
                  (e, id) => afterState.claimEdge(e, id)
                );
              }
            });
          }
        }
      }
    }, 1000);

    return () => clearTimeout(aiDelay);
  }, [currentPlayer, gameStatus, gameMode, difficulty, bossType]);

  // 2. Watch for Game End
  useEffect(() => {
    if (gameStatus === GAME_STATUS.ENDED) {
      navigation.replace('Winner', {
        winner,
        scores,
        gameMode,
        bossType,
        sessionConfig,
      });
    }
  }, [gameStatus, winner, scores, gameMode, bossType, sessionConfig, navigation]);

  const activeColor = COLORS.players[currentPlayer] || COLORS.cyan;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
      {/* HUD HEADER */}
      <View style={styles.hudHeader}>
        <TouchableOpacity
          style={styles.quitBtn}
          onPress={() => {
            resetGame();
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.quitText}>◀ RETREAT</Text>
        </TouchableOpacity>
        
        <Text style={styles.modeLabel} numberOfLines={1}>
          {gameMode} MODE {bossType ? `[${bossType} BOSS]` : ''}
        </Text>
      </View>

      {/* SCOREBOARD BOARD */}
      <View style={styles.scoreboardRow}>
        <GlassCard style={[styles.scoreCard, currentPlayer === 'player_1' && { borderColor: COLORS.cyan }]}>
          <Text style={[styles.scorePlayer, { color: COLORS.cyan }]} numberOfLines={1}>PLAYER 1</Text>
          <Text style={styles.scoreVal} numberOfLines={1}>{scores.player_1} PTS</Text>
          {combos.activePlayer === 'player_1' && combos.multiplier > 1 && (
            <Text style={[styles.comboBadge, { color: COLORS.green }]} numberOfLines={1}>
              ✖{combos.multiplier} COMBO
            </Text>
          )}
        </GlassCard>

        <View style={styles.timerCircle}>
          <Text style={[styles.timerText, { color: activeColor }]}>{timers.turnTimeLeft}S</Text>
          <Text style={styles.timerLabel}>TURN</Text>
        </View>

        <GlassCard
          style={[
            styles.scoreCard,
            (currentPlayer === 'player_2' || currentPlayer === 'boss_bot') && { borderColor: COLORS.magenta },
          ]}
        >
          <Text style={[styles.scorePlayer, { color: COLORS.magenta }]} numberOfLines={1}>
            {gameMode === GAME_MODES.AI ? 'AI BOT' : gameMode === GAME_MODES.BOSS ? 'BOSS' : 'P2'}
          </Text>
          <Text style={styles.scoreVal} numberOfLines={1}>{scores.player_2 || scores.boss_bot || 0} PTS</Text>
          {combos.activePlayer !== 'player_1' && combos.activePlayer !== null && combos.multiplier > 1 && (
            <Text style={[styles.comboBadge, { color: COLORS.green }]} numberOfLines={1}>
              ✖{combos.multiplier} COMBO
            </Text>
          )}
        </GlassCard>
      </View>

      {/* ACTIVE TURN CARD */}
      <View style={styles.turnCard}>
        <Text style={styles.turnPrompt}>ACTIVE COMMAND OVERVIEW:</Text>
        <Text style={[styles.turnName, { color: activeColor, textShadowColor: activeColor }]} numberOfLines={1}>
          {currentPlayer === 'player_1' ? 'YOUR TACTICAL TURN' : "OPPONENT'S MOVE SIMULATION"}
        </Text>
      </View>

      {/* GAME MATRIX BOARD */}
      <GameBoard />

      {/* INVENTORY PANEL */}
      {gameMode !== GAME_MODES.LOCAL && <PowerUpBar />}

      {/* UTILITY TOKENS ROW */}
      <View style={styles.utilityRow}>
        <TouchableOpacity
          style={styles.undoBtn}
          onPress={() => {
            const success = useUndo('player_1');
            if (!success) {
              Alert.alert('ACTION BLOCKED', 'No Undo tokens remaining or no previous state recorded.');
            }
          }}
        >
          <Text style={styles.undoText} numberOfLines={1}>↩ SECURE UNDO ({undoTokens.player_1})</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  hudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 6,
  },
  quitBtn: {
    padding: 6,
  },
  quitText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
  },
  modeLabel: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.purple,
    letterSpacing: 2,
    marginLeft: 12,
    textAlign: 'right',
  },
  scoreboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  scoreCard: {
    flex: 1,
    minHeight: 72,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.border,
  },
  scorePlayer: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  scoreVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  comboBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
  },
  timerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(23, 11, 41, 0.6)',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginHorizontal: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'black',
  },
  timerLabel: {
    fontSize: 7,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginTop: 2,
  },
  turnCard: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  turnPrompt: {
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  turnName: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  utilityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  undoBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
  },
  undoText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
});

export default GameScreen;
