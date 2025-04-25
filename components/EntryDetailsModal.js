import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

export default function EntryDetailsModal({ visible, onClose, details }) {
  if (!details) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Інформація</Text>
          <Text>Назва: {details.name}</Text>
          <Text>Тип: {details.isDir ? 'Папка' : 'Файл'}</Text>
          <Text>Розмір: {details.size} байт</Text>
          <Text>Дата: {new Date(details.mod * 1000).toLocaleString()}</Text>
          <Button title="Закрити" onPress={onClose} />
          <Button title="Видалити" color="red" onPress={() => {
            onClose();
            details.onDelete?.();
          }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { backgroundColor: '#fff', padding: 20, margin: 20, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
});