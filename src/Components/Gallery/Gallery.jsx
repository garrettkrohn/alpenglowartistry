import React, { useEffect, useState } from "react";
import "./Gallery.css";
import dark1 from "../../images/dark1.jpeg";
import GalleryItem from "./GalleryItem";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Authorization":
          "pk_test_505934dc3bfa4e8e6f49b09b3e46ccd75c9b834203c44",
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
