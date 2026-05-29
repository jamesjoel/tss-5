import React from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../constants/Colors';

/**
 * Premium Glassmorphic Card Container
 * Simulates translucent frosted-glass panel using opacity, gradients, and custom drop shadows.
 */
export const GlassCard = ({ children, style, glowColor = COLORS.borderGlass }) => {
  return (
    <View style={[styles.card, { borderColor: glowColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    // iOS shadow
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    // Android elevation support
    elevation: 8,
    overflow: 'hidden',
  },
});

export default GlassCard;
