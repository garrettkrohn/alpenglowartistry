import { useDispatch } from "react-redux";
import { CartDispatch } from "../Store";
import {
  cartResource,
  checkoutResource,
  countriesResource,
  statesResource,
  variantResource,
} from "./DTOs";

export default class CartServices {
  private static readonly API_KEY: string = process.env
    .REACT_APP_CHECK_PUBLIC_KEY
    ? process.env.REACT_APP_CHECK_PUBLIC_KEY
    : "";
  private static readonly BASE_URL: string = "https://api.chec.io/v1/";

  public async createOrGetCart(key?: string | null): Promise<cartResource> {
    let url = "";
    if (!key || key == "undefined") {
      url = CartServices.BASE_URL + "carts";
    } else {
      url = CartServices.BASE_URL + `carts/${key}?limit=200`;
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
    itemId: string,
    variantId?: string,
    variantOptionId?: string
  ): Promise<cartResource> {
    const url = CartServices.BASE_URL + `carts/${cartId}`;

    let verifiedVariant = "";
    if (variantId && variantOptionId) {
      const allVariants = await this.getVariants(itemId);
      allVariants.data.forEach((variant) => {
        if (variant.options[variantId] === variantOptionId) {
          verifiedVariant = variant.id;
        }
      });
      if (!verifiedVariant) {
        console.error("no variants");
      }
    }

    let body;
    if (variantId) {
      body = { id: itemId, variant_id: verifiedVariant };
    } else {
      body = { id: itemId };
    }

    console.log(url, body, variantId, itemId, cartId);
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

  public async getVariants(productId: string): Promise<variantResource> {
    const url = CartServices.BASE_URL + `products/${productId}/variants`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: variantResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async getCheckoutToken(cartId: string): Promise<checkoutResource> {
    const url = CartServices.BASE_URL + `checkouts/${cartId}?type=cart`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: checkoutResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async getStates(): Promise<statesResource> {
    const url = CartServices.BASE_URL + `services/locale/US/subdivisions`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: statesResource) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  public async checkout(checkoutTokenId: string, cart: any): Promise<any> {
    const url = CartServices.BASE_URL + `checkouts/${checkoutTokenId}`;

    return await fetch(url, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": CartServices.API_KEY,
      },
      method: "POST",

      body: JSON.stringify(cart),
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }
}
