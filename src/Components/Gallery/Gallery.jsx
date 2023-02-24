import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import dark1 from "../../images/dark1.jpeg";
import GalleryItem from "./GalleryItem";
import cartContext from "../../Store/CartContext";
import { CircularProgress } from "@mui/material";
import useHttp from "../../Hooks/useHttp";

const Gallery = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  const ctx = useContext(cartContext);

  const { isLoading, error, sendRequest: sendPaintingsRequest } = useHttp();

  const addPaintingstoCtx = (paintings) => {
    const responseObject = {
      item: paintings.data,
    };
    ctx.addPaintings(responseObject);
  };

  useEffect(() => {
    const requestConfig = {
      url: "https://api.chec.io/v1/products/",
      method: "GET",
      headers: {
        "X-Authorization": process.env.REACT_APP_COMMERCE_TEST_KEY,
      },
    };

    if (ctx.paintings[0] === undefined) {
      const fetchPaintings = async () => {
        sendPaintingsRequest(requestConfig, addPaintingstoCtx);
      };
      fetchPaintings();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="inherit" size="70px" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="gallery">
      {ctx.paintings.map((painting) => (
        <GalleryItem key={painting.id} painting={painting} />
      ))}
    </div>
  );
};

export default Gallery;
