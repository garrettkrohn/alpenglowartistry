import React from "react";
import Dark1 from "../../images/dark1.jpeg";
import Dark2 from "../../images/dark2.jpeg";
import Dark3 from "../../images/dark3.jpeg";
import "./painting.css";

const Painting = () => {
  return (
    <div className="painting-block">
      <div className="painting-block-left">
        <div className="painting-featured-top">
          <img src={Dark1} alt="painting" className="painting-feature" />
        </div>
        <div className="painting-featured-bottom">
          <img src={Dark1} alt="painting" className="painting-thumbnail" />
          <img src={Dark2} alt="" className="painting-thumbnail" />
          <img src={Dark3} alt="" className="painting-thumbnail" />
        </div>
      </div>
      <div className="painting-block-right">
        <div className="painting-brand">Westman</div>
        <div className="painting-title">Loveland Pass</div>
        <div className="painting-description">
          A moody 24”x36” Acrylic on Stretched Canvas
        </div>
        <div className="painting-price">$100</div>
      </div>
    </div>
  );
};

export default Painting;
