import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import "./CartModal.css";
import CartModalItem from "./CartModalItem";
import {Link} from "react-router-dom";

const CartModal = (props: {toggleCart: Function}) => {
  const ctx = useContext(cartContext);

  const numberInCart = ctx.items.length;

  return (
    <div className="cart-modal">
      <div className="cart-modal-title">Cart</div>
      {ctx.items.map((item) => (
        <CartModalItem item={item} key={item.id} />
      ))}
      {numberInCart > 0 ? (
        <div className="cart-modal-button" onClick={() => props.toggleCart}>
          <Link to='/checkout'>
            <button className="checkout-button">Checkout</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartModal;
