import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AddEntryModal({ visible, onClose, onCreate }) {
  const [label, setLabel] = useState('');
  const [kind, setKind] = useState('folder');

  const create = () => {
    if (label.trim()) {
      onCreate(label.trim(), kind);
      setLabel('');
      setKind('folder');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TextInput
            placeholder="Назва"
            value={label}
            onChangeText={setLabel}
            style={styles.input}
          />
          <View style={styles.options}>
            <TouchableOpacity onPress={() => setKind('folder')}>
              <Text style={kind === 'folder' ? styles.selected : styles.unselected}>📁 Папка</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setKind('file')}>
              <Text style={kind === 'file' ? styles.selected : styles.unselected}>📄 Файл</Text>
            </TouchableOpacity>
          </View>
          <Button title="Створити" onPress={create} />
          <Button title="Скасувати" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modal: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  options: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  selected: { fontWeight: 'bold', color: 'blue' },
  unselected: { color: 'gray' },
});