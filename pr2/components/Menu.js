import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import StoreScreen from '../screens/StoreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatScreen from '../screens/ChatScreen';
import SafetyScreen from '../screens/SafetyScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const Menu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Store') 
          {
            iconName = 'cart-outline';
          } 
          else if (route.name === 'Community') 
          {
            iconName = 'people-outline';
          }
           else if (route.name === 'Chat') 
           {
            iconName = 'chatbubble-outline';
          }
           else if (route.name === 'Safety') 
           {
            return <FontAwesome name="shield" size={size} color={color} />;
          }
           else if (route.name === 'Account') 
           {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#708090',
        tabBarStyle: {
          backgroundColor: '#1b2838',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default Menu;
