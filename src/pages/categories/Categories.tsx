import { Outlet } from "react-router-dom";
import PageHeader from "@components/PageHeader";

const Categories = () => {
    // const location = useLocation();
    // const pathParts = location.pathname.split("/").filter(Boolean);
    // const lastPath = pathParts[pathParts.length - 1];

    let lastBreadcrumb = "All Categories";

    // if (lastPath === "add") {
    //     lastBreadcrumb = "Add Category";
    // }

    return (
        <div className="p-4">
            <PageHeader
                title="Categories"
                breadcrumbItems={[
                    { label: "Categories", path: "/categories" },
                    { label: lastBreadcrumb, active: true },
                ]}
            />
            <Outlet />
        </div>
    );
};

export default Categories;