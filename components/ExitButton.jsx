import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ExitButton = ({ onExit }) => (
  <TouchableOpacity style={styles.button} onPress={onExit}>
    <Text style={styles.text}>Вийти</Text>
  </TouchableOpacity>
);

export default ExitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff3b30",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});