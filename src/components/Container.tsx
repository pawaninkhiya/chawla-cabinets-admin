import { useEffect } from "react";

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={`w-full  mx-auto mr-auto px-4 md:px-6 pb-4 ${className || ""}`}>
            {children}
        </div>
    );
};

export default Container;
