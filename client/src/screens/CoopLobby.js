import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { GAME_MODES } from '../store/useGameStore';
import { BOSS_TYPES } from '../ai/BossMechanics';
import { GRID_TYPES } from '../utils/GridGenerator';

/**
 * CoopLobby Screen
 * Renders co-op boss battle selection, shared objectives, and mock teammates recruitment.
 */
export const CoopLobby = ({ navigation }) => {
  const [selectedBoss, setSelectedBoss] = useState(BOSS_TYPES.CORRUPTOR);

  const bossesList = [
    {
      id: BOSS_TYPES.CORRUPTOR,
      name: 'CORRUPTOR V.09',
      ability: 'DECAY: Periodically vaporizes claimed lines, wiping cell scores.',
      difficulty: 'CRITICAL',
      color: COLORS.trap,
    },
    {
      id: BOSS_TYPES.TIME_KEEPER,
      name: 'TIME KEEPER ALPHA',
      ability: 'OVERCLOCK: Grants itself extra turns and speeds turn timers.',
      difficulty: 'HARD',
      color: COLORS.yellow,
    },
    {
      id: BOSS_TYPES.HIVE_MIND,
      name: 'HIVE MIND NEST',
      ability: 'GROWTH: Auto-claims adjacent cells with 2 or fewer edges.',
      difficulty: 'NIGHTMARE',
      color: COLORS.purple,
    },
  ];

  const handleLaunchRaid = () => {
    const gridType = GRID_TYPES.SQUARE;
    const playersList = ['player_1', 'boss_bot']; // simple client interface: You vs Boss

    navigation.navigate('Instructions', {
      mode: GAME_MODES.BOSS,
      gridType,
      rows: 5,
      cols: 5,
      customPlayers: playersList,
      bossType: selectedBoss,
      difficulty: selectedBoss === BOSS_TYPES.HIVE_MIND ? 'HARD' : 'DEFENSIVE',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>TACTICAL CO-OP HUD</Text>
        <Text style={styles.title}>BOSS RAID LOBBY</Text>
      </View>

      <Text style={styles.sectionTitle}>SELECT CORE ENEMY</Text>
      {bossesList.map(b => {
        const isSelected = selectedBoss === b.id;
        return (
          <TouchableOpacity
            key={b.id}
            onPress={() => setSelectedBoss(b.id)}
            style={[styles.bossCard, isSelected && { borderColor: b.color }]}
          >
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: b.color }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.bossHeader}>
                  <Text style={[styles.bossName, { color: isSelected ? '#ffffff' : COLORS.textSecondary }]}>
                    {b.name}
                  </Text>
                  <Text style={[styles.diffBadge, { color: b.color }]}>{b.difficulty}</Text>
                </View>
                <Text style={styles.bossAbility}>{b.ability}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <GlassCard style={styles.objectiveCard}>
        <Text style={styles.objectiveTitle}>SHARED OBJECTIVE TELEMETRY</Text>
        <Text style={styles.objectiveText}>
          ● Defeat AI Boss by securing the majority score within 5x5 grid matrix.
        </Text>
        <Text style={styles.objectiveText}>
          ● Mitigate active Boss custom traits.
        </Text>
        <Text style={styles.objectiveText}>
          ● Secure shields and multipliers to protect boundary structures.
        </Text>
      </GlassCard>

      <View style={styles.recruitmentBox}>
        <Text style={styles.sectionTitle}>CO-OP TEAM ROSTER</Text>
        <View style={styles.rosterRow}>
          <View style={styles.playerSlot}>
            <Text style={styles.slotAvatar}>👤</Text>
            <Text style={styles.slotName}>YOU (P1)</Text>
            <Text style={styles.slotStatus}>READY</Text>
          </View>
          <View style={styles.playerSlot}>
            <Text style={styles.slotAvatar}>🤖</Text>
            <Text style={styles.slotName}>CYBER_BUDDY (P2)</Text>
            <Text style={styles.slotStatusMuted}>AUTOLINK...</Text>
          </View>
        </View>
      </View>

      <NeonButton title="ENGAGE BOSS RAID" onPress={handleLaunchRaid} color={COLORS.purple} />
      
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>ABORT MISSION</Text>
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
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textShadowColor: COLORS.purple,
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.purple,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  bossCard: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
    marginVertical: 6,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 38,
    borderRadius: 3,
    marginRight: 12,
  },
  bossHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bossName: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  diffBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bossAbility: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: 14,
  },
  objectiveCard: {
    marginVertical: 20,
  },
  objectiveTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: 10,
  },
  objectiveText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginVertical: 4,
    letterSpacing: 1,
  },
  recruitmentBox: {
    marginVertical: 10,
  },
  rosterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  playerSlot: {
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(23, 11, 41, 0.2)',
  },
  slotAvatar: {
    fontSize: 22,
    marginBottom: 4,
  },
  slotName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  slotStatus: {
    fontSize: 8,
    color: COLORS.green,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  slotStatusMuted: {
    fontSize: 8,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  backBtn: {
    alignItems: 'center',
    marginVertical: 14,
    padding: 10,
  },
  backText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
});

export default CoopLobby;
