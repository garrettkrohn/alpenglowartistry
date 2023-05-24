import React from "react";
import { line_items } from "../../Services/DTOs";
import "./Checkout.scss";
import CartServices from "../../Services/CartServices";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartDispatch, RootState } from "../../Store";

const Checkout = (props: { cartId: string; setCartId: Function }) => {
  const dispatch: CartDispatch = useDispatch();

  const cartService = new CartServices();
  const cartStore = useSelector((state: RootState) => state.cart);
  console.log(cartStore);

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

  return (
    <div>
      {cartStore.line_items.length === 0 ? <div>No items in cart</div> : ""}
      <div className="checkout-container">
        {cartStore.line_items.map((item: line_items, index: number) => (
          <div className={"checkout-row"} key={index}>
            <img
              src={item.image.url}
              className={"checkout-thumbnail"}
              alt={item.name}
            />
            <div className="checkout-row-right">
              <div className="checkout-title">{item.name}</div>
              <div className="checkout-price">
                {item.price.formatted_with_symbol}
              </div>
              <div>Quantity: {item.quantity}</div>
              <button onClick={() => removeItem(item.id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        Subtotal:
        {cartStore.subtotal.formatted_with_symbol}
      </div>
      {/*<button onClick={() => refetchCreateCart()}>Refetch Cart</button>*/}
      <Link to={cartStore.hosted_checkout_url}>
        <button onClick={clearLocalCartId}>Checkout</button>
      </Link>
    </div>
  );
};

export default Checkout;
