import React from "react";

const cartContext = React.createContext({
  items: [],
  paintings: [],
  totalQuantity: 0,
  cart: {},
  addItem: (item) => {},
  removeItem: (id) => {},
  addPaintings: (painting) => {},
});

export default cartContext;
