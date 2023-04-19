import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../Hooks/useHttp";
import {cartResource, paintingResource} from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import {useQuery} from "@tanstack/react-query";
import './Checkout.css'

const Checkout = () => {
  const ctx = useContext(cartContext);
  const localCart = ctx.items;
  console.log(localCart);
  const [cart, setCart] = useState();

  interface cartResource {
    id: string;
    created: number;
    updated: number;
    expires: number;
    total_items: number;
    total_unique_items: number;
    subtotal: {
      raw: number;
      formatted: string;
      formatted_with_symbol: string;
      formatted_with_code: string;
    };
    hosted_checkout_url: string;
    line_items: [{
      id: string;
      product_id: string;
      name: string;
      product_name: string;
      sku: string;
      permalink: string;
      quantity: number;
      price: {
        raw: number;
        formatted: string;
        formatted_with_symbol: string;
        formatted_with_code: string;
      };
      line_total: {
        raw: number;
        formatted: string;
        formatted_with_symbol: string;
        formatted_with_code: string;
      };
      is_valid: boolean;
      product_meta: [];
      selected_options: [];
      variant: string;
      image: string;
    }];
    currency: {
      code: string;
      symbol: string;
    };
    discount: [];
    meta: number;
  }

  async function createCart(): Promise<cartResource> {
    const url = 'https://api.chec.io/v1/carts';
    return await fetch(url, {
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': process.env.REACT_APP_COMMERCE_TEST_KEY
      },
      method: 'GET',
    })
        .then(response => response.json())
        .then((data: cartResource) => {
          console.log('Success:', data);
          return data;
        })
        .catch(error => {
          console.error('Error:', error);
          throw error;
        });
  }

  const {
    isLoading: cartIsLoading,
    error: cartError,
    data: cartData,
    refetch: refetchCreateCart,
  } = useQuery({
    queryKey: [`cart`],
    //@ts-ignore
    queryFn: () => createCart(),
    enabled: false,
  });

  useEffect(() => {
      refetchCreateCart();
  }, []);


  return <div>
    {localCart.length === 0 ? <div>No items in cart</div> : ''}
    <div className='checkout-container'>
      {localCart.map((item: paintingResource, index: number) => (
          <div className={'checkout-row'}>
            <img src={item.image.url} className={'checkout-thumbnail'}/>
            <div className='checkout-title'>{item.name}</div>
            <div className='checkout-price'>{item.price.formatted_with_symbol}</div>
          </div>
      ))}
    </div>
  </div>;
};

export default Checkout;
