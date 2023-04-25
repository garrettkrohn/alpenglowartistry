export interface itemResource {
    active: boolean;
    assets: {
        created_at: number;
        description: string;
        file_extension: string;
        file_size: number;
        file_name: string;
        id: string;
        image_dimensions: image_dimensions;
        is_image: boolean;
        meta: [];
        updated_at: number;
        url: string;
    }
    categories: [{
        id: string;
        name: string;
        slug: string
    }]
    checkout_url: {
        checkout: string;
        display: string;
    }
    collects: {};
    conditionals: {};
    created: number;
    description: string;
    has: {};
    id: string;
    image: {
        created_at: number;
        description: string;
        file_extension: string;
        file_size: number;
        filename: string;
        id: string;
        image_dimensions: image_dimensions;
        is_image: boolean;
        meta: [];
        updated_at: number;
        url: string;
    }
    inventory: {
        managed: boolean;
        available: number;
    }
    is: {};
    permalink: string;
    price: {
        raw: number;
        formatted: string;
        formatted_with_symbol: string;
        formatted_wiht_code: string;
    }
    updated: number;
}

export interface image_dimensions {
    width: number;
    height: number;
}

