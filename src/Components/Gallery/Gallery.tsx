import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import GalleryItem from "./GalleryItem.tsx";
import cartContext from "../../Store/CartContext";
import { CircularProgress } from "@mui/material";
import useHttp from "../../Hooks/useHttp";
import {
  paintingResource,
  paintingResponseResource,
} from "../../Services/DTOs";
import Painting from "../Paintings/Painting.tsx";

const Gallery = (props: { filter: string }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  //! gotta change this eventually
  const ctx: any = useContext(cartContext);
  const [showPainting, setShowPainting] = useState(false);
  const [featuredPainting, setFeaturedPainting] = useState<
    paintingResource | undefined
  >(undefined);

  console.log(ctx.paintings[0]);

  const toggleFeaturePainting = () => {
    setShowPainting(!showPainting);
    console.log("toggle");
  };

  const { isLoading, error, sendRequest: sendPaintingsRequest } = useHttp();

  //! another any tag
  const addPaintingstoCtx = (paintings: paintingResponseResource) => {
    const responseObject = {
      item: paintings.data,
    };
    ctx.addPaintings(responseObject);
  };

  useEffect(() => {
    const requestConfig = {
      url: "https://api.chec.io/v1/products/?include=assets",
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

  return (
    <>
      {showPainting ? (
        <Painting
          painting={featuredPainting}
          togglePainting={toggleFeaturePainting}
        />
      ) : (
        ""
      )}
      <div className="gallery">
        {filteredPaintings.map((painting: paintingResource) => (
          <GalleryItem
            key={painting.id}
            painting={painting}
            setFeaturedPainting={setFeaturedPainting}
            togglePainting={toggleFeaturePainting}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
