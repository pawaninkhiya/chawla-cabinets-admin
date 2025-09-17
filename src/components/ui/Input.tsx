import React, { forwardRef, useState } from "react";
import { IoCheckmarkCircle, IoAlertCircle, IoEye, IoEyeOff } from "react-icons/io5";

const COMMON_STYLES = {
  inputHeight: "h-12",
  paddingY: "py-3",
  paddingX: "px-4",
  borderRadius: "rounded-md",
  border: "border",
  focusRing: "focus:ring-2 focus:ring-offset-1 focus:ring-default-300 focus:border-default-500 outline-none focus:border-default-200",
  transition: "transition-colors duration-200",
  textSize: "text-sm",
  labelSize: "text-sm font-medium",
  helperTextSize: "text-xs mt-1.5",
  iconSize: 20,
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, success, icon, fullWidth = true, helperText, type = "text", className = "", ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const getStatusIcon = () => error
    ? <IoAlertCircle className="text-red-500" size={COMMON_STYLES.iconSize} />
    : success
      ? <IoCheckmarkCircle className="text-green-500" size={COMMON_STYLES.iconSize} />
      : null;

  const getStatusColor = () => error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : success
      ? "border-green-500 focus:border-green-500 focus:ring-green-200"
      : "border-default-300   ";

  return (
    <div className={`${fullWidth ? "w-full" : "w-fit"}  `}>
      {label && (
        <label className={`${COMMON_STYLES.labelSize} text-default-700 mb-2 block`}>
          {label} {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-default-500">{icon}</div>}

        <input
          ref={ref}
          type={inputType}
          className={`
            block w-full ${COMMON_STYLES.textSize} text-default-900 placeholder-default-400
            ${COMMON_STYLES.border} ${COMMON_STYLES.borderRadius} bg-white
            ${COMMON_STYLES.paddingY} ${COMMON_STYLES.transition} ${COMMON_STYLES.focusRing}
            ${getStatusColor()}
            ${icon ? "pl-10" : "pl-4"} 
            ${isPassword || error || success ? "pr-10" : "pr-4"}
            ${COMMON_STYLES.inputHeight}
            ${props.disabled ? "bg-default-100 cursor-not-allowed opacity-70" : ""}
            ${className}
          `}
          {...props}
        />

        {(isPassword || error || success) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isPassword ? (
              <button
                type="button"
                className="text-default-500 hover:text-default-700 focus:outline-none focus:ring-2 focus:ring-default-300 rounded-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff size={COMMON_STYLES.iconSize} /> : <IoEye size={COMMON_STYLES.iconSize} />}
              </button>
            ) : getStatusIcon()}
          </div>
        )}
      </div>

      {(error || success || helperText) && (
        <p className={`${COMMON_STYLES.helperTextSize} ${error ? "text-red-600" : success ? "text-green-600" : "text-default-500"}`}>
          {error || success || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
