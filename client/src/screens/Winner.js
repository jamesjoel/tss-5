import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { useGameStore } from '../store/useGameStore';

const getWinnerLabel = winner => {
  if (winner === 'player_1') return 'PLAYER 1';
  if (winner === 'player_2') return 'PLAYER 2';
  if (winner === 'boss_bot') return 'BOSS';
  return 'NO WINNER';
};

export const Winner = ({ route, navigation }) => {
  const { winner, scores = {}, gameMode, bossType, sessionConfig } = route?.params || {};
  const winnerLabel = getWinnerLabel(winner);
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const handleHome = () => {
    useGameStore.getState().resetGame();
    navigation.replace('Home');
  };

  const handleReplay = () => {
    useGameStore.getState().resetGame();
    if (sessionConfig) {
      navigation.replace('Instructions', sessionConfig);
      return;
    }
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>SIMULATION COMPLETE</Text>
          <Text style={styles.title}>{winnerLabel} WINS</Text>
          <Text style={styles.modeText}>
            {gameMode} {bossType ? `- ${bossType}` : ''}
          </Text>
        </View>

        <GlassCard style={styles.resultCard}>
          <Text style={styles.resultTitle}>FINAL SCORE</Text>
          {sortedScores.map(([playerId, score], index) => (
            <View
              key={playerId}
              style={[
                styles.scoreRow,
                playerId === winner && { borderColor: COLORS.green, backgroundColor: 'rgba(57, 255, 20, 0.06)' },
              ]}
            >
              <View style={styles.scoreNameWrap}>
                <Text style={[styles.rankText, index === 0 && { color: COLORS.green }]}>#{index + 1}</Text>
                <Text style={[styles.playerName, playerId === winner && { color: COLORS.green }]}>
                  {getWinnerLabel(playerId)}
                </Text>
              </View>
              <Text style={styles.scoreText}>{score || 0} PTS</Text>
            </View>
          ))}
        </GlassCard>

        <GlassCard style={styles.noteCard}>
          <Text style={styles.noteTitle}>MATCH READOUT</Text>
          <Text style={styles.noteText}>
            Replay the same setup from the briefing screen, or return home to choose a new mode and board.
          </Text>
        </GlassCard>

        <NeonButton title="PLAY AGAIN" onPress={handleReplay} color={COLORS.cyan} />

        <TouchableOpacity style={styles.homeBtn} onPress={handleHome}>
          <Text style={styles.homeText}>RETURN HOME</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 22,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.green,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 4,
    marginTop: 6,
    textShadowColor: COLORS.green,
    textShadowRadius: 9,
  },
  modeText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 8,
  },
  resultCard: {
    marginBottom: 14,
  },
  resultTitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  scoreNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    width: 30,
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '900',
  },
  playerName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  noteCard: {
    marginBottom: 14,
    borderColor: COLORS.borderGlass,
  },
  noteTitle: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  noteText: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  homeBtn: {
    alignItems: 'center',
    padding: 12,
  },
  homeText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default Winner;
