import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import AccountScreen from './screens/AccountScreen';
import Menu from './components/Menu';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
