import React, { useEffect, useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";
import "./Scroller.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Scroller = () => {
  const [displayPaintings, setDisplayPaintings] = useState([]);

  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  useEffect(() => {
    function importAll(r: any) {
      let images = {};
      r.keys().forEach((item: any, index: number) => {
        // @ts-ignore
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }
    const images = importAll(
      // @ts-ignore
      require.context(
        "./../../images/ScrollerImages",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );

    setDisplayPaintings(Object.values(images));
  }, []);

  return (
    <div className="scroller-container">
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
        {displayPaintings.map((painting) => (
          <li
            key={painting}
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
              alt={painting}
            ></img>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default Scroller;
