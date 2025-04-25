import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import EditorScreen from './screens/EditorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Менеджер файлів' }} />
        <Stack.Screen name="Editor" component={EditorScreen} options={{ title: 'Редактор файлу' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}