import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { GAME_MODES } from '../store/useGameStore';
import { GRID_TYPES } from '../utils/GridGenerator';

/**
 * DotWars Dashboard Screen
 * Allows players to select from all 10 game modes and customize grid configurations.
 */
export const Home = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState(GAME_MODES.LOCAL);
  const [gridType, setGridType] = useState(GRID_TYPES.SQUARE);
  const [difficulty, setDifficulty] = useState('HARD');
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);

  // Matchmaking mockup helper
  const handleLaunchGame = () => {
    if (selectedMode === GAME_MODES.COOP || selectedMode === GAME_MODES.BOSS) {
      navigation.navigate('CoopLobby', { mode: selectedMode, gridType });
    } else {
      navigation.navigate('Instructions', {
        mode: selectedMode,
        gridType,
        rows,
        cols,
        difficulty,
      });
    }
  };

  const modesList = [
    { id: GAME_MODES.ONLINE_PVP, name: '1V1 RANKED PVP', desc: 'Climb the cosmic ELO leaderboards.' },
    { id: GAME_MODES.AI, name: 'AI DUEL', desc: 'Fight smart defensive or aggressive bots.' },
    { id: GAME_MODES.BOSS, name: 'BOSS RAID', desc: 'Co-op with friends to defeat Core Bosses.' },
    { id: GAME_MODES.LOCAL, name: 'LOCAL PASS & PLAY', desc: 'Dual-controller offline multiplayer.' },
    { id: GAME_MODES.COOP, name: 'CO-OP OBJECTIVE', desc: 'Survive rounds and protect areas.' },
    { id: GAME_MODES.PUZZLE, name: 'PUZZLE CHALLENGE', desc: 'Solve pre-placed territory boards.' },
    { id: GAME_MODES.BLITZ, name: 'BLITZ MATCH', desc: '10-sec hyper turns.' },
    { id: GAME_MODES.CAMPAIGN, name: 'SECTOR CAMPAIGN', desc: 'Conquer the 24 node solar sectors.' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>TACTICAL CORE HUD</Text>
        <Text style={styles.title}>DOTWARS</Text>
        <Text style={styles.eloBadge}>PLAYER ELO: 1540 [GOLD RANK]</Text>
      </View>

      {/* GAME MODE SELECTION */}
      <Text style={styles.sectionTitle}>SELECT CONFLICT PROTOCOL</Text>
      {modesList.map(m => {
        const isSelected = selectedMode === m.id;
        const color = isSelected ? COLORS.cyan : COLORS.border;
        return (
          <TouchableOpacity
            key={m.id}
            onPress={() => setSelectedMode(m.id)}
            style={[styles.modeCard, { borderColor: isSelected ? COLORS.cyan : COLORS.border }]}
          >
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: isSelected ? COLORS.cyan : 'transparent' }]} />
              <View>
                <Text style={[styles.modeName, { color: isSelected ? '#ffffff' : COLORS.textSecondary }]}>
                  {m.name}
                </Text>
                <Text style={styles.modeDesc}>{m.desc}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* GRID STYLE SELECTION */}
      <Text style={styles.sectionTitle}>GRID MATRIX TYPE</Text>
      <View style={styles.gridSelection}>
        {Object.values(GRID_TYPES).map(type => {
          const isSelected = gridType === type;
          const color = isSelected ? COLORS.magenta : COLORS.border;
          return (
            <TouchableOpacity
              key={type}
              style={[styles.gridBtn, { borderColor: color }]}
              onPress={() => setGridType(type)}
            >
              <Text style={[styles.gridBtnText, { color: isSelected ? '#ffffff' : COLORS.textSecondary }]}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CONFIG PANEL */}
      <GlassCard style={styles.configCard}>
        <Text style={styles.configTitle}>MATRIX TELEMETRY</Text>
        
        {selectedMode === GAME_MODES.AI && (
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>BOT ARCHETYPE:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['EASY', 'DEFENSIVE', 'AGGRESSIVE', 'CHAOTIC', 'HARD'].map(p => (
                <TouchableOpacity
                  key={p}
                  style={[styles.archetypeBadge, difficulty === p && styles.archetypeBadgeActive]}
                  onPress={() => setDifficulty(p)}
                >
                  <Text style={styles.archetypeText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.configRow}>
          <Text style={styles.configLabel}>BOARD SIZE (ROWS X COLS):</Text>
          <View style={styles.row}>
            {[3, 4, 5, 6].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.sizeBtn, rows === num && styles.sizeBtnActive]}
                onPress={() => {
                  setRows(num);
                  setCols(num);
                }}
              >
                <Text style={styles.sizeText}>{num}x{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </GlassCard>

      <NeonButton title="LAUNCH SIMULATION" onPress={handleLaunchGame} color={COLORS.cyan} />

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Leaderboards')}>
          <Text style={styles.footerLinkText}>🏆 RANKS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('DailyChallenge')}>
          <Text style={styles.footerLinkText}>📅 CHALLENGES</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 6,
    textShadowColor: COLORS.purple,
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.cyan,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  eloBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.green,
    letterSpacing: 2,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  modeCard: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 24,
    borderRadius: 3,
    marginRight: 12,
  },
  modeName: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  modeDesc: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  gridSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  gridBtn: {
    width: '48%',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
    marginVertical: 4,
  },
  gridBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  configCard: {
    marginVertical: 20,
  },
  configTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  configRow: {
    marginVertical: 8,
  },
  configLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  archetypeBadge: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: 'rgba(7, 2, 13, 0.5)',
  },
  archetypeBadgeActive: {
    borderColor: COLORS.cyan,
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
  },
  archetypeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: 'rgba(7, 2, 13, 0.5)',
  },
  sizeBtnActive: {
    borderColor: COLORS.magenta,
    backgroundColor: 'rgba(255, 0, 127, 0.1)',
  },
  sizeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  footerLink: {
    padding: 10,
  },
  footerLinkText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
  },
});

export default Home;
