import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Painting from "./Components/Paintings/Painting";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <CartProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Collection" element={<Gallery />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/painting" element={<Painting />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
