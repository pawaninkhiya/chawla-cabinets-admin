import { Outlet } from "react-router-dom";
import PageHeader from "@components/PageHeader";

const Models = () => {

    let lastBreadcrumb = "All Models";


    return (
        <>
            <PageHeader
                title="Models"
                breadcrumbItems={[
                    { label: "Models", path: "/models" },
                    { label: lastBreadcrumb, active: true },
                ]}
            />
            <Outlet />
        </>
    );
};

export default Models;