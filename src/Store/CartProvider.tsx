import { PropsWithChildren, Reducer, useReducer } from "react";
import { paintingResource } from "../Services/DTOs";
import { cartContextResource } from "./CartContext";
import CartContext from "./CartContext";
import React from "react";

const defaultCartState = {
  items: [],
  paintings: [],
  totalQuantity: 0,
  cart: {},
  addItem: () => [],
  removeItem: () => {},
  addPaintings: () => {},
  cartId: "",
};

type actionsResource = {
  type: string;
  item: any;
};

const cartReducer: Reducer<cartContextResource, actionsResource> = (
  state,
  action
): any => {
  const { type, item } = action;

  if (action.type === "ADD") {
    //check if item is already in cart
    for (let x = 0; x < state.items.length; x++) {
      if (state.items[x].id === action.item.id) {
        let updatedItems: paintingResource[] = state.items.map(
          (item: paintingResource) => {
            return { ...item };
          }
        );
        // @ts-ignore
        updatedItems.find(
          (item: paintingResource) => item.id == action.item.id
        ).quantity += action.item.quantity;
        return { ...state, items: updatedItems };
      }
    }
    const addedItems = state.items.concat(action.item);

    //decrement the available quantity
    const editedPaintings = state.paintings.map((item: paintingResource) =>
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

  if (action.type === "REMOVE") {
    let updatedItems = state.items.map((item: paintingResource) => {
      return { ...item };
    });

    if (
      // @ts-ignore

      updatedItems.find((item: paintingResource) => item.id == action.item.id)
        .inventory.available === 1
    ) {
      var indexOfId = updatedItems.findIndex(
        (i: paintingResource) => i.id === action.item.id
      );
      updatedItems.splice(indexOfId, 1);
    } else {
      // @ts-ignore
      updatedItems.find(
        (item: paintingResource) => item.name == action.item.name
      ).inventory.available -= 1;
    }

    const editedPaintings = state.paintings.map((item: paintingResource) =>
      item.id == action.item.id
        ? {
            ...item,
            inventory: {
              ...item.inventory,
              available: item.inventory.available + 1,
            },
          }
        : item
    );

    const totalQuantity = state.totalQuantity - 1;

    return {
      ...state,
      items: updatedItems,
      totalQuantity: totalQuantity,
      paintings: editedPaintings,
    };
  }
};

const CartProvider: React.FC<PropsWithChildren<React.ReactNode>> = ({
  children,
}) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: { item: paintingResource }) => {
    dispatchCartAction({ type: "ADD", item: item.item });
  };

  const addPaintings = (item: { item: paintingResource }) => {
    dispatchCartAction({ type: "CART", item: item.item });
  };

  const removeItemCartHandler = (item: { item: paintingResource }) => {
    dispatchCartAction({ type: "REMOVE", item: item.item });
  };

  const cartContext = {
    items: cartState.items,
    paintings: cartState.paintings,
    cart: cartState.cart,
    totalQuantity: cartState.totalQuantity,
    addItem: addItemToCartHandler,
    addPaintings: addPaintings,
    removeItem: removeItemCartHandler,
    cartId: cartState.cartId,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
