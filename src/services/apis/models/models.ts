// src/services/apis/categories.ts
import api from "@services/apiClient";
import { MODEL_ENDPOINTS } from "@services/basePaths";
import type { CategoriesResponse } from "@interfaces/categoriesTypes";
import type { ModelPayload } from "@interfaces/modelsTypes";


// -----------get all models----------------
export const getAllModels = async (params?: { search?: string; page?: number; limit?: number; }): Promise<CategoriesResponse> => {
    const response = await api.get(MODEL_ENDPOINTS.GET_ALL, { params });
    return response.data;
};


// -----------create model----------------
export const createModel = async (payload: ModelPayload): Promise<any> => {
    const response = await api.post(MODEL_ENDPOINTS.CREATE, payload);
    return response.data;
};

// -----------delete model----------------
export const deleteModel = async (id: string): Promise<any> => {
    const response = await api.delete(MODEL_ENDPOINTS.DELETE(id));
    return response.data;
};
