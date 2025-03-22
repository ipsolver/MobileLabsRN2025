import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProviderComponent } from "./components/Themes";
import Menu from "./components/Menu";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProviderComponent>
      <NavigationContainer>
        <Menu />
      </NavigationContainer>
    </ThemeProviderComponent>
  );
}
