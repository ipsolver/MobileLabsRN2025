import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ProductCatalogScreen from "../screens/ProductCatalogScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersHistoryScreen from "../screens/OrdersHistoryScreen";
import AdminPanelScreen from "../screens/AdminPanelScreen"; // 🔧

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CatalogStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Каталог" component={ProductCatalogScreen} />
    <Stack.Screen name="Оформлення" component={CheckoutScreen} options={{ title: "Оформлення" }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Профіль" component={ProfileScreen} />
    <Stack.Screen name="Історія" component={OrdersHistoryScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0a9396",
        tabBarInactiveTintColor: "#aaa",
        tabBarIcon: ({ color, size }) => {
          let iconName = "help";
          if (route.name === "Каталог") iconName = "storefront-outline";
          if (route.name === "Кошик") iconName = "cart-outline";
          if (route.name === "Профіль") iconName = "person-outline";
          if (route.name === "Адмін") iconName = "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Каталог" component={CatalogStack} />
      <Tab.Screen name="Кошик" component={CartScreen} />
      <Tab.Screen name="Профіль" component={ProfileStack} />
      {isAdmin && (
        <Tab.Screen name="Адмін" component={AdminPanelScreen} />
      )}
    </Tab.Navigator>
  );
};

export default MainTabs;
