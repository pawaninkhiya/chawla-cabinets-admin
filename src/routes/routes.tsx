import { Routes, Route } from "react-router-dom";

// Import pages
import Login from "@pages/authentication/Login";
import Dashboard from "@pages/dashboard/Dashboard";

// Categories
import Categories from "@pages/categories/Categories"; // Outlet parent
import CategoriesList from "@pages/categories/pages/CategoriesList";
import ProtectedRoute from "./ProtectedRoute";

// Models
import Models from "@pages/models/Models";
import ModelsList from "@pages/models/pages/ModelsList";
// import ModelAdd from "@pages/models/pages/Add";

// Products
import Products from "@pages/products/Products"; // Outlet parent
import ProductsList from "@pages/products/pages/ProductsList";
import ProductAdd from "@pages/products/pages/ProductAdd";
import ProductDetail from "@pages/products/pages/ProductDetail";

const AppRoutes = () => {

    return (
        <Routes>
            {/* Login */}
            <Route element={<ProtectedRoute isProtected={false} />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute isProtected={true} />}>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Categories nested */}
                <Route path="/categories" element={<Categories />}>
                    <Route index element={<CategoriesList />} /> {/* /categories */}
                </Route>

                {/* Models nested */}
                <Route path="/models" element={<Models />}>
                    <Route index element={<ModelsList />} />
                </Route>

                {/* Products nested */}
                <Route path="/products" element={<Products />}>
                    <Route index element={<ProductsList />} />
                    <Route path="add" element={<ProductAdd />} />
                        <Route path=":id" element={<ProductDetail />} /> {/* Detail page */}
                </Route>

                {/* Fallback */}

            </Route>
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
    );
};

export default AppRoutes;
