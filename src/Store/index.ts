import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartInitialState = {
  id: "id",
  created: 123,
  updated: 123,
  expires: 123,
  total_items: 123,
  total_unique_items: 123,
  subtotal: {
    raw: 123,
    formatted: "123",
    formatted_with_symbol: "$123",
    formatted_with_code: "$$123",
  },
  hosted_checkout_url: "url",
  line_items: [],
  currency: {
    code: "us",
    symbol: "$",
  },
  discount: [],
  meta: 123,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    setCart(state) {
      state = state;
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;

export default store;
