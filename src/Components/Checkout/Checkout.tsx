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
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import Commerce from "@chec/commerce.js";

//@ts-ignore
const stripePromise = loadStripe(
  "pk_test_51NG4cvEG1zsJ1IMcLM6k9TjS7liXm7qxyHgOCitXrCouP952enW0IeHSMTkiVGG9FP4odrjbC4XNFGtp5v8EFJCi00dMlK62kY"
);

export interface stateResource {
  name: string;
  abbreviation: string;
}

const Checkout = (props: { cartId: string; setCartId: Function }) => {
  const dispatch: CartDispatch = useDispatch();
  const [stepper, setStepper] = useState(0);

  const cartService = new CartServices();
  const cartStore = useSelector((state: RootState) => state);
  const [states, setStates] = useState<stateResource[]>([]);
  const [sameAsBilling, setSameAsBilling] = useState<boolean>(false);
  const [shippingId, setShippingId] = useState("");

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
    setValue: setCountyState,
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
    value: firstNameShip,
    valueChangeHandler: firstNameShipHandler,
    inputBlurHandler: firstNameShipBlurHandler,
    hasError: firstNameShipError,
    isValid: firstNameShipIsValid,
    reset: firstNameShipReset,
    setValue: firstNameShipSetValue,
  } = useInput((value: string) => value !== "");

  const {
    value: lastNameShip,
    valueChangeHandler: lastNameShipHandler,
    inputBlurHandler: lastNameShipBlurHandler,
    hasError: lastNameShipError,
    isValid: lastNameShipIsValid,
    reset: lastNameShipReset,
    setValue: lastNameShipSetValue,
  } = useInput((value: string) => value !== "");

  const {
    value: streetShip,
    valueChangeHandler: streetHandlerShip,
    inputBlurHandler: streetBlurHandlerShip,
    hasError: streetErrorShip,
    isValid: streetIsValidShip,
    reset: streetResetShip,
    setValue: streetShipSetValue,
  } = useInput((value: string) => value !== "");

  const {
    value: cityShip,
    valueChangeHandler: cityHandlerShip,
    inputBlurHandler: cityBlurHandlerShip,
    hasError: cityErrorShip,
    isValid: cityIsValidShip,
    reset: cityResetShip,
    setValue: cityShipSetValue,
  } = useInput((value: string) => value !== "");

  const {
    value: countyStateShip,
    valueChangeHandler: countyStateHandlerShip,
    inputBlurHandler: countyStateBlurHandlerShip,
    hasError: countyStateErrorShip,
    isValid: countyStateIsValidShip,
    reset: countyStateResetShip,
    setValue: setCountyStateShip,
  } = useInput((value: string) => value !== "");

  const {
    value: zipShip,
    valueChangeHandler: zipHandlerShip,
    inputBlurHandler: zipBlurHandlerShip,
    hasError: zipErrorShip,
    isValid: zipIsValidShip,
    reset: zipResetShip,
    setValue: zipShipSetValue,
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

  const getCheckoutToken = async () => {
    const checkoutObject = await cartService.getCheckoutToken(
      cartStore.cart.id
    );
    localStorage.setItem("checkoutId", checkoutObject.id);
    //@ts-ignore
    setShippingId(checkoutObject.shipping_methods[0].id);
    console.log(localStorage.getItem("checkoutId"));
  };

  useEffect(() => {
    getCheckoutToken();

    const getStates = async () => {
      const states = await cartService.getStates();
      statesArray(states);
    };
    getStates();
  }, []);

  const statesArray = (states: statesResource) => {
    var finalStateArray = [];
    var keys = Object.keys(states.subdivisions);
    var values = Object.values(states.subdivisions);

    for (let x = 0; x < keys.length; x++) {
      let newObj = {
        name: values[x],
        abbreviation: keys[x],
      };
      finalStateArray.push(newObj);
    }
    setStates(finalStateArray);
  };

  const copyBillingAddress = () => {
    firstNameShipSetValue(firstName);
    lastNameShipSetValue(lastName);
    streetShipSetValue(street);
    cityShipSetValue(city);
    setCountyStateShip(countyState);
    zipShipSetValue(zip);
  };

  const handleStateChangeBilling = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event);
    lookUpAndSetStateBilling(event.target.value);
  };

  const lookUpAndSetStateBilling = (state: string) => {
    states.map((s) => {
      if (s.name === state) {
        setCountyState(s.abbreviation);
        console.log(s.abbreviation);
      }
    });
  };

  const handleStateChangeShipping = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event);
    lookUpAndSetStateShipping(event.target.value);
  };

  const lookUpAndSetStateShipping = (state: string) => {
    states.map((s) => {
      if (s.name === state) {
        setCountyStateShip(s.abbreviation);
        console.log(s.abbreviation);
      }
    });
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  //@ts-ignore
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (localStorage.getItem("checkoutId") === "undefined") {
      getCheckoutToken();
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log(paymentMethod);

    if (error) {
      console.error(error.code);
    } else {
      const orderData = {
        line_items: cartStore.cart.line_items,
        customer: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
        shipping: {
          name: "primary",
          street: streetShip,
          town_city: cityShip,
          county_state: countyStateShip,
          postal_zip_code: zipShip,
          country: "US",
        },
        billing: {
          name: "primary",
          street: street,
          town_city: city,
          county_state: countyState,
          postal_zip_code: zip,
          country: "US",
        },
        fulfillment: { shipping_method: shippingId },
        payment: {
          // gateway: "test_gateway",
          gateway: process.env.REACT_APP_STRIPE_TEST_GATEWAY,
          stripe: {
            payment_method_id: paymentMethod.id,
          },
          // card: {
          //   number: "4242 4242 4242 4242",
          //   expiry_month: "01",
          //   expiry_year: "2023",
          //   cvc: "123",
          //   postal_zip_code: "94103",
          // },
        },
      };

      console.log(orderData);
      const checkoutId = localStorage.getItem("checkoutId");

      //@ts-ignore
      cartService.checkout(checkoutId, orderData);
      localStorage.setItem("cartId", "");
    }
  };

  if (stepper === 1) {
    return (
      <div className="checkout-billing-container">
        <div className="checkout-billing-form">
          <div>Billing Address</div>
          <label>First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={firstNameHandler}
            onBlur={firstNameBlurHandler}
          />
          <label>Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={lastNameHandler}
            onBlur={lastNameBlurHandler}
          />
          <label>Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={emailHandler}
            onBlur={emailBlurHandler}
          />
          <label>Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={streetHandler}
            onBlur={streetBlurHandler}
          />
          <label>City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={cityHandler}
            onBlur={cityBlurHandler}
          />
          <select onChange={handleStateChangeBilling}>
            {states ? (
              states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))
            ) : (
              <div></div>
            )}
          </select>
          <label>Zip:</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={zipHandler}
            onBlur={zipBlurHandler}
          />
          <div className="checkout-buttons-container">
            <button onClick={decrementStepper}>back</button>
            <button onClick={incrementStepper}>next</button>
          </div>
        </div>
      </div>
    );
  }

  if (stepper === 2) {
    return (
      <div className="checkout-shipping-container">
        <div className="checkout-shipping-form">
          <div>shipping address</div>
          <button onClick={copyBillingAddress}>copy billing address</button>
          <label>first name</label>
          <input
            type="text"
            id="firstNameShip"
            value={firstNameShip}
            onChange={firstNameShipHandler}
            onBlur={firstNameShipBlurHandler}
          />
          <label>last name</label>
          <input
            type="text"
            id="firstName"
            value={lastNameShip}
            onChange={lastNameShipHandler}
            onBlur={lastNameShipBlurHandler}
          />
          <label>street</label>
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
          <select onChange={handleStateChangeShipping}>
            {states ? (
              states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))
            ) : (
              <div></div>
            )}
          </select>

          <label>zip</label>
          <input
            type="text"
            id="zip"
            value={zipShip}
            onChange={zipHandlerShip}
            onBlur={zipBlurHandlerShip}
          />
          <div className="checkout-buttons-container">
            <button onClick={decrementStepper}>back</button>
            <button onClick={incrementStepper}>next</button>
          </div>
        </div>
      </div>
    );
  }

  if (stepper === 3) {
    return (
      <div>
        <div>credit card</div>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button onClick={() => console.log("back")}>Back</button>
                  <button type="submit" disabled={!stripe} color="primary">
                    Submit Payment
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
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
