import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Components/Checkout/Checkout';
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";
import React from "react";
import Contact from "./Components/Contact/Contact";
import Commissions from './Components/Commissions/Commissions'
import About from "./Components/About/About";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

    return (
      <QueryClientProvider client={queryClient}>
              {/*
    // @ts-ignore */}
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/originals" element={<Gallery filter="Originals" />} />
            <Route path="/prints" element={<Gallery filter="Prints" />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/portfolio" element={<Gallery filter="Portfolio" />} />
          </Routes>
          <Footer />
        </CartProvider>
      </QueryClientProvider>
  );
}

export default App;
