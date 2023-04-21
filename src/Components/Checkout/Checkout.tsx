import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../Hooks/useHttp";
import {cartResource, paintingResource} from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import {useMutation, useQuery} from "@tanstack/react-query";
import './Checkout.css'

const Checkout = () => {
  const ctx = useContext(cartContext);
  const localCart = ctx.items;
  const [cartId, setCartId] = useState('');

  const [stepper, setStepper] = useState(0);

  console.log(ctx.items);

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

  async function createCart(key: string | null): Promise<cartResource> {
    let url = '';
    if (!key) {
      url = 'https://api.chec.io/v1/carts';
    } else {
      url = `https://api.chec.io/v1/carts/${key}`;
    }
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
            setCartId(data.id);
            console.log(data);
            return data;
          })
          .catch(error => {
            console.error('Error:', error);
            throw error;
          });
  }

  interface itemResource {
    active: boolean;
    assets: {
      created_at: number;
      description: string;
      file_extension: string;
      file_size: number;
      file_name: string;
      id: string;
      image_dimensions: image_dimensions;
      is_image: boolean;
      meta: [];
      updated_at: number;
      url: string;
    }
    categories: [{
      id: string;
      name: string;
      slug: string
    }]
    checkout_url: {
      checkout: string;
      display: string;
    }
    collects: {};
    conditionals: {};
    created: number;
    description: string;
    has: {};
    id: string;
    image: {
      created_at: number;
      description: string;
      file_extension: string;
      file_size: number;
      filename: string;
      id: string;
      image_dimensions: image_dimensions;
      is_image: boolean;
      meta: [];
      updated_at: number;
      url: string;
    }
  }

  interface image_dimensions {
    width: number;
    height: number;
  }

  async function addItemToCart(cartId: string, items: any ): Promise<cartResource> {
    const url = `https://api.chec.io/v1/carts/${cartId}`;
    console.log(url);
    return await fetch(url, {
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': process.env.REACT_APP_COMMERCE_TEST_KEY
      },
      method: 'POST',
      body: JSON.stringify(cartId),
    })
        .then(response => response.json())
        .then((data: cartResource) => {
          setCartId(data.id);
          console.log(data);
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
    queryFn: () => createCart(cartId),
    enabled: false,
  });

  const { mutate: addItem, data: cartAddedData } = useMutation({
    mutationFn: () =>
        //@ts-ignore
        addItemToCart(cardData.id),
    onMutate: () => console.log('adding item to cart'),
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
    onSettled: () => {
      console.log('item added to cart', cartAddedData);
      refetchCreateCart();
    },
  });

  useEffect(() => {
      refetchCreateCart();
  }, []);


  return (
      <div>
        {localCart.length === 0 ? <div>No items in cart</div> : ''}
        <div className='checkout-container'>
          {localCart.map((item: paintingResource, index: number) => (
              <div className={'checkout-row'} key={index}>
                <img src={item.image.url} className={'checkout-thumbnail'} alt={item.name}/>
                <div className='checkout-title'>{item.name}</div>
                <div className='checkout-price'>{item.price.formatted_with_symbol}</div>
              </div>
          ))}
        </div>
        <button onClick={() => refetchCreateCart()}>Refetch Cart</button>
        {/*
// @ts-ignore */}
        <button onClick={() => addItemToCart(cartData.id, cardData.items[0].id)}>Add first item</button>
      </div>
      )
};

export default Checkout;
