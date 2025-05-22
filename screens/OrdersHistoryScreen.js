import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const OrdersHistoryScreen = () => {
  const history = useSelector((state) => state.orders.history);

  const renderItem = ({ item }) => {
    const total = item.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
    return (
      <View style={styles.item}>
        <Text>Ім’я: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Дата: {new Date(item.date).toLocaleDateString()}</Text>
        <Text>Кількість товарів: {item.items.length}</Text>
        <Text>Сума: {total} грн</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія замовлень</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Замовлень ще немає</Text>}
      />
    </View>
  );
};

export default OrdersHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
});
