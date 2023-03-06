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
