import React, { useContext } from "react";
import cartContext from "../../Store/CartContext";

const GalleryItem = (props) => {
  const ctx = useContext(cartContext);

  const handleAddToCart = () => {
    const responseObject = {
      item: props.painting,
    };
    ctx.addItem(responseObject);
  };

  const trimDescription = (description) => {
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
  return (
    <div className="gallery-item">
      <img
        src={props.painting.image.url}
        alt="painting"
        className="gallery-item-thumbnail"
      />
      <div className="gallery-item-title">{props.painting.name}</div>
      <div className="gallery-item-description">
        {trimDescription(props.painting.description)}
      </div>
      <div className="gallery-item-bottom">
        <div className="gallery-item-price">
          {props.painting.price.formatted_with_symbol}
        </div>
        <button className="gallery-item-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
