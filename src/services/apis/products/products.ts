import type { ProductsResponse, ProductsParams } from "@interfaces/productsTypes";
import api from "@services/apiClient";
import { PRODUCT_ENDPOINTS } from "@services/basePaths";

// ----------- Create product ----------------
export const createProduct = async (payload: FormData): Promise<any> => {
    const response = await api.post(PRODUCT_ENDPOINTS.CREATE, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// ----------- Get all products ----------------
export const getAllProducts = async (params?: ProductsParams): Promise<ProductsResponse> => {
    const response = await api.get(PRODUCT_ENDPOINTS.GET_ALL, { params });
    return response.data;
};
