import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AddEntryModal from '../components/AddEntryModal';
import EntryDetailsModal from '../components/EntryDetailsModal';

const BASE_DIR = FileSystem.documentDirectory + 'UserData/';

export default function MainScreen({ navigation }) {
  const [activeDirectory, setActiveDirectory] = useState(BASE_DIR);
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [entryDetails, setEntryDetails] = useState(null);
  const [diskInfo, setDiskInfo] = useState(null);

  useEffect(() => {
    const init = async () => {
      const dir = await FileSystem.getInfoAsync(BASE_DIR);
      if (!dir.exists) await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
      refreshDirectory(BASE_DIR);
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      setDiskInfo({ total, free, used: total - free });
    };
    init();
  }, []);

  const refreshDirectory = async (path) => {
    setActiveDirectory(path);
    const content = await FileSystem.readDirectoryAsync(path);
    setEntries(content);
  };

  const openItem = async (name) => {
    const full = activeDirectory + name;
    const info = await FileSystem.getInfoAsync(full);
    if (info.isDirectory) refreshDirectory(full + '/');
    else if (name.endsWith('.txt')) navigation.navigate('Editor', { path: full });
  };

  const goBack = () => {
    if (activeDirectory !== BASE_DIR) {
      const parent = activeDirectory.split('/').slice(0, -2).join('/') + '/';
      refreshDirectory(parent);
    }
  };

  const removeEntry = (name) => {
    Alert.alert("Видалити?", `"${name}" буде видалено`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "OK", onPress: async () => {
          const full = activeDirectory + name;
          const info = await FileSystem.getInfoAsync(full);
          await FileSystem.deleteAsync(info.isDirectory ? full + '/' : full, { idempotent: true });
          refreshDirectory(activeDirectory);
        }
      }
    ]);
  };

  const showEntryDetails = async (name) => {
    const full = activeDirectory + name;
    const info = await FileSystem.getInfoAsync(full, { size: true });
    setEntryDetails({
      name, isDir: info.isDirectory, size: info.size, mod: info.modificationTime,
      onDelete: () => removeEntry(name)
    });
    setShowDetails(true);
  };

  const createEntry = async (label, kind) => {
    const fullPath = activeDirectory + label + (kind === 'folder' ? '/' : '.txt');
    if (kind === 'folder') await FileSystem.makeDirectoryAsync(fullPath);
    else await FileSystem.writeAsStringAsync(fullPath, '');
    setShowAddModal(false);
    refreshDirectory(activeDirectory);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Поточна папка: {activeDirectory.replace(BASE_DIR, '') || 'UserData'}</Text>
      <Button title="Назад" onPress={goBack} disabled={activeDirectory === BASE_DIR} />

      {diskInfo && (
        <View style={styles.info}>
          <Text>Загальна памʼять: {(diskInfo.total / 1e6).toFixed(1)} MB</Text>
          <Text>Використано: {(diskInfo.used / 1e6).toFixed(1)} MB</Text>
          <Text>Вільно: {(diskInfo.free / 1e6).toFixed(1)} MB</Text>
        </View>
      )}

      <FlatList
        data={entries}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openItem(item)} onLongPress={() => showEntryDetails(item)}>
            <Text style={styles.item}>{item.endsWith('/') || item.indexOf('.') === -1 ? '📁' : '📄'} {item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <Button title="Додати" onPress={() => setShowAddModal(true)} />
      </View>

      <AddEntryModal visible={showAddModal} onClose={() => setShowAddModal(false)} onCreate={createEntry} />
      <EntryDetailsModal visible={showDetails} onClose={() => setShowDetails(false)} details={entryDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 18 },
    header: { fontWeight: 'bold', fontSize: 18, marginBottom: 12, color: '#333' },
    item: {
      padding: 12,
      marginVertical: 6,
      backgroundColor: '#fff',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      fontSize: 16,
    },
    info: {
      backgroundColor: '#e6f0ff',
      padding: 10,
      borderRadius: 8,
      marginVertical: 12,
    },
    footer: { marginTop: 10, alignItems: 'center' }
});