import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  //@ts-ignore
  process.env.REACT_APP_STRIPE_PUBLIC_KEY
);
