import React, { useContext, useState } from "react";
import RachelBanner from "../../images/RachelBanner.jpeg";
import "./Homepage.css";
import sunrise from "../../images/sunrise.jpeg";
import Scroller from "../Scroller/Scroller";
import cartContext from "../../Store/CartContext";

const Homepage = () => {
  const ctx = useContext(cartContext);
  const [paintingsArray, setPaintingsArray] = useState([]);

  console.log(ctx);
  const paintings = ctx.paintings;
  console.log(paintings);

  const paintingsToBeAdded = paintings.map((painting) => {
    return painting.image.url;
  });

  console.log(paintingsToBeAdded);
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
            Alpenglow Artistry offers Art by Rachel Westman - Acrylic
            landscapes, mountain scenes, and adoration of nature. Her works
            focus on the stunning beauty in nature.
          </div>
          <div>
            <button className="homepage-about-button">
              LEARN MORE ABOUT RACHEL
            </button>
          </div>
        </div>
      </div>

      <Scroller paintings={paintingsToBeAdded} />

      <div className="homepage-print-shop">
        <div className="homepage-print-shop-left">
          <div className="homepage-print-shop-title">THE PRINT SHOP</div>
          <div className="homepage-print-shop-paragraph">
            Hand printed reproductions of Rachel's stunning landscapes
          </div>
          <button className="homepage-print-shop-button">ORDER A PRINT</button>
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
