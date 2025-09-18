import { useAuthContext } from "@hooks/context/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@interfaces/usersTypes";

const isTokenExpired = (token: string) => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    } catch {
        return true; 
    }
};

const ProtectedRoute = ({ isProtected }: { isProtected: boolean }) => {
    const { user, isLoading } = useAuthContext();
    const token = localStorage.getItem("token");
    if (isLoading) return <div>Loading...</div>;

    const tokenValid = token && !isTokenExpired(token);

    if (isProtected && (!user || !tokenValid)) {
        return <Navigate to="/login" replace />;
    }

    if (!isProtected && user && tokenValid) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
