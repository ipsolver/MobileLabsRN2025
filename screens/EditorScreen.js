import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function EditorScreen({ route, navigation }) {
  const { path } = route.params;
  const [content, setContent] = useState('');

  useEffect(() => {
    const load = async () => {
      const text = await FileSystem.readAsStringAsync(path);
      setContent(text);
    };
    load();
  }, []);

  const save = async () => {
    await FileSystem.writeAsStringAsync(path, content);
    Alert.alert('Файл збережено');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button title="💾 Зберегти" onPress={save} />
      <TextInput
        multiline
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
});