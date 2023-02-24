import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import cartContext from "../../Store/CartContext";

const CartModalItem = (props) => {
  const ctx = useContext(cartContext);

  const handleRemove = (item) => {
    const responseObject = {
      item: props.item,
    };
    ctx.removeItem(responseObject);
  };

  return (
    <div className="cart-modal-items" key={props.item.id}>
      <div className="cart-modal-items-left">
        <img
          className="cart-modal-items-photo"
          src={props.item.image.url}
          alt=""
        />
        <div className="cart-modal-items-text">
          <div className="cart-modal-items-name">{props.item.name}</div>
          <div className="cart-modal-items-price">
            {props.item.price.formatted_with_symbol}
          </div>
        </div>
      </div>

      <DeleteIcon
        color="primary"
        className="cart-modal-items-delete"
        onClick={handleRemove}
      />
    </div>
  );
};

export default CartModalItem;
