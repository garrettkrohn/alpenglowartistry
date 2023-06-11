import React from "react";
import "./FooterElement.scss";
import { Link } from "react-router-dom";

const FooterElement = (props: {
  elements: { name: string; route: string }[];
  title: string;
}) => {
  const { title } = props;
  const { elements } = props;

  return (
    <div className="footer-element">
      <div className="footer-element-title">{title}</div>
      {elements.map((item) => (
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
