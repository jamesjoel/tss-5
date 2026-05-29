import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import GameScreen from '../screens/GameScreen';
import CoopLobby from '../screens/CoopLobby';
import Leaderboards from '../screens/Leaderboards';
import DailyChallenge from '../screens/DailyChallenge';
import Matchmaking from '../screens/Matchmaking';
import Instructions from '../screens/Instructions';
import Winner from '../screens/Winner';
import COLORS from '../constants/Colors';

const Stack = createStackNavigator();

/**
 * AppNavigator Component
 * Central stack router mapping all UI grids and transitions.
 */
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Instructions" component={Instructions} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="Winner" component={Winner} />
      <Stack.Screen name="CoopLobby" component={CoopLobby} />
      <Stack.Screen name="Leaderboards" component={Leaderboards} />
      <Stack.Screen name="DailyChallenge" component={DailyChallenge} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
