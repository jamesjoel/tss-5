import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';

/**
 * Leaderboards Screen
 * Displays seasonal rankings, ELO status, and dynamic score pools.
 */
export const Leaderboards = ({ navigation }) => {
  const rankingPool = [
    { rank: 1, name: 'CRITICAL_NODE', elo: 2450, badge: 'GRANDMASTER' },
    { rank: 2, name: 'QUANTUM_DOT', elo: 2310, badge: 'MASTER' },
    { rank: 3, name: 'ZERO_ENTROPY', elo: 2280, badge: 'MASTER' },
    { rank: 4, name: 'NEON_GLOW', elo: 2120, badge: 'DIAMOND' },
    { rank: 5, name: 'ALPHA_GRID', elo: 1980, badge: 'DIAMOND' },
    { rank: 6, name: 'YOU (P1)', elo: 1540, badge: 'GOLD', isUser: true },
    { rank: 7, name: 'CYBER_COP', elo: 1490, badge: 'GOLD' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>SEASONAL RANKS HUD</Text>
        <Text style={styles.title}>LEADERBOARD</Text>
      </View>

      <GlassCard style={styles.seasonCard}>
        <Text style={styles.seasonTitle}>SEASON 4: GLOWING CONFLICT</Text>
        <Text style={styles.seasonCountdown}>TIME REMAINING: 14D 08H 44M</Text>
        <Text style={styles.seasonObjective}>REACH MASTER [2200 ELO] TO EARN CO-OP CHROME CASINGS!</Text>
      </GlassCard>

      <Text style={styles.sectionTitle}>GLOBAL NODE RANKS</Text>

      {rankingPool.map(r => (
        <View
          key={r.name}
          style={[
            styles.rankRow,
            r.isUser && { borderColor: COLORS.cyan, backgroundColor: 'rgba(0, 242, 254, 0.05)' },
          ]}
        >
          <View style={styles.row}>
            <Text style={[styles.rankNum, r.rank <= 3 && { color: COLORS.green }]}>
              #{r.rank}
            </Text>
            <View>
              <Text style={[styles.playerText, r.isUser && { color: COLORS.cyan }]}>{r.name}</Text>
              <Text style={styles.badgeText}>{r.badge}</Text>
            </View>
          </View>
          <Text style={styles.eloText}>{r.elo} ELO</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>◀ LEAVE LOBBY</Text>
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
    textShadowColor: COLORS.cyan,
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.cyan,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  seasonCard: {
    marginVertical: 14,
    borderColor: COLORS.borderGlass,
  },
  seasonTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  seasonCountdown: {
    fontSize: 10,
    color: COLORS.green,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 6,
  },
  seasonObjective: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 6,
    lineHeight: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNum: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textMuted,
    marginRight: 16,
    width: 32,
  },
  playerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginTop: 2,
  },
  eloText: {
    fontSize: 14,
    fontWeight: 'black',
    color: '#ffffff',
    letterSpacing: 1,
  },
  backBtn: {
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  backText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
});

export default Leaderboards;
