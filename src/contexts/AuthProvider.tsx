import { createContext, type ReactNode, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken, IUser, LoginPayload, LoginResponse } from "@interfaces/usersTypes";
import { getProfile, login } from "@services/apis/users/users";

interface AuthContextType {
    user: LoginResponse["data"] | IUser | undefined;
    isLoading: boolean;
    loginAdmin: {
        login: (data: LoginPayload) => Promise<LoginResponse>;
        isLoading: boolean;
        error: Error | null;
    };
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // ------------- Handle Logout -------------
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        queryClient.setQueryData(["userProfile"], null);
        navigate("/login");
    }, [navigate, queryClient]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        const decoded = decodeToken(token);
        if (!decoded) return logout();

        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) logout();
    }, [token, logout]);

    // ------------- Get Admin Data -------------
    const { data, isLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            console.log(token)
            if (!token) throw new Error("Token not found");
            const decoded = decodeToken(token);
            if (!decoded) throw new Error("Invalid token");
            return getProfile(decoded.id);
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    // ------------- Handle Login Admin -------------
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response?.success && response.token) {
                const decoded = decodeToken(response.token);
                if (!decoded) return logout();

                localStorage.setItem("token", response.token);
                localStorage.setItem("user_id", decoded.id);

                // ensure profile is updated
                queryClient.invalidateQueries({ queryKey: ["userProfile"] });
                navigate("/");
            } else {
                throw new Error(response?.message || "Login failed!");
            }
        },
        onError: (err) => {
            console.error("Login error:", err);
        },
    });
     console.log(loginMutation.data?.data || data?.data,)
    // ------------- Context Value -------------
    const contextValue = useMemo<AuthContextType>(
        () => ({
            user: loginMutation.data?.data || data?.data,
            isLoading,
            loginAdmin: {
                login: loginMutation.mutateAsync,
                isLoading: loginMutation.isPending,
                error: loginMutation.error ?? null,
            },
            logout,
        }),
        [data, isLoading, loginMutation, logout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
