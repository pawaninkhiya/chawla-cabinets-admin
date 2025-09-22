import api from "@services/apiClient";
import { PRODUCT_ENDPOINTS } from "@services/basePaths";
import type { ProductsParams, ProductsResponse, SingleProductResponse ,} from "@interfaces/productsTypes";

// Create product
export const createProduct = async (payload: FormData): Promise<SingleProductResponse> => {
    const response = await api.post(PRODUCT_ENDPOINTS.CREATE, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// Get all products
export const getAllProducts = async (params?: ProductsParams): Promise<ProductsResponse> => {
    const response = await api.get(PRODUCT_ENDPOINTS.GET_ALL, { params });
    return response.data;
};

// Get product by ID
export const getProductById = async (id: string) => {
    const response = await api.get(PRODUCT_ENDPOINTS.GET_BY_ID(id));
    return response.data;
};
