import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';

/**
 * Premium Neon Button with dynamic color glows and press interactions
 */
export const NeonButton = ({ title, onPress, color = COLORS.cyan, style, textStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          borderColor: color,
          shadowColor: color,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: '#ffffff', textShadowColor: color }, textStyle]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7, 2, 13, 0.7)',
    // Neon Glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});

export default NeonButton;
