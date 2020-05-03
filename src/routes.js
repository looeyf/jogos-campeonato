import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Homepage from './pages/Homepage';
import ChampionshipStages from './pages/ChampionshipStages';
import Games from './pages/Games';

const Stack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Homepage'
          component={Homepage}
          options={{
            headerTitleAlign: 'center',
            title: 'Campeonatos',
          }}
        />
        <Stack.Screen
          name='ChampionshipStages'
          component={ChampionshipStages}
          options={{
            headerTitleAlign: 'center',
            title: 'Fases do campeonato',
          }}
        />
        <Stack.Screen
          name='Games'
          component={Games}
          options={{
            headerTitleAlign: 'center',
            title: 'Jogos',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
