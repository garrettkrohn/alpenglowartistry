import React, { useContext, useState } from "react";
import { paintingResource } from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import "./GalleryItem.css";
import Painting from "../Paintings/Painting";

const GalleryItem = (props: {
  painting: paintingResource;
  setFeaturedPainting: Function;
  togglePainting: Function;
}) => {
  const ctx: any = useContext(cartContext);

  const handleAddToCart = () => {
    const responseObject = {
      item: props.painting,
    };
    ctx.addItem(responseObject);
  };

  const trimDescription = (description: string) => {
    const desc = description
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("<p>", "")
      .replace("</p>", "");
    if (desc.length > 110) {
      const trimmedString = desc.substring(0, 110);
      return trimmedString + "...";
    } else {
      return desc;
    }
  };

  let buttonTitle = "Add to Cart";

  const inventoryAvailable = (painting: paintingResource) => {
    if (
      painting.inventory.managed === true &&
      painting.inventory.available == 0
    ) {
      buttonTitle = "Sold Out";
      return true;
    } else {
      return false;
    }
  };

  const featurePaintingHandler = () => {
    props.setFeaturedPainting(props.painting);
    props.togglePainting();
  };

  return (
    <div className="gallery-item">
      {/* <Painting painting={featuredPainting} /> */}
      <img
        src={props.painting.image.url}
        alt="painting"
        className="gallery-item-thumbnail"
        onClick={featurePaintingHandler}
      />
      <div className="gallery-item-title">{props.painting.name}</div>
      <div className="gallery-item-description">
        {trimDescription(props.painting.description)}
      </div>
      <div className="gallery-item-bottom">
        <div className="gallery-item-price">
          {props.painting.price.formatted_with_symbol}
        </div>
        <button
          disabled={inventoryAvailable(props.painting)}
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
