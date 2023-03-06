import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../Hooks/useHttp";
import { cartResource } from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";

const Checkout = () => {
  const ctx = useContext(cartContext);
  const [cart, setCart] = useState();

  const { isLoading, error, sendRequest: createCartRequest } = useHttp();

  const requestConfig = {
    url: "https://api.chec.io/v1/carts",
    method: "GET",
    headers: {
      "X-Authorization": process.env.REACT_APP_COMMERCE_TEST_KEY,
    },
  };

  const printCart = (data) => {
    setCart(data);
  };

  useEffect(() => {
    createCartRequest(requestConfig, printCart);
  }, []);

  return;
};

export default Checkout;
