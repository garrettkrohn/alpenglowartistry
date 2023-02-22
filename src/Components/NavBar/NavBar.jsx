import React from "react";
import MenuItems from "../Constants/MenuItems";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {MenuItems.map((item) => (
          <div className="navbar-left-menu_item">{item.name}</div>
        ))}
      </div>
      <div className="navbar-right">
        <div className="navbar-right-cart">Cart</div>
      </div>
    </div>
  );
};

export default NavBar;
