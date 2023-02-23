import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Painting from "./Components/Paintings/Painting";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/painting" element={<Painting />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
