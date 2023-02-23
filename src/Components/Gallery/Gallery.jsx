import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import dark1 from "../../images/dark1.jpeg";
import GalleryItem from "./GalleryItem";
import cartContext from "../../Store/CartContext";
import { CircularProgress } from "@mui/material";

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const ctx = useContext(cartContext);

  const addPaintingstoCtx = (paintings) => {
    const responseObject = {
      item: paintings,
    };
    ctx.addPaintings(responseObject);
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Authorization": process.env.REACT_APP_COMMERCE_TEST_KEY,
      },
    };
    const fetchPaintings = async () => {
      const response = await fetch(
        "https://api.chec.io/v1/products/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      addPaintingstoCtx(responseData.data);
      setIsLoading(false);
    };
    fetchPaintings().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
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
      {ctx.paintings.item.map((painting) => (
        <GalleryItem key={painting.id} painting={painting} />
      ))}
    </div>
  );
};

export default Gallery;
