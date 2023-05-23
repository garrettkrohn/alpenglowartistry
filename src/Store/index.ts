import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartResource } from "../Services/DTOs";

const cartInitialState: { cart: cartResource } = {
  cart: {
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
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    updateItems(state, action) {
      state.cart.line_items = action.payload.line_items;
    },
  },
});

const store = configureStore({
  reducer: cartSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type CartDispatch = typeof store.dispatch;
// export const useCartDispatch = () => (CartDispatch = useDispatch);

export const cartActions = cartSlice.actions;

export default store;
