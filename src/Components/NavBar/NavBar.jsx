import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";
import MenuItems from "../Constants/MenuItems";
import "./NavBar.css";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";

const NavBar = () => {
  const ctx = useContext(cartContext);
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
            <ShoppingCart color="white" />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
