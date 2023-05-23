import { useDispatch } from "react-redux";
import { CartDispatch } from "../Store";
import { cartResource } from "./DTOs";

export default class CartServices {
  private static readonly API_KEY: string = process.env
    .REACT_APP_COMMERCE_TEST_KEY
    ? process.env.REACT_APP_COMMERCE_TEST_KEY
    : "";
  private static readonly BASE_URL: string = "https://api.chec.io/v1/";

  public async createOrGetCart(key?: string | null): Promise<cartResource> {
    let url = "";
    if (!key) {
      url = CartServices.BASE_URL + "carts";
    } else {
      url = CartServices.BASE_URL + `carts/${key}`;
    }
    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: cartResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async addItemToCart(
    cartId: string,
    itemId: string
  ): Promise<cartResource> {
    const url = CartServices.BASE_URL + `carts/${cartId}`;
    console.log(url);
    //variant_id can be added here
    const body = { id: itemId };

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data: cartResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async updateItemInCart(
    cartId: string,
    lineItemId: string,
    quantity: number
  ): Promise<cartResource> {
    const url = CartServices.BASE_URL + `carts/${cartId}/items/${lineItemId}`;
    console.log(url);
    // variant_id and options available here
    const body = { quantity: quantity };

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data: cartResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async emptyCart(cartId: string): Promise<cartResource> {
    const url = CartServices.BASE_URL + `carts/${cartId}/items`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data: cartResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async emptyItemFromCart(
    cartId: string,
    lineItemId: string
  ): Promise<cartResource> {
    const url = CartServices.BASE_URL + `carts/${cartId}/items/${lineItemId}`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data: cartResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }
}
