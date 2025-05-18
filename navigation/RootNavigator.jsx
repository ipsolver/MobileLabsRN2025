import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { UserSession } from "../contexts/UserSession";

import FeedScreen from "../screens/FeedScreen";
import NewArticleScreen from "../screens/NewArticleScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Головна" component={FeedScreen} />
    <Stack.Screen name="NewArticle" component={NewArticleScreen} options={{ title: "Новий запис" }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Профіль" component={UserProfileScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={SigninScreen} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const MainTabs = ({ isAuth }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#009688",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ color, size }) => {
        let icon = "list";
        if (route.name === "Feed") icon = "newspaper";
        else if (route.name === "Profile") icon = "person";
        else if (route.name === "Login") icon = "log-in";
        else if (route.name === "Signup") icon = "person-add";
        return <Ionicons name={icon} size={size} color={color} />;
      },
    })}
  >
    {isAuth ? (
      <>
        <Tab.Screen name="Feed" component={FeedStack} options={{ title: "Стрічка" }} />
        <Tab.Screen name="Profile" component={ProfileStack} options={{ title: "Профіль" }} />
      </>
    ) : (
      <>
        <Tab.Screen name="Login" component={AuthStack} options={{ title: "Вхід" }} />
        <Tab.Screen name="Signup" component={RegisterStack} options={{ title: "Реєстрація" }} />
      </>
    )}
  </Tab.Navigator>
);

const RootNavigator = () => {
  const { token, loading } = useContext(UserSession);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainTabs isAuth={!!token} />
    </NavigationContainer>
  );
};

export default RootNavigator;
