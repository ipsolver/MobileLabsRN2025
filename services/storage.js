import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todo_tasks';

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Save error:', error);
  }
};

export const loadTasks = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
};
