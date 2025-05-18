import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileInfo = ({ user }) => {
  if (!user) {
    return <Text style={styles.message}>Інформація не знайдена</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я:</Text>
      <Text style={styles.value}>{user.name || "Невідомо"}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    color: "#aaa",
    alignSelf: "center",
    marginVertical: 30,
  },
});