import React, { useContext, useState } from "react";
// @ts-ignore
import RachelBanner from "../../images/RachelBanner.jpeg";
import "./Homepage.css";
// @ts-ignore
import sunrise from "../../images/sunrise.jpeg";
import Scroller from "../Scroller/Scroller";
import cartContext from "../../Store/CartContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const ctx = useContext(cartContext);
  const [paintingsArray, setPaintingsArray] = useState([]);

  const paintings = ctx.paintings;

  const paintingsToBeAdded = paintings.map((painting) => {
    return painting.image.url;
  });

  //arr = arr.map(function(item) {
  //   return {somethingElse: 1};
  // });
  return (
    <div className="homepage">
      <div className="homepage-top">
        <div className="homepage-banner-container">
          <img
            src={RachelBanner}
            alt="Rachel Banner"
            className="homepage-banner"
          />
          <div className="homepage-title">Alpenglow Artistry</div>
        </div>
        <div className="homepage-about-container">
          <div className="homepage-about-paragraph">
            Alpenglow Artistry offers acrylic paintings and prints created by Rachel Westman -
            landscapes of mountains, oceans, and beauty in nature.
          </div>
          <div>
            <Link to="/about">
              <button className="homepage-about-button">
                LEARN MORE ABOUT RACHEL
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Scroller />

      <div className="homepage-print-shop">
        <div className="homepage-print-shop-left">
          <div className="homepage-print-shop-title">THE PRINT SHOP</div>
          <div className="homepage-print-shop-paragraph">
            Hand printed reproductions of Rachel's stunning landscapes
          </div>
          <Link to="/prints">
            <button className="homepage-print-shop-button">
              ORDER A PRINT
            </button>
          </Link>
        </div>
        <div className="homepage-print-shop-right">
          <img
            src={sunrise}
            alt="sunrise"
            className="homepage-print-shop-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
