import React, { useContext, useEffect, useState } from "react";
import "./Gallery.scss";
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
import { Loading } from "../../Util/loading";
import { ORIGINALS, PORTFOLIO, PRINTS } from "../Constants/CATEGORIES";

const Gallery = (props: {
  filter: string;
  cartId: string;
  setCartId: Function;
}) => {
  const { filter } = props;
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
    const requestConfig = {
      url: "https://api.chec.io/v1/products/?limit=200&include=assets,variant_groups",
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
    return <Loading size="72px" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  /**
   *  What all needs to be filtered
   *  prints
   *    select all paintings that have print as a category
   *    make sure that they have a variant group added, if not console log it?
   *  Originals
   *    select all paintings with original
   *    make sure that it has inventory
   *    make sure that it DOES NOT have any variant groups
   *  Portfolio
   *    return if it has portfolio selected
   */

  let filteredPaintings = [];
  filteredPaintings = ctx.paintings.filter(function (
    painting: paintingResource
  ) {
    for (let i = 0; i < painting.categories.length; i++) {
      if (filter === painting.categories[i].name) {
        switch (filter) {
          case PRINTS:
            try {
              if (painting.variant_groups[0].options.length > 0) {
                return painting;
              }
            } catch {
              console.log(
                "The painting " +
                  painting.name +
                  " is marked as print, but does not have a variant group"
              );
            }
            break;
          case ORIGINALS:
            let managed = painting.inventory.managed;
            let available = painting.inventory.available > 0;
            let variants = painting.variant_groups.length === 0;
            if (managed && available && variants) {
              return painting;
            } else {
              let error = "";
              if (!managed) {
                error += " is not marked as managed";
              }
              if (!available) {
                error += " does not have any availability";
              }
              if (!variants) {
                error += " has variants but it should not";
              }
              console.log("The painting " + painting.name + error);
            }
            break;
          case PORTFOLIO:
            return painting;
        }
      }
    }
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
