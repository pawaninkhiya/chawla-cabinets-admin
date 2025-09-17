import api from "@services/apiClient";
import { CATEGORIES_ENDPOINTS } from "@services/basePaths";
import type { 
  CategoriesResponse, 
  CategoryPayload, 
  CategoryResponse 
} from "@interfaces/categoriesTypes";

// -----------get all categories----------------
export const getAllCategories = async (
  params?: { search?: string; page?: number; limit?: number }
): Promise<CategoriesResponse> => {
  const response = await api.get(CATEGORIES_ENDPOINTS.GET_ALL, { params });
  return response.data;
};

// -----------create category----------------
export const createCategory = async (
  payload: CategoryPayload
): Promise<CategoryResponse> => {
  const response = await api.post(CATEGORIES_ENDPOINTS.CREATE, payload);
  return response.data;
};

// -----------get category options ----------------
export const getCategoryOptions = async (): Promise<{ _id: string; categoryName: string }[]> => {
  const response = await api.get(CATEGORIES_ENDPOINTS.GET_OPTIONS);
  return response.data.data; 
};

// -----------delete model----------------
export const deleteCategory = async (id: string): Promise<any> => {
    const response = await api.delete(CATEGORIES_ENDPOINTS.DELETE(id));
    return response.data;
};

// // -----------get category by id----------------
// export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
//   const response = await api.get(CATEGORIES_ENDPOINTS.GET_BY_ID(id));
//   return response.data;
// };
