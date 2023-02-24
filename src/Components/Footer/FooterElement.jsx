import React from "react";
import "./FooterElement.css";

const FooterElement = (props) => {
  console.log(props.elements);
  return (
    <div className="footer-element">
      <div className="footer-element-title">{props.title}</div>
      {props.elements.map((item) => (
        <div className="footer-element-list-item">{item.name}</div>
      ))}
    </div>
  );
};

export default FooterElement;
