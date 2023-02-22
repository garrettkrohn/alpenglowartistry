import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Painting from "./Components/Paintings/Painting";
import Gallery from "./Components/Gallery/Gallery";
import CartProvider from "./Store/CartProvider";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Gallery />
      {/* <Painting /> */}
    </CartProvider>
  );
}

export default App;
