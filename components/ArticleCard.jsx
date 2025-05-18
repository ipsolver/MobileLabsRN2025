import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ArticleCard = ({ heading, content }) => (
  <View style={styles.card}>
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.text}>{content}</Text>
    <Text style={styles.date}>Дата: {new Date().toLocaleDateString()}</Text>
  </View>
);

export default ArticleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
  },
});