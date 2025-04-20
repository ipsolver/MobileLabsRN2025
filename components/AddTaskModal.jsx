import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import { sendNotification } from './notify';

export default function AddTaskModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setPickerVisible(false);
  };

  const handleSave = async () => {
    console.log('Збереження завдання...');
    if (!title || !date) {
      Alert.alert('Помилка', 'Введіть назву та оберіть дату');
      return;
    }

    if (date <= new Date()) {
      Alert.alert('Помилка', 'Оберіть майбутню дату');
      return;
    }

    //const id = uuidv4();
    const id = Date.now().toString();
    console.log('Виклик функції sendNotification...');
    const notificationId = await sendNotification({ id, title, description, date });
    console.log('ID сповіщення:', notificationId);

    const task = {
      id,
      title,
      description,
      date: date,
      isFinished: false,
      notificationId,
    };

    onSave(task);
    setTitle('');
    setDescription('');
    setDate(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.header}>Нове завдання</Text>

        <TextInput
          placeholder="Назва"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Опис"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Pressable onPress={() => setPickerVisible(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {date ? `Дата: ${date.toLocaleString()}` : 'Оберіть дату'}
          </Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={pickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
          minimumDate={new Date()}
        />

        <View style={styles.buttons}>
          <Button title="Зберегти" onPress={handleSave} />
          <Button title="Скасувати" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 20,
  },
  dateText: {
    color: '#333',
    textAlign: 'center',
  },
  buttons: {
    gap: 12,
  },
});
