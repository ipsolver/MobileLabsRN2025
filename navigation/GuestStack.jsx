import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPass" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default GuestStack;
