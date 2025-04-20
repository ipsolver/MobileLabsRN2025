import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default function TaskItem({ task, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>
        {task.description ? <Text style={styles.desc}>{task.description}</Text> : null}
        <Text style={styles.date}>
          {moment(task.date).format('DD MMM YYYY, HH:mm')}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onDelete(task.id, task.notificationId)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
