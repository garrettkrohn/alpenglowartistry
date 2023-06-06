import React, { useEffect, useState } from "react";
import {
  countriesResource,
  line_items,
  statesResource,
} from "../../Services/DTOs";
import "./Checkout.scss";
import CartServices from "../../Services/CartServices";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartDispatch, RootState } from "../../Store";
import { Loading } from "../../Util/loading";
import useInput from "../../Hooks/useInput";

const Checkout = (props: { cartId: string; setCartId: Function }) => {
  const dispatch: CartDispatch = useDispatch();
  const [stepper, setStepper] = useState(0);

  const cartService = new CartServices();
  const cartStore = useSelector((state: RootState) => state);
  const [states, setStates] = useState<string[]>([]);

  const {
    value: firstName,
    valueChangeHandler: firstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    hasError: firstNameError,
    isValid: firstNameIsValid,
    reset: firstNameReset,
  } = useInput((value: string) => value !== "");

  const {
    value: lastName,
    valueChangeHandler: lastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    hasError: lastNameError,
    isValid: lastNameIsValid,
    reset: lastNameReset,
  } = useInput((value: string) => value !== "");

  const {
    value: email,
    valueChangeHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailError,
    isValid: emailIsValid,
    reset: emailReset,
  } = useInput((value: string) => value !== "");

  // billing
  const {
    value: street,
    valueChangeHandler: streetHandler,
    inputBlurHandler: streetBlurHandler,
    hasError: streetError,
    isValid: streetIsValid,
    reset: streetReset,
  } = useInput((value: string) => value !== "");

  const {
    value: city,
    valueChangeHandler: cityHandler,
    inputBlurHandler: cityBlurHandler,
    hasError: cityError,
    isValid: cityIsValid,
    reset: cityReset,
  } = useInput((value: string) => value !== "");

  const {
    value: countyState,
    valueChangeHandler: countyStateHandler,
    inputBlurHandler: countyStateBlurHandler,
    hasError: countyStateError,
    isValid: countyStateIsValid,
    reset: countyStateReset,
  } = useInput((value: string) => value !== "");

  const {
    value: zip,
    valueChangeHandler: zipHandler,
    inputBlurHandler: zipBlurHandler,
    hasError: zipError,
    isValid: zipIsValid,
    reset: zipReset,
  } = useInput((value: string) => value !== "");

  // shipping
  const {
    value: streetShip,
    valueChangeHandler: streetHandlerShip,
    inputBlurHandler: streetBlurHandlerShip,
    hasError: streetErrorShip,
    isValid: streetIsValidShip,
    reset: streetResetShip,
  } = useInput((value: string) => value !== "");

  const {
    value: cityShip,
    valueChangeHandler: cityHandlerShip,
    inputBlurHandler: cityBlurHandlerShip,
    hasError: cityErrorShip,
    isValid: cityIsValidShip,
    reset: cityResetShip,
  } = useInput((value: string) => value !== "");

  const {
    value: countyStateShip,
    valueChangeHandler: countyStateHandlerShip,
    inputBlurHandler: countyStateBlurHandlerShip,
    hasError: countyStateErrorShip,
    isValid: countyStateIsValidShip,
    reset: countyStateResetShip,
  } = useInput((value: string) => value !== "");

  const {
    value: zipShip,
    valueChangeHandler: zipHandlerShip,
    inputBlurHandler: zipBlurHandlerShip,
    hasError: zipErrorShip,
    isValid: zipIsValidShip,
    reset: zipResetShip,
  } = useInput((value: string) => value !== "");

  const incrementStepper = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
    }
  };

  const decrementStepper = () => {
    if (stepper > 0) {
      setStepper(stepper - 1);
    }
  };

  const removeItem = async (itemId: string) => {
    dispatch(cartActions.toggleLoading());
    console.log("remove item called");
    const newCart = await cartService.emptyItemFromCart(props.cartId, itemId);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
  };

  const clearLocalCartId = () => {
    localStorage.setItem("cartId", "");
  };

  const emptyCart = async () => {
    dispatch(cartActions.toggleLoading());
    console.log("empty cart");
    const newCart = await cartService.emptyCart(props.cartId);
    dispatch(cartActions.setCart(newCart));
    dispatch(cartActions.toggleLoading());
  };

  useEffect(() => {
    const getCart = async () => {
      const checkoutObject = await cartService.getCheckoutToken(
        cartStore.cart.id
      );
      localStorage.setItem("checkoutId", checkoutObject.id);
      // console.log(localStorage.getItem("checkoutId"));
    };

    const getStates = async () => {
      const states = await cartService.getStates();
      statesArray(states);
    };
    getStates();

    if (!localStorage.checkoutId) {
      getCart();
    }
  }, []);

  const statesArray = (states: statesResource) => {
    var values = Object.values(states.subdivisions);
    setStates(values);
  };

  if (stepper === 1) {
    return (
      <div className="checkout-billing-form">
        <div>Billing Address</div>
        <label>first name</label>
        <input
          type="text"
          id="lastName"
          value={firstName}
          onChange={firstNameHandler}
          onBlur={firstNameBlurHandler}
        />
        <label>last name</label>
        <input
          type="text"
          id="firstName"
          value={lastName}
          onChange={lastNameHandler}
          onBlur={lastNameBlurHandler}
        />
        <label>email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={emailHandler}
          onBlur={emailBlurHandler}
        />
        <label>street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetHandler}
          onBlur={streetBlurHandler}
        />
        <label>city</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityHandler}
          onBlur={cityBlurHandler}
        />
        <select>
          {states ? (
            states.map((state) => <option>{state}</option>)
          ) : (
            <div></div>
          )}
        </select>

        <label>zip</label>
        <input
          type="text"
          id="zip"
          value={zip}
          onChange={zipHandler}
          onBlur={zipBlurHandler}
        />
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }

  if (stepper === 2) {
    return (
      <div>
        <div>shipping address</div>;<label>street</label>
        <input
          type="text"
          id="street"
          value={streetShip}
          onChange={streetHandlerShip}
          onBlur={streetBlurHandlerShip}
        />
        <label>city</label>
        <input
          type="text"
          id="city"
          value={cityShip}
          onChange={cityHandlerShip}
          onBlur={cityBlurHandlerShip}
        />
        <label>zip</label>
        <input
          type="text"
          id="zip"
          value={zipShip}
          onChange={zipHandlerShip}
          onBlur={zipBlurHandlerShip}
        />
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }

  if (stepper === 3) {
    return (
      <div>
        <div>credit card</div>
        <button onClick={decrementStepper}>back</button>
        <button onClick={incrementStepper}>next</button>
      </div>
    );
  }
  return (
    <div>
      {cartStore.cart.line_items.length === 0 ? (
        <div>No items in cart</div>
      ) : (
        ""
      )}
      {cartStore.isLoading ? <Loading size="76px" /> : ""}
      <div className="checkout-container">
        {cartStore.cart.line_items.map((item: line_items, index: number) => (
          <div className={"checkout-row"} key={index}>
            <img
              src={item.image.url}
              className={"checkout-thumbnail"}
              alt={item.name}
            />
            <div className="checkout-title">{item.name}</div>
            <div className="checkout-price">
              {item.price.formatted_with_symbol}
            </div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => removeItem(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <div>
        Subtotal:
        {cartStore.cart.subtotal.formatted_with_symbol}
      </div>
      <button onClick={incrementStepper}>Checkout</button>
      <button onClick={emptyCart}>Empty cart</button>
    </div>
  );
};

export default Checkout;
