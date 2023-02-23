import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import dark1 from "../../images/dark1.jpeg";
import GalleryItem from "./GalleryItem";
import cartContext from "../../Store/CartContext";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
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

      setPaintings(responseData.data);
      addPaintingstoCtx(responseData.data);
      setIsLoading(false);
    };
    fetchPaintings().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="gallery">
      {paintings.map((painting) => (
        <GalleryItem key={painting} painting={painting} />
      ))}
    </div>
  );
};

export default Gallery;
