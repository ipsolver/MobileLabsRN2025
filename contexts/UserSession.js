import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../services/firebaseClient";

export const UserSession = createContext();

export const UserSessionProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const FIREBASE_KEY = "Api_key";

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
        { email, password, returnSecureToken: true }
      );
      const { idToken, localId } = response.data;
      await AsyncStorage.setItem("token", idToken);
      await AsyncStorage.setItem("userId", localId);
      setToken(idToken);
      setUserId(localId);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
        { email, password, returnSecureToken: true }
      );
      const { idToken, localId } = res.data;
      await AsyncStorage.setItem("token", idToken);
      await AsyncStorage.setItem("userId", localId);

      await api.put(`/users/${localId}.json`, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      setToken(idToken);
      setUserId(localId);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  const checkSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
      }
    } catch (err) {
      console.error("Session error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserSession.Provider value={{ token, userId, loading, login, logout, register }}>
      {children}
    </UserSession.Provider>
  );
};