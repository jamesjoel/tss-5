import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from '../constants/Colors';
import { useGameStore, POWERUPS } from '../store/useGameStore';

/**
 * PowerUpBar UI Widget
 * Displays active powerup inventory for the current player and tracks active states.
 */
export const PowerUpBar = () => {
  const { currentPlayer, powerUpsInventory, activePowerUps, activatePowerUp } = useGameStore();

  const inventory = powerUpsInventory[currentPlayer] || [];

  const getPowerUpLabel = (type) => {
    switch (type) {
      case POWERUPS.DOUBLE_SCORE: return '✖2 PTS';
      case POWERUPS.FREEZE_OPPONENT: return '❄ FREEZE';
      case POWERUPS.STEAL_SQUARE: return '✂ STEAL';
      case POWERUPS.SHIELD: return '🛡 SHIELD';
      case POWERUPS.TIME_BONUS: return '⌛ TIME';
      case POWERUPS.GHOST_LINE: return '👻 GHOST';
      default: return type;
    }
  };

  const getPowerUpColor = (type) => {
    switch (type) {
      case POWERUPS.DOUBLE_SCORE: return COLORS.green;
      case POWERUPS.FREEZE_OPPONENT: return COLORS.cyan;
      case POWERUPS.STEAL_SQUARE: return COLORS.magenta;
      case POWERUPS.SHIELD: return COLORS.orange;
      case POWERUPS.TIME_BONUS: return COLORS.yellow;
      default: return COLORS.purple;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEPLOY TACTICAL POWER-UPS</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {inventory.length === 0 ? (
          <Text style={styles.emptyText}>INVENTORY EMPTY - WIN SQUARES TO EARN POWER-UPS</Text>
        ) : (
          inventory.map((type, idx) => {
            const color = getPowerUpColor(type);
            return (
              <TouchableOpacity
                key={`${type}_${idx}`}
                style={[styles.powerItem, { borderColor: color }]}
                onPress={() => activatePowerUp(type, currentPlayer)}
              >
                <Text style={[styles.powerText, { color }]}>{getPowerUpLabel(type)}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Display active global power-ups */}
      {(activePowerUps.doubleScore || activePowerUps.frozenPlayer) && (
        <View style={styles.statusBox}>
          {activePowerUps.doubleScore && (
            <Text style={[styles.statusText, { color: COLORS.green }]}>
              ★ DOUBLE POINTS IN EFFECT FOR {activePowerUps.doubleScore === 'player_1' ? 'P1' : 'P2'}!
            </Text>
          )}
          {activePowerUps.frozenPlayer && (
            <Text style={[styles.statusText, { color: COLORS.cyan }]}>
              ❄ OPPONENT IS FROZEN!
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  scroll: {
    paddingVertical: 4,
  },
  powerItem: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: 'rgba(23, 11, 41, 0.4)',
  },
  powerText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyText: {
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  statusBox: {
    marginTop: 8,
    flexDirection: 'column',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginVertical: 2,
  },
});

export default PowerUpBar;
