import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { UserSession } from "../contexts/UserSession";
import api from "../services/firebaseClient";

const NewArticleScreen = ({ navigation }) => {
  const { userId } = useContext(UserSession);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!heading || !content) {
      Alert.alert("Увага", "Заповніть усі поля");
      return;
    }
    setSaving(true);
    try {
      await api.post("/posts.json", {
        title: heading,
        body: content,
        userId,
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Успіх", "Публікація додана");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Помилка", "Не вдалося створити запис");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Заголовок"
        style={styles.input}
        value={heading}
        onChangeText={setHeading}
      />
      <TextInput
        placeholder="Контент"
        style={[styles.input, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title={saving ? "Збереження..." : "Створити"} onPress={handleCreate} disabled={saving} />
    </View>
  );
};

export default NewArticleScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});