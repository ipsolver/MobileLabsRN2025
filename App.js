import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import GuestStack from "./navigation/GuestStack";
import AppStack from "./navigation/AppStack";

const AppContent = () => {
  const { loggedInUser } = useAuth();

  return (
    <NavigationContainer>
      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
