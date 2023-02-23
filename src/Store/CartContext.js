import React from "react";

const cartContext = React.createContext({
  items: [],
  paintings: [],
  totalQuantity: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  addPaintings: (painting) => {},
});

export default cartContext;
