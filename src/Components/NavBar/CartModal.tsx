import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import "./CartModal.css";
import CartModalItem from "./CartModalItem";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CartModal = (props: { toggleCart: Function; cartId: string }) => {
  const ctx = useContext(cartContext);

  const {
    data: cartData,
    refetch: refetchCreateCart,
    isLoading: cartIsLoading,
    isError: cartIsError,
  } = useQuery({
    queryKey: [`cart`],
    //@ts-ignore
    queryFn: () => cartService.createOrGetCart(cartId),
    enabled: false,
  });

  if (cartIsError) {
    return <div>error</div>;
  }

  if (cartIsLoading) {
    return <div>Loading...</div>;
  }

  const numberInCart = ctx.items.length;
  console.log(ctx.items);
  return (
    <div className="cart-modal">
      <div className="cart-modal-title">Cart</div>
      {cartData.map((item: any) => (
        <CartModalItem item={item} key={item.id} cartId={props.cartId} />
      ))}
      {numberInCart > 0 ? (
        <div className="cart-modal-button" onClick={() => props.toggleCart}>
          <Link to="/checkout">
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
