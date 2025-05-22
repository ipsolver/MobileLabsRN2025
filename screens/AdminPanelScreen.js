import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct } from "../features/products/productsSlice";

const AdminPanelScreen = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Дозвіл потрібен", "Для вибору зображення потрібно надати доступ до галереї");
        }
      }
    })();
  }, [dispatch]);

  const saveImageLocally = async (uri) => {
    try {
      const filename = uri.split("/").pop();
      const newPath = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.log("Помилка копіювання файлу:", error);
      return uri;
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Дозвіл потрібен", "Неможливо отримати доступ до галереї");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const localUri = await saveImageLocally(result.assets[0].uri);
      setImageUri(localUri);
    }
  };

  const handleAddProduct = () => {
    if (!title || !description || !price || !imageUri) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      image: imageUri,
    };
    console.log("Новий товар:", newProduct);
    dispatch(addProduct(newProduct));
    setTitle("");
    setDescription("");
    setPrice("");
    setImageUri("");
  };

  const handleDelete = (id) => {
    Alert.alert("Підтвердження", "Видалити цей товар?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>{item.price} грн</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtn}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати новий товар</Text>
      <TextInput
        style={styles.input}
        placeholder="Назва"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ціна"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity onPress={pickImage} style={styles.pickImageBtn}>
        <Text style={styles.pickImageText}>
          {imageUri ? "Змінити зображення" : "Вибрати зображення"}
        </Text>
      </TouchableOpacity>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
      <TouchableOpacity onPress={handleAddProduct} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Додати товар</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Список товарів</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default AdminPanelScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  pickImageBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  pickImageText: { color: "#333" },
  preview: { width: "100%", height: 180, borderRadius: 8, marginBottom: 12 },
  addBtn: {
    backgroundColor: "#0a9396",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  deleteBtn: { color: "#d90429", fontWeight: "bold" },
});
