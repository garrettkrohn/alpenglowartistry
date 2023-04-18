import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Components/Checkout/Checkout';
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";
import React from "react";

function App() {
    return (
        // @ts-ignore
    <CartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/originals" element={<Gallery filter="Originals" />} />
        <Route path="/prints" element={<Gallery filter="Prints" />} />
        <Route path="/checkout" element={<Checkout />} />
        {/*<Route path="/painting" element={<Painting />} />*/}
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
