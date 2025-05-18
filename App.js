import React from "react";
import { UserSessionProvider } from "./contexts/UserSession";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <UserSessionProvider>
      <RootNavigator />
    </UserSessionProvider>
  );
}