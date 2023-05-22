import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import MenuItems from "../Constants/MENU_ITEMS";
import "./NavBar.css";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import CartModal from "./CartModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = (props: { cartId: string }) => {
  const ctx = useContext(cartContext);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const Menu = (
    <>
      <div className="mobile-menu">
        {MenuItems.map((page) => (
          <Link
            key={page.name}
            to={page.route}
            className="mobile-menu-item"
            onClick={toggleMenu}
          >
            {page.name}
          </Link>
        ))}
      </div>
      <div className="mobile-menu-background" onClick={toggleMenu}></div>
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-menu-icon">
          <MenuIcon
            sx={{ color: "white", fontSize: 35 }}
            onClick={toggleMenu}
          />
          {showMenu ? Menu : ""}
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
          <Link to="/checkout">
            <Badge badgeContent={ctx.totalQuantity} color="primary">
              {/*
      // @ts-ignore */}
              <ShoppingCart color="white" />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
