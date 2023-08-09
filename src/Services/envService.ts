import { loadStripe } from "@stripe/stripe-js";

export const loadStripeKey =
  process.env.REACT_APP_ENVIRONMENT === "PROD"
    ? process.env.REACT_APP_STRIPE_PUBLIC_KEY
    : process.env.REACT_APP_TEST_STRIPE_PUBLIC_KEY;
//@ts-ignore
export const stripePromise = loadStripe(loadStripeKey);

export const gatewayKey =
  process.env.REACT_APP_ENVIRONMENT === "PROD"
    ? process.env.REACT_APP_STRIPE_GATEWAY
    : process.env.REACT_APP_STRIPE_TEST_GATEWAY;
