import React, { useEffect, useState } from "react";
import { line_items } from "../../Services/DTOs";
import "./Checkout.scss";
import CartServices from "../../Services/CartServices";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartDispatch, RootState } from "../../Store";
import { Loading } from "../../Util/loading";

const Checkout = (props: { cartId: string; setCartId: Function }) => {
  const dispatch: CartDispatch = useDispatch();
  const [stepper, setStepper] = useState(0);

  const cartService = new CartServices();
  const cartStore = useSelector((state: RootState) => state);
  console.log(cartStore);

  const incrementStepper = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    }
  };

  const decrementStepper = () => {
    if (stepper > 0) {
      setStepper(stepper - 1);
    }
  };

  const removeItem = async (itemId: string) => {
    dispatch(cartActions.toggleLoading());
    console.log("remove item called");
    const newCart = await cartService.emptyItemFromCart(props.cartId, itemId);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
  };

  const clearLocalCartId = () => {
    localStorage.setItem("cartId", "");
  };

  const emptyCart = async () => {
    dispatch(cartActions.toggleLoading());
    console.log("empty cart");
    const newCart = await cartService.emptyCart(props.cartId);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
  };

  useEffect(() => {
    const getCart = async () => {
      const checkoutObject = await cartService.getCheckoutToken(
        cartStore.cart.id
      );
      console.log(checkoutObject);
    };

    getCart();
  }, []);

  if (stepper === 1) {
    return (
      <div>
        <div>billing address</div>
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }

  if (stepper === 2) {
    return (
      <div>
        <div>shipping address</div>;
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }

  if (stepper === 3) {
    return (
      <div>
        <div>credit card</div>
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }
  return (
    <div>
      {cartStore.cart.line_items.length === 0 ? (
        <div>No items in cart</div>
      ) : (
        ""
      )}
      {cartStore.isLoading ? <Loading size="76px" /> : ""}
      <div className="checkout-container">
        {cartStore.cart.line_items.map((item: line_items, index: number) => (
          <div className={"checkout-row"} key={index}>
            <img
              src={item.image.url}
              className={"checkout-thumbnail"}
              alt={item.name}
            />
            <div className="checkout-title">{item.name}</div>
            <div className="checkout-price">
              {item.price.formatted_with_symbol}
            </div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => removeItem(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <div>
        Subtotal:
        {cartStore.cart.subtotal.formatted_with_symbol}
      </div>
      <button onClick={incrementStepper}>Checkout</button>
      <button onClick={emptyCart}>Empty cart</button>
    </div>
  );
};

export default Checkout;
