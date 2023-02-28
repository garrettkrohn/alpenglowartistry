import React, { useContext, useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";
import "./Scroller.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Scroller = (props) => {
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context(
      "./../../images/ScrollerImages",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const imagesArray = Object.values(images);

  const shuffledArray = imagesArray.sort((a, b) => 0.5 - Math.random());

  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
    <>
      <ul
        ref={scrollRef}
        style={{
          display: "flex",
          overflow: "auto",
          scrollSnapType: "x mandatory",
          padding: "0",
          margin: "0",
        }}
      >
        {shuffledArray.map((painting) => (
          <li
            style={{
              flexShrink: 0,
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={painting}
              style={{ height: "450px", width: "auto", objectFit: "contain" }}
            ></img>
          </li>
        ))}
        <div className="scroller-prev">
          <ArrowBackIosIcon
            sx={{ fontSize: 100, color: "white" }}
            onClick={() => prev()}
          />
        </div>
        <div className="scroller-next">
          <ArrowForwardIosIcon
            sx={{ fontSize: 100, color: "white" }}
            onClick={() => next()}
          />
        </div>
      </ul>
    </>
  );
};

export default Scroller;
