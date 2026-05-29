import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import COLORS from '../constants/Colors';

/**
 * Splash Screen
 * Displays glowing game branding on startup.
 */
export const Splash = ({ navigation }) => {
  useEffect(() => {
    // Wait 2.2 seconds before pushing to Dashboard/Home
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.brandBox}>
        <Text style={styles.subtitle}>TACTICAL SHAPE CONFLICT</Text>
        <Text style={styles.title}>DOTWARS</Text>
        <Text style={styles.neonLabel}>MULTIPLAYER EVOLVED</Text>
      </View>

      <ActivityIndicator size="small" color={COLORS.cyan} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBox: {
    alignItems: 'center',
  },
  title: {
    fontSize: 54,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 8,
    textShadowColor: COLORS.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.cyan,
    letterSpacing: 6,
    marginBottom: 4,
    textShadowColor: COLORS.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  neonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.magenta,
    letterSpacing: 4,
    marginTop: 8,
    textShadowColor: COLORS.magenta,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  loader: {
    position: 'absolute',
    bottom: 60,
  },
});

export default Splash;
