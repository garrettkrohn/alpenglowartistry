import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  paintings: [],
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //check if item is already in cart
    for (let x = 0; x < state.items.length; x++) {
      if (state.items[x].id === action.item.id) {
        let updatedItems = state.items.map((item) => {
          return { ...item };
        });
        updatedItems.find((item) => item.id == action.item.id).quantity +=
          action.item.quantity;
        return { items: updatedItems };
      }
    }
    const addedItems = state.items.concat(action.item);

    //decrement the available quantity
    const editedPaintings = state.paintings.map((item) =>
      item.id == action.item.id
        ? {
            ...item,
            inventory: {
              ...item.inventory,
              available: item.inventory.available - 1,
            },
          }
        : item
    );

    console.log(editedPaintings);

    const totalQuantity = state.totalQuantity + 1;
    return {
      ...state,
      paintings: editedPaintings,
      items: addedItems,
      totalQuantity: totalQuantity,
    };
  }

  if (action.type === "CART") {
    return {
      ...state,
      paintings: action.item,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item.item });
  };

  const addPaintings = (item) => {
    dispatchCartAction({ type: "CART", item: item.item });
  };

  const cartContext = {
    items: cartState.items,
    paintings: cartState.paintings,
    totalQuantity: cartState.totalQuantity,
    addItem: addItemToCartHandler,
    addPaintings: addPaintings,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
