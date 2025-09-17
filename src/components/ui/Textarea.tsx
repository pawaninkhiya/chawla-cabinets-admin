import React, { forwardRef } from "react";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";

const COMMON_STYLES = {
  textareaMinHeight: "min-h-[120px]",
  paddingX: "px-4",
  paddingY: "py-3",
  borderRadius: "rounded-md",
  border: "border",
  focusRing: "focus:ring-2 focus:ring-offset-1 focus:ring-default-300 focus:border-default-500 outline-none",
  transition: "transition-colors duration-200",
  textSize: "text-sm",
  labelSize: "text-sm font-medium",
  helperTextSize: "text-xs mt-1.5",
  iconSize: 20,
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  helperText?: string;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label, error, success, fullWidth = true, helperText, rows = 4, className = "", ...props
}, ref) => {
  const getStatusIcon = () => error
    ? <IoAlertCircle className="text-red-500" size={COMMON_STYLES.iconSize} />
    : success
      ? <IoCheckmarkCircle className="text-green-500" size={COMMON_STYLES.iconSize} />
      : null;

  const getStatusColor = () => error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : success
      ? "border-green-500 focus:border-green-500 focus:ring-green-200"
      : "border-default-300";

  return (
    <div className={`${fullWidth ? "w-full" : "w-fit"} mb-5`}>
      {label && (
        <label className={`${COMMON_STYLES.labelSize} text-default-700 mb-2 block`}>
          {label} {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          className={`
            block w-full ${COMMON_STYLES.textSize} text-default-900 placeholder-default-400
            ${COMMON_STYLES.border} ${COMMON_STYLES.borderRadius} bg-white
            ${COMMON_STYLES.paddingX} ${COMMON_STYLES.paddingY}
            ${COMMON_STYLES.transition} ${COMMON_STYLES.focusRing}
            ${getStatusColor()}
            resize-y
            ${props.disabled ? "bg-default-100 cursor-not-allowed opacity-70" : ""}
            ${className}
          `}
          {...props}
        />
        {(error || success) && (
          <div className="absolute top-3.5 right-3 flex items-center">{getStatusIcon()}</div>
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

Textarea.displayName = "Textarea";
export default Textarea;
