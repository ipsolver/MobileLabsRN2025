import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { UserSession } from "../contexts/UserSession";

const SignupScreen = () => {
  const { register } = useContext(UserSession);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Помилка", "Паролі не співпадають");
      return;
    }
    register(email, password, name);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Ім’я" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Підтвердження паролю" style={styles.input} value={confirm} onChangeText={setConfirm} secureTextEntry />
      <Button title="Зареєструватись" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
