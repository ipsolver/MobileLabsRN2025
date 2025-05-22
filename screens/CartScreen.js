import React from "react";
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../features/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleQuantityChange = (id, qty) => {
    const quantity = parseInt(qty);
    if (!quantity || quantity <= 0) {
      Alert.alert("Помилка", "Кількість має бути числом більше 0");
      return;
    }
    dispatch(changeQuantity({ id, quantity }));
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.empty}>Кошик порожній</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text>{item.price} грн</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={String(item.quantity)}
                  keyboardType="numeric"
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                />
                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                  <Text style={styles.remove}>Видалити</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Всього: {total} грн</Text>
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutText}>Оформити замовлення</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: "center", marginTop: 100, fontSize: 18, color: "#777" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  input: {
    width: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 6,
    textAlign: "center",
    height: 40,
  },
  remove: { color: "#d90429", fontWeight: "600" },
  footer: { marginTop: 20 },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  checkout: {
    backgroundColor: "#0a9396",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
