import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/orders/ordersSlice";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!name.trim() || !validateEmail(email)) {
      Alert.alert("Помилка", "Заповніть ім’я та коректний email");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Кошик порожній");
      return;
    }

    dispatch(addOrder({ name, email, items: cartItems }));
    dispatch(clearCart());

    Alert.alert("Успіх", "Замовлення оформлено!", [
  {
    text: "OK",
    onPress: () => {
      navigation.navigate("Каталог", { screen: "Каталог" });
    },
  },
]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оформлення замовлення</Text>
      <TextInput
        placeholder="Ваше ім’я"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Підтвердити</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0a9396",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
