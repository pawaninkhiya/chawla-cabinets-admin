import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { useAuthContext } from "@hooks/context/useAuthContext";
import { useUIContext } from "@hooks/context/useUIContext";
import { type ReactNode, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { isSidebarOpen } = useUIContext();
    const { user } = useAuthContext();
    const location = useLocation();
    const hideComponent = location.pathname.startsWith("/login");
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex-1 h-screen font-primary">
                {!hideComponent && user && <Sidebar />}
                <div
                    className={`flex flex-col flex-1 h-screen  
                    ${isSidebarOpen && !hideComponent && user ? "md:ml-64 ml-0" : "ml-0"}`}
                >
                    {!hideComponent && user && <Navbar />}
                    <div
                        className={` overflow-y-auto scroll-hidden h-full bg-default-50  transition-all duration-300 
                        `}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Layout;
