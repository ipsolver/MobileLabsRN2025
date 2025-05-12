import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoutScreen from "../screens/LogoutScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Account" component={HomeScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
