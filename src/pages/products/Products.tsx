import { Outlet, useLocation } from "react-router-dom";
import PageHeader from "@components/PageHeader";

const Products = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter(Boolean);
    const lastPath = pathParts[pathParts.length - 1];

    let lastBreadcrumb = "All Products";

    if (lastPath === "add") {
        lastBreadcrumb = "Add Product";
    } else if (lastPath && lastPath !== "products") {
        lastBreadcrumb = "Product Details";
    }

    return (
        <div className="p-4">
            <PageHeader
                title="Products"
                breadcrumbItems={[
                    { label: "Products", path: "/products" },
                    { label: lastBreadcrumb, active: true },
                ]}
            />
            <Outlet />
        </div>
    );
};

export default Products;
