import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import { GAME_MODES } from '../store/useGameStore';
import { GRID_TYPES } from '../utils/GridGenerator';

/**
 * Daily Challenge Screen
 * Lists tactical scenarios, puzzle states, and custom objectives.
 */
export const DailyChallenge = ({ navigation }) => {
  const challengesList = [
    {
      id: 'puzzle_1',
      title: 'GRID CONFINEMENT',
      desc: 'Capture all 6 territory cells inside a highly irregular obstructed grid under 8 turns.',
      reward: '💎 200 CYBER CHIPS',
      difficulty: 'NORMAL',
      grid: GRID_TYPES.IRREGULAR,
      size: 4,
    },
    {
      id: 'puzzle_2',
      title: 'HEX REINFORCEMENT',
      desc: 'Defeat Aggressive AI inside a custom Hexagonal matrix where all borders are shielded.',
      reward: '🔋 Steal Square Powerup',
      difficulty: 'CRITICAL',
      grid: GRID_TYPES.HEXAGON,
      size: 3,
    },
    {
      id: 'puzzle_3',
      title: 'TRIANGLE RUSH',
      desc: 'Achieve a 5-step Capture Combo Streak in an equilateral triangle field.',
      reward: '🏆 ELO +25',
      difficulty: 'NIGHTMARE',
      grid: GRID_TYPES.TRIANGLE,
      size: 5,
    },
  ];

  const handleLaunchChallenge = (c) => {
    navigation.navigate('Instructions', {
      mode: GAME_MODES.PUZZLE,
      gridType: c.grid,
      rows: c.size,
      cols: c.size,
      difficulty: 'DEFENSIVE',
      challengeTitle: c.title,
      challengeDesc: c.desc,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>TACTICAL TRIAL MATRIX</Text>
        <Text style={styles.title}>DAILY PUZZLES</Text>
      </View>

      <Text style={styles.sectionTitle}>ACTIVE SCENARIOS</Text>

      {challengesList.map(c => (
        <GlassCard key={c.id} style={styles.challengeCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.challengeTitle}>{c.title}</Text>
            <Text
              style={[
                styles.diffText,
                c.difficulty === 'NORMAL' ? { color: COLORS.green } :
                c.difficulty === 'CRITICAL' ? { color: COLORS.orange } :
                { color: COLORS.trap },
              ]}
            >
              {c.difficulty}
            </Text>
          </View>
          <Text style={styles.challengeDesc}>{c.desc}</Text>
          <Text style={styles.rewardText}>REWARD: {c.reward}</Text>
          
          <TouchableOpacity style={styles.launchBtn} onPress={() => handleLaunchChallenge(c)}>
            <Text style={styles.launchText}>INITIALIZE INTERFACE</Text>
          </TouchableOpacity>
        </GlassCard>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>◀ TERMINATE SYSTEM</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textShadowColor: COLORS.purple,
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.magenta,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 12,
  },
  challengeCard: {
    marginVertical: 8,
    borderColor: COLORS.borderGlass,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  diffText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  challengeDesc: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 6,
    lineHeight: 14,
  },
  rewardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.green,
    letterSpacing: 1.5,
    marginTop: 8,
  },
  launchBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.cyan,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
  },
  launchText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  backBtn: {
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  backText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
});

export default DailyChallenge;
