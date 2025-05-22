import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.history.push(order);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;