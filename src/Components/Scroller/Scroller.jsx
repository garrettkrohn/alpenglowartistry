import React, { useContext, useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";
import cartContext from "../../Store/CartContext";

const Scroller = (props) => {
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
        }}
      >
        {props.paintings.map((painting) => (
          <li
            style={{
              backgroundColor: "aqua",
              fontSize: "50px",
              width: "250px",
              height: "250px",
              flexShrink: 0,
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={painting}></img>
          </li>
        ))}
      </ul>
      <button onClick={() => prev()}>Prev</button>
      <button onClick={() => next()}>Next</button>
    </>
  );
};

export default Scroller;
