import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import logo from "@assets/logo.png";
import { useUIContext } from "@hooks/context/useUIContext";
// import { useAuthContext } from "@hooks/context/useAuthContext";
import { type SidebarItem, sidebarMenu } from "./sidebarItem";
import { BiMenuAltLeft } from "react-icons/bi";
import { useAuthContext } from "@hooks/context/useAuthContext";

const Sidebar = () => {
    const { logout } = useAuthContext();
    const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIContext();
    const location = useLocation();

    const [openMenu, setOpenMenu] = useState<string | null>(() => {
        const match = sidebarMenu.find(
            (item: any) =>
                item.type === "dropdown" &&
                location.pathname.startsWith(item.basePath ?? "")
        ) as typeof sidebarMenu[number] & { key: string } | undefined;
        return match?.key ?? null;
    });

    const handleMenuToggle = (key: string) => {
        setOpenMenu((prev) => (prev === key ? null : key));
    };

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 py-3 px-4 text-sm rounded transition-all duration-200 ${isActive
            ? "bg-gradient-to-r from-default-500 to-default-400 text-white shadow-sm shadow-default-200"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
        setOpenMenu(null);
    };

    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

             <div className={`w-64 h-screen bg-white shadow-md transition-transform duration-300 transform ${isSidebarOpen ? "  translate-x-0" : "-translate-x-full"
                } fixed md:fixed z-50 md:z-30 overflow-y-auto`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Logo" width={100} className="h-10 object-contain" />

                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="text-default-500 hover:text-default-700 cursor-pointer p-2 rounded-lg hover:bg-default-100 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        {isSidebarOpen ? (
                            <BiMenuAltLeft size={25} />
                        ) : (
                            <BiMenuAltLeft size={25} />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-5 space-y-2 flex-1">
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider px-4">
                        Main Navigation
                    </span>

                    <div className="space-y-2 mt-3">
                        {sidebarMenu.map((item: SidebarItem) => {
                            if (item.type === "link") {
                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={linkClasses}
                                        end
                                        onClick={handleNavClick}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                );
                            }

                            if (item.type === "dropdown") {
                                const isOpen = openMenu === item.key;
                                const isParentActive = location.pathname.startsWith(
                                    item.basePath
                                );

                                return (
                                    <div key={item.key} className="mt-1">
                                        <button
                                            onClick={() => handleMenuToggle(item.key)}
                                            aria-expanded={isOpen}
                                            aria-controls={`submenu-${item.key}`}
                                            className={`flex items-center justify-between w-full cursor-pointer py-3 px-4 rounded text-sm transition-all duration-200 ${isParentActive
                                                ? "bg-gradient-to-r from-default-500 to-default-400 text-white shadow-lg shadow-default-200"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </span>
                                            {isOpen ? (
                                                <IoIosArrowUp size={14} />
                                            ) : (
                                                <IoIosArrowDown size={14} />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    id={`submenu-${item.key}`}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="pl-8 mt-2 space-y-1.5 text-sm text-gray-600 list-none">
                                                        {item.items.map((subItem: any) => (
                                                            <li key={subItem.to}>
                                                                <NavLink
                                                                    to={subItem.to}
                                                                    end
                                                                    className={({ isActive }) =>
                                                                        `w-full px-4 py-2.5 flex items-center gap-3 rounded-sm border border-default-100 transition-all duration-200 ${isActive
                                                                            ? "bg-default-100 text-default-700 font-medium"
                                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                                        }`
                                                                    }
                                                                    onClick={handleNavClick}
                                                                >
                                                                    <BsCircleFill size={6} className="flex-shrink-0" />
                                                                    <span className="text-sm">{subItem.label}</span>
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return null;
                        })}
                    </div>
                </nav>

                {/* Logout */}
                <div className="mt-auto pt-4 border-t border-gray-100 p-5">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 py-3 px-4 text-sm rounded w-full transition-all duration-200 cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium"
                    >
                        <FaSignOutAlt size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;