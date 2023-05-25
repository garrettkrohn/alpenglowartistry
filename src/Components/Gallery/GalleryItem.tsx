import React, { useContext, useEffect, useState } from "react";
import { paintingResource, variant } from "../../Services/DTOs";
import cartContext from "../../Store/CartContext";
import "./GalleryItem.scss";
import "./PortfolioItem.css";
import trimDescription from "../../Util/UtilityFunctions";
import CartServices from "../../Services/CartServices";
import { cartActions, CartDispatch, RootState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { variantOption } from "../../Services/DTOs";

//used for both originals, prints, and portfolio
const GalleryItem = (props: {
  painting: paintingResource;
  setFeaturedPainting: Function;
  togglePainting: Function;
  filter: string;
  cartServices: CartServices;
  cartId: string;
}) => {
  const { painting, setFeaturedPainting, togglePainting, filter } = props;
  const ctx: any = useContext(cartContext);
  const dispatch: CartDispatch = useDispatch();
  const cartStore = useSelector((state: RootState) => state);
  const cartServices = new CartServices();
  const [variant, setVariant] = useState<variantOption>();

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

  useEffect(() => {
    if (filter === "Prints") {
      setVariant(painting.variant_groups[0].options[0]);
    }
  }, []);

  useEffect(() => {
    console.log(variant);
  }, [variant]);

  const featurePaintingHandler = () => {
    setFeaturedPainting(painting);
    togglePainting();
  };

  const handlePrintSizeSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const matchedVariant = lookUpVariantByName(event.target.value);
    console.log(matchedVariant);
  };

  const lookUpVariantByName = (variantName: string) => {
    painting.variant_groups[0].options.map((option) => {
      if (option.name == variantName) {
        setVariant(option);
      }
    });
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
          {variant
            ? variant.price.formatted_with_symbol
            : painting.price.formatted_with_symbol}
        </div>
        {filter === "Prints" ? (
          <div className="gallery-item-select">
            <select onChange={handlePrintSizeSelection}>
              {painting.variant_groups[0]?.options.map(
                (variant: any, index: number) => (
                  <option key={index} value={variant.name}>
                    {variant.name}
                  </option>
                )
              )}
            </select>
          </div>
        ) : (
          ""
        )}
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

  return <div>{filter === "Portfolio" ? portfolioItem : galleryItem}</div>;
};

export default GalleryItem;
