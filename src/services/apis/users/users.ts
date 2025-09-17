import api from "@services/apiClient";
import { USERS_ENDPOINTS } from "@services/basePaths";
import type { LoginPayload, LoginResponse } from "@interfaces/usersTypes";

// -----------get all users----------------
export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post(USERS_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

// -----------get profile by id----------------
export const getProfile = async (id: string): Promise<LoginResponse> => {
    const response = await api.get(USERS_ENDPOINTS.GET_BY_ID(id));
    return response.data;
};
