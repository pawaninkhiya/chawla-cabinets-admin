// =========================
// Button.tsx
// =========================
import React from "react";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    icon?: React.ReactNode;
    text: string;
    bgColor?: string;
    textColor?: string;
    size?: "sm" | "md" | "lg";
    loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
    isLoading,
    icon,
    text,
    bgColor = "bg-default-400 hover:bg-default-600",
    textColor = "text-white",
    size = "md",
    loadingText = "Loading...",
    ...rest
}) => {
    const sizeClasses =
        size === "sm"
            ? "px-4 py-2 text-xs"
            : size === "md"
                ? "h-10 2xl:h-12 px-6 py-2.5 text-xs 2xl:text-sm"
                : "px-8 py-4 text-lg";

    return (
        <button
            {...rest}
            onMouseDown={(e) => e.preventDefault()}
            className={`
        rounded-md sm:w-auto mt-4 sm:mt-0 shadow inline-flex items-center justify-center
        border border-transparent font-semibold tracking-widest transition ease-in-out duration-150
        disabled:opacity-50 ${isLoading ? "cursor-progress" : "cursor-pointer"}
        ${bgColor} ${textColor} ${sizeClasses} ${rest.className || ""}
        focus:outline-none focus:ring-2 focus:ring-default-500 focus:ring-offset-2
      `}
            disabled={isLoading || rest.disabled}
        >
            {isLoading && <ImSpinner2 fontSize={17} className="animate-spin mr-2" />}
            {!isLoading && icon && <span className={text ? "mr-2" : ""}>{icon}</span>}
            {isLoading ? loadingText : text}
        </button>
    );
};

export default Button;
