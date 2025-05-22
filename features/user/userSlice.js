import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

const initialState = {
  token: null,
  id: null,
  name: null,
  email: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, id, name, email, isAdmin } = action.payload;
      state.token = token;
      state.id = id;
      state.name = name;
      state.email = email;
      state.isAdmin = isAdmin;
    },
    logout: (state) => {
      state.token = null;
      state.id = null;
      state.name = null;
      state.email = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

const API_KEY = "My_API";

export const loginUser = (email, password) => async (dispatch) => {
  const response = await api.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    { email, password, returnSecureToken: true }
  );
  const { idToken, localId } = response.data;
  await AsyncStorage.setItem("userToken", idToken);
  const res = await api.get(`/users/${localId}.json`);
  const user = res.data || {};
  dispatch(login({ token: idToken, id: localId, ...user }));
};

export const registerUser = (email, password, name) => async (dispatch) => {
  const res = await api.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    { email, password, returnSecureToken: true }
  );
  const { localId, idToken } = res.data;
  await AsyncStorage.setItem("userToken", idToken);
  await api.put(`/users/${localId}.json`, { email, name, isAdmin: false });
  dispatch(login({ token: idToken, id: localId, email, name, isAdmin: false }));
};

export default userSlice.reducer;