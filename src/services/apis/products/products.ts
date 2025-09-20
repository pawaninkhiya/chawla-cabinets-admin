import api from "@services/apiClient";
import { PRODUCT_ENDPOINTS } from "@services/basePaths";

// ----------- Create product ----------------
export const createProduct = async (payload: FormData): Promise<any> => {
    const response = await api.post(PRODUCT_ENDPOINTS.CREATE, payload, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ since product has images/colors
    });
    return response.data;
};