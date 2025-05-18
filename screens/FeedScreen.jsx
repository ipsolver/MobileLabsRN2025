import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { UserSession } from "../contexts/UserSession";
import api from "../services/firebaseClient";
import ArticleCard from "../components/ArticleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const FeedScreen = () => {
  const { logout } = useContext(UserSession);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadArticles = async () => {
        try {
          const res = await api.get("/posts.json");
          const loaded = res.data
            ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
            : [];
          setArticles(loaded.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
          console.error("Error loading posts", err);
        } finally {
          setLoading(false);
        }
      };
      loadArticles();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard heading={item.title} content={item.body} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewArticle")}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#009688",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});