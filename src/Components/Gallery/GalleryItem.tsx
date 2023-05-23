import React, { useContext, useState } from "react";
import { paintingResource } from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import "./GalleryItem.css";
import "./PortfolioItem.css";
import trimDescription from "../../Util/UtilityFunctions";
import CartServices from "../../Services/CartServices";
import { cartActions, CartDispatch, RootState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";

//used for both originals, prints, and portfolio
const GalleryItem = (props: {
  painting: paintingResource;
  setFeaturedPainting: Function;
  togglePainting: Function;
  filter: string;
  cartServices: CartServices;
  cartId: string;
}) => {
  const { painting, setFeaturedPainting, togglePainting } = props;
  const ctx: any = useContext(cartContext);
  const dispatch: CartDispatch = useDispatch();
  const cartStore = useSelector((state: RootState) => state);
  const cartServices = new CartServices();

  const handleAddToCart = async () => {
    dispatch(cartActions.toggleLoading());
    const responseObject = {
      item: props.painting,
    };
    ctx.addItem(responseObject);
    console.log(props.cartId);
    const newCart = await cartServices.addItemToCart(
      cartStore.cart.id,
      painting.id
    );
    console.log(newCart);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
  };

  let buttonTitle = "Add to Cart";

  const inventoryAvailable = (painting: paintingResource) => {
    if (painting.inventory.managed && painting.inventory.available === 0) {
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

  const galleryItem = (
    <div className="gallery-item">
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

  const portfolioItem = (
    <div className="gallery-item">
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
    </div>
  );

  return (
    <div>{props.filter === "Portfolio" ? portfolioItem : galleryItem}</div>
  );
};

export default GalleryItem;
