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
import { Loading } from "../../Util/loading";

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
  const dispatch: CartDispatch = useDispatch();
  const cartStore = useSelector((state: RootState) => state);
  const cartServices = new CartServices();
  const [variant, setVariant] = useState<variantOption>();
  const [individualLoad, setIndividualLoad] = useState(false);

  const handleAddToCart = async () => {
    dispatch(cartActions.toggleLoading());
    setIndividualLoad(true);
    const variantId = variant ? variant.id : "";
    let newCart;
    if (variantId && painting.variant_groups[0]) {
      newCart = await cartServices.addItemToCart(
        cartStore.cart.id,
        painting.id,
        painting.variant_groups[0]?.id,
        variantId
      );
    } else {
      newCart = await cartServices.addItemToCart(
        cartStore.cart.id,
        painting.id
      );
    }
    console.log(newCart);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
    setIndividualLoad(false);
  };

  let buttonTitle = "Add to Cart";

  const inventoryAvailable = (painting: paintingResource) => {
    if (
      painting.inventory.managed &&
      painting.inventory.available === 0 &&
      filter === "Originals"
    ) {
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

  const featurePaintingHandler = () => {
    setFeaturedPainting(painting);
    togglePainting();
  };

  const handlePrintSizeSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    lookUpAndSetVariant(event.target.value);
  };

  const lookUpAndSetVariant = (variantName: string) => {
    painting.variant_groups[0].options.map((option) => {
      if (option.name == variantName) {
        setVariant(option);
      }
    });
  };

  let priceToDisplay = "";
  if (filter === "Prints") {
    if (variant) {
      priceToDisplay = variant.price.formatted_with_symbol;
    }
  } else if (filter === "Originals") {
    priceToDisplay = painting.price.formatted_with_symbol;
  }

  const filterOutOriginal = (name: string) => {
    return name.replace("ORIGINAL", "").replace("*", "");
  };

  const galleryItem = (
    <div className="gallery-item">
      <img
        src={painting.assets[0].url}
        alt="painting"
        className="gallery-item-thumbnail"
        onClick={featurePaintingHandler}
      />
      <div className="gallery-item-title">
        {filterOutOriginal(painting.name)}
      </div>
      <div className="gallery-item-description">
        {trimDescription(painting.description)}
      </div>
      <div className="gallery-item-bottom">
        <div className="gallery-item-price">{priceToDisplay}</div>
        {filter === "Prints" ? (
          <div className="gallery-item-select">
            <select onChange={handlePrintSizeSelection}>
              {painting.variant_groups[0]?.options.map(
                (variant: any, index: number) => (
                  <option key={index} value={variant.name}>
                    {`${variant.name} - ${variant.price.formatted_with_symbol}`}
                  </option>
                )
              )}
            </select>
          </div>
        ) : (
          ""
        )}
        {individualLoad ? (
          <Loading size="28px" />
        ) : (
          <button
            disabled={inventoryAvailable(painting)}
            className="gallery-item-add-to-cart"
            onClick={handleAddToCart}
          >
            {buttonTitle}
          </button>
        )}
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
