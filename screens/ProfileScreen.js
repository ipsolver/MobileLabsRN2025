import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль користувача</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Ім’я:</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Історія")}>
        <Text style={styles.buttonText}>Історія замовлень</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logout]} onPress={() => dispatch(logout())}>
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  label: { fontSize: 16, color: "#666", marginTop: 8 },
  value: { fontSize: 18, fontWeight: "600" },
  button: {
    backgroundColor: "#0a9396",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  logout: { backgroundColor: "#d90429" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
