import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import MenuItems from "../Constants/MenuItems";
import "./NavBar.css";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import CartModal from "./CartModal";
import { useState } from "react";

const NavBar = () => {
  const ctx = useContext(cartContext);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        {MenuItems.map((item) => (
          <div key={item.name} className="navbar-left-menu_item">
            {item.name}
          </div>
        ))}
      </div>
      <div className="navbar-right">
        <div className="navbar-right-cart">
          <Badge badgeContent={ctx.totalQuantity} color="primary">
            <ShoppingCart color="white" onClick={toggleCart} />
          </Badge>
          {showCart ? <CartModal /> : ""}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
