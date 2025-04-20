import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete }) {
  const renderItem = ({ item }) => <TaskItem task={item} onDelete={onDelete} />;

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.empty}>Немає завдань</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});
