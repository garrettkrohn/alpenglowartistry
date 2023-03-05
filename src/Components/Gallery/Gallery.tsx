import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import GalleryItem from "./GalleryItem";
import cartContext from "../../Store/CartContext";
import { CircularProgress } from "@mui/material";
import useHttp from "../../Hooks/useHttp";
import { paintingResource } from "../../Services/DTOs";

const Gallery = (props: { filter: string }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  //! gotta change this eventually
  const ctx: any = useContext(cartContext);

  const { isLoading, error, sendRequest: sendPaintingsRequest } = useHttp();

  //! another any tag
  const addPaintingstoCtx = (paintings: any) => {
    console.log(paintings);
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

  //if I ever allow multiple categories, this feature will break
  let filteredPaintings = [];
  filteredPaintings = ctx.paintings.filter(
    (painting: paintingResource) => painting.categories[0].name == props.filter
  );

  console.log(filteredPaintings);

  return (
    <div className="gallery">
      {filteredPaintings.map((painting: paintingResource) => (
        <GalleryItem key={painting.id} painting={painting} />
      ))}
    </div>
  );
};

export default Gallery;
