import { type JSX } from "react";
import { RxDashboard } from "react-icons/rx";
import { BiCube } from "react-icons/bi"; 
import { AiOutlineAppstore } from "react-icons/ai"; 
import { FiLayers } from "react-icons/fi"; 

export type SidebarItem =
    | {
        type: "link";
        label: string;
        icon: JSX.Element;
        to: string;
    }
    | {
        type: "dropdown";
        label: string;
        icon: JSX.Element;
        key: string;
        basePath: string;
        items: { label: string; to: string }[];
    };

export const sidebarMenu: SidebarItem[] = [
    {
        type: "link",
        label: "Dashboard",
        icon: <RxDashboard className="text-sm 2xl:text-lg" />,
        to: "/",
    },
    {
        type: "link",
        label: "Categories",
        icon: <FiLayers className="text-sm 2xl:text-lg" />,
        to: "/categories",
    },
    {
        type: "link",
        label: "Models",
        icon: <BiCube className="text-sm 2xl:text-lg" />,
        to: "/models",
    },
    {
        type: "dropdown",
        label: "Products",
        icon: <AiOutlineAppstore className="text-sm 2xl:text-lg" />,
        key: "products",
        basePath: "/products",
        items: [
            { label: "List Products", to: "/products" },
            { label: "Add Product", to: "/products/add" },
        ],
    },
];
