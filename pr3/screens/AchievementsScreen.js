import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useAppContext } from '../components/AppContext';

const AchievementsScreen = () => {
  const { tasks } = useAppContext();

  const renderItem = ({ item }) => {
    const progress = item.current / item.goal;
    const isCompleted = item.current >= item.goal;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Progress.Bar progress={progress} width={200} color={isCompleted ? 'green' : 'skyblue'} />
        <Text style={styles.status}>{`${item.current}/${item.goal}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
});

export default AchievementsScreen;
