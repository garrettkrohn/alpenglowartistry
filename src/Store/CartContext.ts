import React from "react";
import { paintingResource } from "../Services/DTOs";

export type cartContextResource = {
  items: paintingResource[];
  paintings: paintingResource[];
  totalQuantity: number;
  cart: {};
  addItem: Function;
  removeItem: Function;
  addPaintings: Function;
  cartId: string;
};

const CartContext = React.createContext<cartContextResource>({
  items: [],
  paintings: [],
  totalQuantity: 0,
  cart: {},
  addItem: (item: paintingResource) => {},
  removeItem: (id: string) => {},
  addPaintings: (painting: paintingResource) => {},
  cartId: "",
});

export default CartContext;
