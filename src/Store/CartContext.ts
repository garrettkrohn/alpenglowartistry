import React from "react";
import { paintingResource } from "../Services/DTOs";

const cartContext = React.createContext({
  items: [],
  paintings: [],
  totalQuantity: 0,
  cart: {},
  addItem: (item: any) => {},
  removeItem: (id: number) => {},
  addPaintings: (painting: paintingResource) => {},
});

export default cartContext;
