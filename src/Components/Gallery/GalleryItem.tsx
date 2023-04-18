import React, { useContext, useState } from "react";
import { paintingResource } from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import "./GalleryItem.css";
import Painting from "../Paintings/Painting";
import trimDescription from "../../Util/UtilityFunctions";

const GalleryItem = (props: {
  painting: paintingResource;
  setFeaturedPainting: Function;
  togglePainting: Function;
}) => {
  const {painting, setFeaturedPainting, togglePainting} = props;
  const ctx: any = useContext(cartContext);

  const handleAddToCart = () => {
    const responseObject = {
      item: props.painting,
    };
    ctx.addItem(responseObject);
  };

  let buttonTitle = "Add to Cart";

  const inventoryAvailable = (painting: paintingResource) => {
    if (
      painting.inventory.managed &&
      painting.inventory.available == 0
    ) {
      buttonTitle = "Sold Out";
      return true;
    } else {
      return false;
    }
  };

  const featurePaintingHandler = () => {
    setFeaturedPainting(painting);
    togglePainting();
  };

  return (
    <div className="gallery-item">
      {/* <Painting painting={featuredPainting} /> */}
      <img
        src={painting.assets[0].url}
        alt="painting"
        className="gallery-item-thumbnail"
        onClick={featurePaintingHandler}
      />
      <div className="gallery-item-title">{painting.name}</div>
      <div className="gallery-item-description">
        {trimDescription(painting.description)}
      </div>
      <div className="gallery-item-bottom">
        <div className="gallery-item-price">
          {painting.price.formatted_with_symbol}
        </div>
        <button
          disabled={inventoryAvailable(painting)}
          className="gallery-item-add-to-cart"
          onClick={handleAddToCart}
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
