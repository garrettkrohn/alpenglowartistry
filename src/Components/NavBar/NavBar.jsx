import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import MenuItems from "../Constants/MenuItems";
import "./NavBar.css";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import CartModal from "./CartModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const ctx = useContext(cartContext);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-menu-icon">
          <MenuIcon sx={{ color: "white", fontSize: 35 }} />
        </div>
        <div className="navbar-menu-list">
          {MenuItems.map((page) => (
            <Link
              key={page.name}
              to={page.route}
              className="navbar-left-menu_item"
            >
              {page.name}
            </Link>
          ))}
        </div>
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
