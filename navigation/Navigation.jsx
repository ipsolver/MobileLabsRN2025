import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MainTabs from "./MainTabs";
import AuthStack from "./AuthStack";

const Navigation = () => {
  const token = useSelector((state) => state.user.token);
  return (
    <NavigationContainer>
      {token ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;