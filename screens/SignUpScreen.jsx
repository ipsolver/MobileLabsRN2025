import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoggedInUser(userCredential.user);
        navigation.navigate("Login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.goToLoginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  signUpButton: {
    backgroundColor: "#2ecc71",
  },
  goToLoginButton: {
    backgroundColor: "#3498db",
  },
});

export default SignUpScreen;
