import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  //@ts-ignore
  process.env.REACT_APP_CHECK_PUBLIC_KEY,
  true
);
console.log(process.env.REACT_APP_CHECK_PUBLIC_KEY);
