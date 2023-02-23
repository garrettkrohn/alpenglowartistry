import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import "./CartModal.css";
import DeleteIcon from "@mui/icons-material/Delete";

const CartModal = () => {
  const ctx = useContext(cartContext);

  const numberInCart = ctx.items.length;

  return (
    <div className="cart-modal">
      <div className="cart-modal-title">Cart</div>
      {ctx.items.map((item) => (
        <div className="cart-modal-items" key={item.id}>
          <div className="cart-modal-items-left">
            <img
              className="cart-modal-items-photo"
              src={item.image.url}
              alt=""
            />
            <div className="cart-modal-items-text">
              <div className="cart-modal-items-name">{item.name}</div>
              <div className="cart-modal-items-price">
                {item.price.formatted_with_symbol}
              </div>
            </div>
          </div>

          <DeleteIcon color="primary" className="cart-modal-items-delete" />
        </div>
      ))}
      {numberInCart > 0 ? (
        <div className="cart-modal-button">
          <button className="checkout-button">Checkout</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartModal;
