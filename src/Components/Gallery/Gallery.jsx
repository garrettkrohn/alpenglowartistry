import React, { useEffect, useState } from "react";
import "./Gallery.css";
import dark1 from "../../images/dark1.jpeg";

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

      //   for (const index in responseDataData) {
      //     loadedPaintings.push({
      //       id: responseData[index].name,
      //       name: responseData[index].name,
      //       description: responseData[index].description,
      //       price: responseData[index].price,
      //       image: responseData[index].description,
      //     });
      //   }
      setPaintings(responseData.data);
      setIsLoading(false);
      console.log(paintings);
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
        <div className="gallery-item">
          <img
            src={painting.image.url}
            alt="painting"
            className="gallery-item-thumbnail"
          />
          <div className="gallery-item-title">{painting.name}</div>
          <div className="gallery-item-description">{painting.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
