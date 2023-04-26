import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../Hooks/useHttp";
import {cartResource, line_items, paintingResource} from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import {useMutation, useQuery} from "@tanstack/react-query";
import './Checkout.css'
import {itemResource, image_dimensions} from './CheckoutDtos';
import CartServices from "../../Services/CartServices";
import {Link} from "react-router-dom";

const Checkout = (props: {cartId: string, setCartId: Function}) => {
    const {cartId, setCartId} = props;
  const ctx = useContext(cartContext);
  // console.log(ctx);
  const localCart = ctx.items;
  // const [cartId, setCartId] = useState('');

  const [stepper, setStepper] = useState(0);

  const cartServices = new CartServices();

  const {
    data: cartData,
    refetch: refetchCreateCart,
    isLoading: cartIsLoading,
    isError: cartIsError,
  } = useQuery({
    queryKey: [`cart`],
    //@ts-ignore
    queryFn: () => cartServices.createOrGetCart(cartId),
    enabled: false,
  });

  if (cartData) {
      setCartId(cartData.id);
  }

  useEffect(() => {
      refetchCreateCart();
  }, []);

  if (cartIsError) {
      return <div>error</div>
  }

  if (cartIsLoading) {
      return <div>Loading...</div>
  }

  return (
      <div>
        {cartData.line_items.length === 0 ? <div>No items in cart</div> : ''}
        <div className='checkout-container'>
          {cartData.line_items.map((item: line_items, index: number) => (
              <div className={'checkout-row'} key={index}>
                <img src={item.image.url} className={'checkout-thumbnail'} alt={item.name}/>
                <div className='checkout-title'>{item.name}</div>
                <div className='checkout-price'>{item.price.formatted_with_symbol}</div>
              </div>
          ))}
        </div>
          <div>Subtotal:
              {cartData?.subtotal.formatted_with_symbol}
          </div>
        {/*<button onClick={() => refetchCreateCart()}>Refetch Cart</button>*/}
          <Link to={cartData?.hosted_checkout_url}>
              <button>Checkout</button>
          </Link>
      </div>
      )
};

export default Checkout;
