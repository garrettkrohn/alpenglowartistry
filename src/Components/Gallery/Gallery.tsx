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
import CartServices from "../../Services/CartServices";

const Gallery = (props: {
  filter: string;
  cartId: string;
  setCartId: Function;
}) => {
  const { filter, cartId, setCartId } = props;
  const ctx: cartContextResource = useContext(cartContext);
  const [showPainting, setShowPainting] = useState(false);
  const [featuredPainting, setFeaturedPainting] = useState<paintingResource>(
    ctx.paintings[0]
  );

  const cartServices = new CartServices();

  const toggleFeaturePainting = () => {
    setShowPainting(!showPainting);
  };

  const { isLoading, error, sendRequest: sendPaintingsRequest } = useHttp();

  const addPaintingstoCtx = (paintings: paintingResponseResource) => {
    const responseObject = {
      item: paintings.data,
    };
    ctx.addPaintings(responseObject);
  };

  useEffect(() => {
    console.log(ctx);
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
  filteredPaintings = ctx.paintings.filter(function (
    painting: paintingResource
  ) {
    for (let i = 0; i < painting.categories.length; i++) {
      if (painting.categories[i].name === filter) {
        return painting;
      }
    }
    return null;
  });

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
      {filteredPaintings.length === 0 ? (
        <div className="gallery__empty">
          Sorry, there are no {filter} available right now
        </div>
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
            filter={props.filter}
            cartServices={cartServices}
            cartId={props.cartId}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
