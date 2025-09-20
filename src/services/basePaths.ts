export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ------------------ Users Endpoints ------------------
export const USERS_ENDPOINTS = {
    LOGIN: "/users/login",
    GET_BY_ID: (id: string) => `/users/${id}`,
};

// ------------------ Categories Endpoints ------------------
export const CATEGORIES_ENDPOINTS = {
    CREATE: "/categories/create",
    GET_ALL: "/categories",
    UPDATE: (id: string) => `/categories/${id}`,
    GET_OPTIONS: "/categories/options",
    DELETE: (id: string) => `/categories/${id}`,
};
// ------------------ Models Endpoints ------------------
export const MODEL_ENDPOINTS = {
    CREATE: "/modelVerities/create",
    GET_ALL: "/modelVerities",
    UPDATE: (id: string) => `/modelVerities/${id}`,
    GET_OPTIONS: "/modelVerities/options",
    DELETE: (id: string) => `/modelVerities/${id}`,

};


// ------------------ Products Endpoints ------------------
export const PRODUCT_ENDPOINTS = {
    CREATE: "/products",
    GET_ALL: "/products",
};

