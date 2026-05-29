import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import { useGameStore, GAME_MODES } from '../store/useGameStore';

/**
 * Matchmaking Screen
 * Simulates online PvP matchmaking lobby and matches active ELO ranges.
 */
export const Matchmaking = ({ route, navigation }) => {
  const gridType = route?.params?.gridType || 'SQUARE';
  const rows = route?.params?.rows || 4;
  const cols = route?.params?.cols || 4;

  const [searchTime, setSearchTime] = useState(0);
  const [matchStatus, setMatchStatus] = useState('ALLOCATING CELL SECTOR...');
  const [matchedOpponent, setMatchedOpponent] = useState(null);

  useEffect(() => {
    // 1. Tick queue duration
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);

    // 2. Mock matchmaking steps
    const step1 = setTimeout(() => {
      setMatchStatus('CONNECTING TO PEER-POOL...');
    }, 1200);

    const step2 = setTimeout(() => {
      setMatchStatus('FOUND SUITABLE SIGNAL IN RANGE!');
      setMatchedOpponent({
        name: 'CYBER_STRIKE_99',
        elo: 1530,
        badge: 'GOLD III',
      });
    }, 3200);

    const launch = setTimeout(() => {
      // Initialize multiplayer grid
      useGameStore.getState().initGame(GAME_MODES.ONLINE_PVP, gridType, rows, cols);
      navigation.replace('GameScreen');
    }, 5500);

    return () => {
      clearInterval(timer);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(launch);
    };
  }, [navigation, gridType, rows, cols]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={COLORS.cyan} style={styles.spinner} />
        
        <Text style={styles.timer}>{formatTime(searchTime)}</Text>
        <Text style={styles.statusText}>{matchStatus}</Text>
        
        <Text style={styles.subtext}>
          GRID DESIRED: {gridType} ({rows}x{cols})
        </Text>
      </View>

      {matchedOpponent && (
        <GlassCard style={styles.opponentCard}>
          <Text style={styles.opponentLabel}>COSMIC OPPONENT CONNECTED</Text>
          <Text style={styles.opponentName}>{matchedOpponent.name}</Text>
          <Text style={styles.opponentElo}>
            RATING: {matchedOpponent.elo} ELO [{matchedOpponent.badge}]
          </Text>
        </GlassCard>
      )}

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.cancelText}>ABORT QUEUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loaderBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  spinner: {
    transform: [{ scale: 1.5 }],
    marginBottom: 20,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'black',
    color: '#ffffff',
    letterSpacing: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.cyan,
    letterSpacing: 2,
    marginTop: 14,
    textAlign: 'center',
    textShadowColor: COLORS.cyan,
    textShadowRadius: 6,
  },
  subtext: {
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginTop: 8,
  },
  opponentCard: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    borderColor: COLORS.green,
  },
  opponentLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.green,
    letterSpacing: 2,
  },
  opponentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
    marginTop: 6,
  },
  opponentElo: {
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginTop: 4,
  },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.trap,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255, 42, 42, 0.05)',
  },
  cancelText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.trap,
    letterSpacing: 2,
  },
});

export default Matchmaking;
