import React, { useEffect, useState } from "react";
import { line_items, priceResource, statesResource } from "../../Services/DTOs";
import "./Checkout.scss";
import CartServices from "../../Services/CartServices";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartDispatch, RootState } from "../../Store";
import { Loading } from "../../Util/loading";
import useInput from "../../Hooks/useInput";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import Commerce from "@chec/commerce.js";
import { stripePromise } from "../../Services/Stripe";

loadStripe.setLoadParameters({ advancedFraudSignals: false });

//@ts-ignore

export interface stateResource {
  name: string;
  abbreviation: string;
}

interface shippingOptionsResource {
  description: string;
  id: string;
  price: priceResource;
  provider: string;
}

const Checkout = (props: { cartId: string; setCartId: Function }) => {
  const dispatch: CartDispatch = useDispatch();
  const [stepper, setStepper] = useState(0);
  //@ts-ignore
  const commerce = new Commerce(process.env.REACT_APP_CHECK_PUBLIC_KEY);

  const cartService = new CartServices();
  const cartStore = useSelector((state: RootState) => state);
  const [states, setStates] = useState<stateResource[]>([]);
  const [shippingOptions, setShippingOptions] = useState<any[]>();
  const [selectedShippingOption, setSelectedShippingOption] = useState<any>();
  const [shippingOptionIndex, setShippingOptionIndex] = useState<number>(0);
  const [shippingId, setShippingId] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedStateBilling, setSelectedStateBilling] =
    useState<stateResource>();
  const [selectedStateShipping, setSelectedStateShipping] =
    useState<stateResource>();
  const [shipSameAsBill, setShipSameAsBill] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [calculatedTotal, setCalculatedTotal] = useState<string>();
  const [
    calculatedShippingWithFormatting,
    setCalculatedShippingWithFormatting,
  ] = useState<string>();

  const [checkoutError, setCheckoutError] = useState("");

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
    if (stepper < 4) {
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
    if (localStorage.getItem("cartId")) {
      const checkoutObject = await cartService.getCheckoutToken(
        //@ts-ignore
        localStorage.getItem("cartId")
      );
      setCheckoutId(checkoutObject.id);
      try {
        //@ts-ignore
        setShippingId(checkoutObject.shipping_methods[0].id);
        //@ts-ignore
        setShippingOptions(checkoutObject.shipping_methods);
        // setShippingOptions(checkoutObject.shipping_methods);
      } catch {
        console.log("item does not have a shipping method");
      }
      // console.log(localStorage.getItem("checkoutId"));
      // console.log(shippingOptions);
    }
  };

  useEffect(() => {
    if (!checkoutId) {
      getCheckoutToken();
    }
    // getShippingOptions();
  }, [checkoutId]);

  useEffect(() => {
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
    setSelectedStateBilling(finalStateArray[0]);
    setSelectedStateShipping(finalStateArray[0]);
  };

  const copyBillingAddress = () => {
    setShipSameAsBill(!shipSameAsBill);
    firstNameShipSetValue(firstName);
    lastNameShipSetValue(lastName);
    streetShipSetValue(street);
    cityShipSetValue(city);
    setCountyStateShip(countyState);
    zipShipSetValue(zip);
    setSelectedStateShipping(selectedStateBilling);
  };

  const handleStateChangeBilling = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    lookUpAndSetStateBilling(event.target.value);
  };

  const lookUpAndSetStateBilling = (state: string) => {
    states.map((s) => {
      if (s.name === state) {
        setCountyState(s.abbreviation);
        setSelectedStateBilling(s);
      }
    });
  };

  const handleStateChangeShipping = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    lookUpAndSetStateShipping(event.target.value);
  };

  const lookUpAndSetStateShipping = (state: string) => {
    states.map((s) => {
      if (s.name === state) {
        setCountyStateShip(s.abbreviation);
        setSelectedStateShipping(s);
      }
    });
  };

  const lookUpAndSetShippingOption = (optionName: string) => {
    if (shippingOptions) {
      shippingOptions.map((n) => {
        if (n.description === optionName) {
          setSelectedShippingOption(n);
          setShippingId(n.id);
        }
      });
    }
  };

  //@ts-ignore
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    setLocalLoading(true);

    if (!stripe || !elements) return;

    if (checkoutId === "undefined" || checkoutId === "") {
      getCheckoutToken();
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error.message);
    } else {
      incrementStepper();
      let orderData = {
        line_items: cartStore.cart.line_items,
        customer: {
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
          gateway: process.env.REACT_APP_PAYMENT_GATEWAY_KEY,
          stripe: {
            payment_method_id: paymentMethod.id,
          },
          ...(process.env.NODE_ENV === "development" && {
            card: {
              number: "4242424242424242",
              expiry_month: "02",
              expiry_year: "24",
              cvc: "123",
              postal_zip_code: "94107",
            },
          }),
        },
      };

      console.log(orderData);
      //@ts-ignore
      // await cartService.checkout(checkoutId, orderData);
      try {
        //@ts-ignore
        await commerce.checkout.capture(checkoutId, orderData);
      } catch (e: any) {
        setCheckoutError(e.data.error.message);
      }

      localStorage.removeItem("cartId");
      setCheckoutId("");
      localStorage.removeItem("checkoutId");
      setLocalLoading(false);

      incrementStepper();
    }
  };

  useEffect(() => {
    const calculatedTax = cartStore.cart.subtotal.raw * 0.0625;
    setCalculatedShippingWithFormatting(
      "$" + calculatedTax.toFixed(2).toString()
    );

    let calculatedSubtotal;
    if (selectedShippingOption) {
      calculatedSubtotal =
        "$" +
        (
          calculatedTax +
          cartStore.cart.subtotal.raw +
          selectedShippingOption.price.raw
        ).toFixed(2);
    }
    setCalculatedTotal(calculatedSubtotal);
  }, [shippingOptions, selectedShippingOption, cartStore]);

  useEffect(() => {
    if (shippingOptions) {
      setSelectedShippingOption(shippingOptions[0]);
    }
  }, [shippingOptions]);
  if (stepper === 1) {
    return (
      <div className="checkout-billing-container">
        <div className="checkout-billing-form">
          <div className="checkout-billing-title">Billing Address</div>
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
          <label>State:</label>
          <select onChange={handleStateChangeBilling}>
            {states ? (
              states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))
            ) : (
              <option></option>
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
          <div className="checkout-shipping-title">Shipping Address</div>
          <div>
            <input type="checkbox" onClick={copyBillingAddress} />
            <label>Is shipping the same as billing?</label>
          </div>
          {shipSameAsBill ? (
            <div></div>
          ) : (
            <>
              <label>First Name:</label>
              <input
                type="text"
                id="firstNameShip"
                value={firstNameShip}
                onChange={firstNameShipHandler}
                onBlur={firstNameShipBlurHandler}
              />
              <label>Last Name:</label>
              <input
                type="text"
                id="firstName"
                value={lastNameShip}
                onChange={lastNameShipHandler}
                onBlur={lastNameShipBlurHandler}
              />
              <label>Street:</label>
              <input
                type="text"
                id="street"
                value={streetShip}
                onChange={streetHandlerShip}
                onBlur={streetBlurHandlerShip}
              />
              <label>City:</label>
              <input
                type="text"
                id="city"
                value={cityShip}
                onChange={cityHandlerShip}
                onBlur={cityBlurHandlerShip}
              />
              <label>State:</label>
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

              <label>Zip:</label>
              <input
                type="text"
                id="zip"
                value={zipShip}
                onChange={zipHandlerShip}
                onBlur={zipBlurHandlerShip}
              />
            </>
          )}
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
      <div className="checkout-card-container">
        <div className="checkout-card-form">
          <div>Shipping Options:</div>
          <select onChange={(e) => lookUpAndSetShippingOption(e.target.value)}>
            {shippingOptions ? (
              shippingOptions.map((state, index) => (
                <option key={index} value={state.description}>
                  {state.description + " " + state.price.formatted_with_symbol}
                </option>
              ))
            ) : (
              <div></div>
            )}
          </select>
          <div className="checkout-text">
            Paintings:
            {cartStore.cart.subtotal.formatted_with_symbol}
          </div>
          <div className="checkout-text">
            Tax: {calculatedShippingWithFormatting}{" "}
          </div>
          <div className="checkout-text">Subtotal: {calculatedTotal}</div>
          <div className="checkout-card-title">Credit Card:</div>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                  <div className="checkout-card-element-wrapper">
                    <CardElement />
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button onClick={decrementStepper}>back</button>
                    <button type="submit" disabled={!stripe} color="primary">
                      Submit Payment
                    </button>
                  </div>
                </form>
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      </div>
    );
  }

  if (stepper === 4) {
    return (
      <div className="checkout-thank-you-container">
        {checkoutError ? (
          <div className="checkout-thank-you-block">
            Oops, looks like there was an error: {checkoutError}
            <p>If the issue persists, please contact me.</p>
          </div>
        ) : (
          ""
        )}
        {localLoading && !checkoutError ? (
          <div className="checkout-thank-you-block">
            <div>Thank you so much for purchasing from Alpenglow Art</div>
            <div>Processing your order now!</div>
            <Loading size="76px" />
          </div>
        ) : (
          <div></div>
        )}
        {!localLoading && !checkoutError ? (
          <div className="checkout-thank-you-block">
            <div>Your order has been successfully processed,</div>
            <div>you will receive an email with the order details.</div>
            <div>Thank you for supporting Alpenglow Artistry</div>
          </div>
        ) : (
          <div></div>
        )}
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
            {localLoading ? <Loading size={"40px"} /> : ""}
            <button onClick={() => removeItem(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <button onClick={incrementStepper}>Checkout</button>
      <button onClick={emptyCart}>Empty cart</button>
    </div>
  );
};

export default Checkout;
