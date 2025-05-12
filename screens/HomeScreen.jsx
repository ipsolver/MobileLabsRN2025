import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const fetchUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setName(userData.name || "");
        setAge(userData.age || "");
        setCity(userData.city || "");
      } else {
        Alert.alert("Помилка", "Дані не знайдено!");
      }
    }
  };

  const updateUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userRef,
          {
            name,
            age,
            city,
          },
          { merge: true }
        );
        Alert.alert("Успіх", "Дані оновлено!");
      } catch (error) {
        Alert.alert("Помилка", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш Профіль</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ім'я:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ваше ім'я"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Вік:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Ваш вік"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Місто:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ваше місто"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={updateUserData}
      >
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.replace("Logout")}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
});

export default HomeScreen;
