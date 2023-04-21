import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import GalleryItem from "./GalleryItem";
import cartContext, { cartContextResource } from "../../Store/CartContext";
import { CircularProgress } from "@mui/material";
import useHttp from "../../Hooks/useHttp";
import {
  paintingResource,
  paintingResponseResource,
} from "../../Services/DTOs";
import Painting from "../Paintings/Painting";

const Gallery = (props: { filter: string }) => {

  const {filter} = props;
  const ctx: cartContextResource = useContext(cartContext);
  const [showPainting, setShowPainting] = useState(false);
  const [featuredPainting, setFeaturedPainting] = useState<paintingResource>(
    ctx.paintings[0]
  );

  const toggleFeaturePainting = () => {
    setShowPainting(!showPainting);
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

  let filteredPaintings = [];
  filteredPaintings = ctx.paintings.filter(
    function (painting: paintingResource){
      for (let i = 0; i < painting.categories.length; i++) {
        console.log(painting.categories[i].name);
        if (painting.categories[i].name === filter) {
          return painting;
        }
      }
      return null;
    }
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
      {filteredPaintings.length === 0 ?
          <div className='gallery__empty'>Sorry, there are no {filter} available right now</div>
          : ''}
      <div className="gallery">
        {filteredPaintings.map((painting: paintingResource) => (
          <GalleryItem
            key={painting.id}
            painting={painting}
            setFeaturedPainting={setFeaturedPainting}
            togglePainting={toggleFeaturePainting}
            filter={props.filter}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
