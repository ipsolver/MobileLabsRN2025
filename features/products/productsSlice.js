import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("/products.json");
  const data = res.data || {};
  return Object.keys(data).map(id => ({ id, ...data[id] }));
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await api.post("/products.json", product);
  return { id: res.data.name, ...product };
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await api.delete(`/products/${id}.json`);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false; })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;