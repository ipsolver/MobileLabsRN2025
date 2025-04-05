import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './components/AppContext';
import HomeScreen from './screens/HomeScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'game-controller-outline';
      } else if (route.name === 'Achievements') {
        iconName = 'trophy-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Achievements" component={AchievementsScreen} />
</Tab.Navigator>

      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
