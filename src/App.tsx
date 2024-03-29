import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";
import React, { useEffect, useState } from "react";
import Contact from "./Components/Contact/Contact";
import Commissions from "./Components/Commissions/Commissions";
import About from "./Components/About/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartServices from "./Services/CartServices";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartDispatch, RootState } from "./Store";

const queryClient = new QueryClient();
const cartServices = new CartServices();

function App() {
  const [cartId, setCartId] = useState("");

  const dispatch: CartDispatch = useDispatch();
  const cartStore = useSelector((state: RootState) => state.cart);
  const setCartIdLog = (id: string) => {
    setCartId(id);
  };

  const fetchCart = async () => {
    const cart = await cartServices.createOrGetCart(localStorage.cartId);
    setCartId(cart.id);
    dispatch(cartActions.setCart(cart));
    localStorage.setItem("cartId", cart.id);
  };

  useEffect(() => {
    console.log("cart store id is:", cartStore.id);
    if (
      cartStore.id === "id" ||
      cartStore.id === "" ||
      localStorage.getItem("cartId") === "undefined"
    ) {
      fetchCart();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/*
    // @ts-ignore */}
      <CartProvider>
        <NavBar cartId={cartId} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/originals"
            element={
              <Gallery
                filter="Originals"
                cartId={cartId}
                setCartId={setCartIdLog}
              />
            }
          />
          <Route
            path="/prints"
            element={
              <Gallery
                filter="Prints"
                cartId={cartId}
                setCartId={setCartIdLog}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartId={cartId} setCartId={setCartIdLog} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route
            path="/portfolio"
            element={
              <Gallery
                filter="Portfolio"
                cartId={cartId}
                setCartId={setCartIdLog}
              />
            }
          />
        </Routes>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
