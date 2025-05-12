import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = ({navigation}) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        Alert.alert(
          "Успішно",
          "Лист для скидання пароля надіслано на ваш email"
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          Alert.alert("Помилка", "Невірний формат email.");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("Помилка", "Користувача з таким email не існує.");
        } else {
          Alert.alert("Помилка", errorMessage);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Скидання пароля</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Введіть email для скидання пароля"
        />
      </View>

      {loading ? (
        <Text>Зачекайте...</Text>
      ) : (
        <View>
          <Button title="Скинути пароль" onPress={handlePasswordReset} />
          <Button
            title="Повернутися до входу"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default ResetPasswordScreen;
