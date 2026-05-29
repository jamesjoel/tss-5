import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { useGameStore, GAME_MODES } from '../store/useGameStore';

const baseRules = [
  'Tap any unclaimed line on the board to draw it for the active player.',
  'Complete the fourth side of a cell to capture that square and score points.',
  'Capturing a square keeps your turn. Missing a capture passes the turn.',
  'When every available cell is captured, the highest score wins.',
];

const getModeNotes = mode => {
  if (mode === GAME_MODES.AI) {
    return ['You are Player 1. The bot moves automatically after your turn.'];
  }

  if (mode === GAME_MODES.BOSS) {
    return ['You are Player 1. Capture more territory than the boss before the board closes.'];
  }

  if (mode === GAME_MODES.ONLINE_PVP) {
    return ['The app will enter matchmaking first, then launch the board when a rival is found.'];
  }

  if (mode === GAME_MODES.PUZZLE) {
    return ['Solve the challenge by controlling the board better than the opponent.'];
  }

  return ['Pass the device between Player 1 and Player 2 after each turn change.'];
};

export const Instructions = ({ route, navigation }) => {
  const config = route?.params || {};
  const mode = config.mode || GAME_MODES.LOCAL;
  const gridType = config.gridType || 'SQUARE';
  const rows = config.rows || 4;
  const cols = config.cols || 4;
  const difficulty = config.difficulty || 'HARD';
  const bossType = config.bossType || null;
  const customPlayers = config.customPlayers || null;

  const handleStart = () => {
    if (mode === GAME_MODES.ONLINE_PVP) {
      navigation.replace('Matchmaking', { gridType, rows, cols });
      return;
    }

    useGameStore.getState().initGame(mode, gridType, rows, cols, customPlayers);
    navigation.replace('GameScreen', {
      difficulty,
      bossType,
      sessionConfig: {
        mode,
        gridType,
        rows,
        cols,
        difficulty,
        bossType,
        customPlayers,
        challengeTitle: config.challengeTitle,
        challengeDesc: config.challengeDesc,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>MISSION BRIEFING</Text>
          <Text style={styles.title}>HOW TO PLAY</Text>
        </View>

        <GlassCard style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{config.challengeTitle || mode}</Text>
          {config.challengeDesc ? <Text style={styles.summaryDesc}>{config.challengeDesc}</Text> : null}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{gridType}</Text>
            <Text style={styles.metaText}>{rows}x{cols}</Text>
            {mode === GAME_MODES.AI ? <Text style={styles.metaText}>{difficulty}</Text> : null}
            {bossType ? <Text style={styles.metaText}>{bossType}</Text> : null}
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>CORE RULES</Text>
        {[...baseRules, ...getModeNotes(mode)].map((rule, index) => (
          <View key={rule} style={styles.ruleRow}>
            <Text style={styles.ruleNumber}>{index + 1}</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}

        <GlassCard style={styles.tipCard}>
          <Text style={styles.tipTitle}>TACTICAL TIP</Text>
          <Text style={styles.tipText}>
            Avoid giving your opponent a cell with only one open side unless you can force a better capture chain.
          </Text>
        </GlassCard>

        <NeonButton title="START GAME" onPress={handleStart} color={COLORS.cyan} />

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>RETURN TO SETUP</Text>
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
    marginTop: 20,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.cyan,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    marginTop: 4,
    textShadowColor: COLORS.purple,
    textShadowRadius: 8,
  },
  summaryCard: {
    marginBottom: 18,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  summaryDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaText: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: 10,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: 'rgba(23, 11, 41, 0.35)',
    padding: 12,
    marginBottom: 8,
  },
  ruleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    color: COLORS.cyan,
    borderWidth: 1,
    borderColor: COLORS.cyan,
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 10,
  },
  ruleText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  tipCard: {
    marginTop: 12,
    marginBottom: 14,
    borderColor: COLORS.green,
  },
  tipTitle: {
    fontSize: 10,
    color: COLORS.green,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  backBtn: {
    alignItems: 'center',
    padding: 12,
  },
  backText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default Instructions;
