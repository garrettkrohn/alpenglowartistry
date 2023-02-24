import React from "react";
import "./FooterElement.css";
import { Link } from "react-router-dom";

const FooterElement = (props) => {
  return (
    <div className="footer-element">
      <div className="footer-element-title">{props.title}</div>
      {props.elements.map((item) => (
        <Link
          key={item.name}
          to={item.route}
          className="footer-element-list-item"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterElement;
