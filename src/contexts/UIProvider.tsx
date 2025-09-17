import { createContext, useState, type ReactNode } from "react";

interface UIContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (value: boolean) => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);

const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth < 640 ? false : true);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <UIContext.Provider value={{ isSidebarOpen, toggleSidebar, setSidebarOpen }}>
            {children}
        </UIContext.Provider>
    );
};

export default UIProvider;

