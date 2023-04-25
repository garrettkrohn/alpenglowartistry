import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../Hooks/useHttp";
import {cartResource, paintingResource} from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import {useMutation, useQuery} from "@tanstack/react-query";
import './Checkout.css'
import {itemResource, image_dimensions} from './CheckoutDtos';

const Checkout = () => {
  const ctx = useContext(cartContext);
  // console.log(ctx);
  const localCart = ctx.items;
  const [cartId, setCartId] = useState('');

  const [stepper, setStepper] = useState(0);

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

  async function addItemToCart(cartId: string, itemId: string ): Promise<cartResource> {
    const url = `https://api.chec.io/v1/carts/${cartId}`;
    console.log(url);

    return await fetch(url, {
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': process.env.REACT_APP_COMMERCE_TEST_KEY
      },
      method: 'POST',
      body: JSON.stringify(itemId),
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
    mutationFn: (itemId: string) =>
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

    const AddItemComponent = (props: {itemId: string}) => {
        console.log(props.itemId);
        addItem(props.itemId);
        return <div>{props.itemId}</div>;
    }

    const addAllItemsToCart = () => {
        if (cartData) {
            //@ts-ignore
            console.log('adding items', ctx.items);
            ctx.items.map((item) => <AddItemComponent itemId={item.id} />)
        } else {
            console.log('no cart data');
        }
    }

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
        <button onClick={() => addAllItemsToCart()}>Add all items to cart</button>
      </div>
      )
};

export default Checkout;
