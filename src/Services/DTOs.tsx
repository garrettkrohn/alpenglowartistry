export interface paintingResponseResource {
  data: paintingResource;
  meta: {};
}

export interface paintingResource {
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
  seo: {};
  sku: string;
  sort_order: number;
  thank_you_url: string;
  updated: number;
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
