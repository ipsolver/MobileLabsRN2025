import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

function LogoutScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteFields, setShowDeleteFields] = useState(false); 
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Ви вийшли з акаунта!");
      })
      .catch((error) => {
        Alert.alert("Помилка", error.message);
      });
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteUser(user)
            .then(() => {
              Alert.alert("Акаунт видалено");
            })
            .catch((error) => {
              Alert.alert("Помилка видалення акаунта", error.message);
            });
        })
        .catch((error) => {
          Alert.alert(
            "Невірні облікові дані",
            "Перевірте правильність email та пароля."
          );
        });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setShowDeleteFields(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вихід та Видалення акаунта</Text>

      <TouchableOpacity
        style={[styles.button, styles.deleteAccountButton]}
        onPress={() => setShowDeleteFields(true)}
      >
        <Text style={styles.buttonText}>Видалити акаунт</Text>
      </TouchableOpacity>

      {showDeleteFields && !showConfirmDelete && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Введіть email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Пароль:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Введіть пароль"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.confirmDeleteButton]}
            onPress={() => setShowConfirmDelete(true)}
          >
            <Text style={styles.buttonText}>Підтвердити видалення</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelDeleteButton]}
            onPress={handleCancelDelete}
          >
            <Text style={styles.buttonText}>Відмінити видалення</Text>
          </TouchableOpacity>
        </>
      )}

      {showConfirmDelete && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.confirmDeleteButton]}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.buttonText}>Підтвердити видалення</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelDeleteButton]}
            onPress={handleCancelDelete}
          >
            <Text style={styles.buttonText}>Відмінити видалення</Text>
          </TouchableOpacity>
        </>
      )}

      {!showDeleteFields && (
        <TouchableOpacity
          style={[styles.button, styles.signOutButton]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Вийти з акаунта</Text>
        </TouchableOpacity>
      )}

      {loading ? <Text>Зачекайте...</Text> : null}
    </View>
  );
}

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
  deleteAccountButton: {
    backgroundColor: "#e74c3c",
  },
  confirmDeleteButton: {
    backgroundColor: "#3498db",
  },
  cancelDeleteButton: {
    backgroundColor: "#95a5a6",
  },
  signOutButton: {
    backgroundColor: "#2ecc71",
  },
});

export default LogoutScreen;
