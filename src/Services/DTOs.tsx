export interface paintingResponseResource {
  data: paintingResource;
  meta: {};
}

export interface paintingResource {
  assets: assetResource[];
  active: boolean;
  categories: categoryResource[];
  checkout_url: {};
  collects: {};
  conditionals: {};
  created: number;
  description: string;
  has: {};
  id: string;
  image: imageResource;
  inventory: inventoryResource;
  is: {};
  meta: null;
  name: string;
  permalink: string;
  price: priceResource;
  quantity?: number;
  seo: {};
  sku: string;
  sort_order: number;
  thank_you_url: string;
  updated: number;
  variant_groups: variant[];
}

export interface variant {
  created: number;
  id: string;
  meta: any;
  name: string;
  options: variantOption[];
  updated: number;
}

export interface variantOption {
  assets: [];
  created: number;
  id: string;
  meta: any;
  name: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  updated: number;
}

export interface assetResource {
  created_at: number;
  description: string | null;
  file_extension: string;
  file_size: number;
  filename: string;
  id: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  is_image: boolean;
  meta: [];
  updated_at: number;
  url: string;
}

export interface inventoryResource {
  managed: boolean;
  available: number;
}

export interface imageResource {
  created_at: number;
  description: null;
  file_extension: string;
  file_size: number;
  filename: string;
  id: string;
  image_dimensions: {};
  is_image: boolean;
  meta: [];
  updated_at: number;
  url: string;
}

export interface categoryResource {
  id: string;
  slug: string;
  name: string;
}

export interface priceResource {
  formatted: string;
  formatted_with_code: string;
  formatted_with_symbol: string;
  raw: number;
}

export interface requestConfigResource {
  url: string;
  method: string | undefined;
  headers: {} | undefined;
  body?: {} | undefined;
}

export interface cartResource {
  id: string;
  created: number;
  updated: number;
  expires: number;
  total_items: number;
  total_unique_items: number;
  subtotal: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  hosted_checkout_url: string;
  line_items: line_items[];
  currency: {
    code: string;
    symbol: string;
  };
  discount: [];
  meta: number;
}

export interface line_items {
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  sku: string;
  permalink: string;
  quantity: number;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  line_total: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  is_valid: boolean;
  product_meta: [];
  selected_options: [];
  variant: string;
  image: imageResource;
}

export interface variantResource {
  data: [
    {
      id: string;
      sku: string;
      description: string;
      inventory: number;
      price: priceResource;
      is_valid: boolean;
      invalid_reason_code: boolean;
      created: number;
      updated: number;
      options: any;
    }
  ];
}

export interface checkoutResource {
  id: string;
  cart_id: string;
  created: number;
  expires: number;
  conditionals: {
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    has_physical_delivery: boolean;
    has_digital_delivery: boolean;
    has_pay_what_you_want: boolean;
    has_available_discounts: boolean;
    collects_extra_fields: boolean;
    is_cart_free: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  has: {
    physical_delivery: boolean;
    digital_delivery: boolean;
    pay_what_you_want: boolean;
    available_discounts: boolean;
  };
  is: {
    cart_free: boolean;
  };
  products: {}[];
  merchant: {
    id: number;
    name: string;
    description: string;
    status: string;
    country: string;
    currency: currencyResource;
    support_email: string;
    // other stuff
  };
  extra_fields: [];
  gateways: {
    id: string;
    code: string;
    sandbox: boolean;
    config: [];
  }[];
  shipping_methods: {
    id: string;
    description: string;
    provider: string;
    price: priceResource;
    countries: string[];
    regions: {};
    live: {
      merchant_id: number;
      currency: currencyResource;

      subtotal: priceResource;
      tax: {
        amount: priceResource;
        breakdown: [];
        included_in_price: boolean;
        zone: [];
        privider: string;
      };
      total: priceResource;
      total_with_tax: priceResource;
      adjustments: {};
      total_due: priceResource;
      pay_what_you_want: {};
      line_items: line_items[];
      discount: [];
      shipping: {};
    };
  };
}
export interface currencyResource {
  symbol: string;
  code: string;
}
export interface priceResource {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}
export interface countriesResource {
  countries: {}[];
}
export interface statesResource {
  subdivisions: any[];
}
