import { customSelectStyles } from "@utils/customSelectStyles";
import React from "react";
import Select from "react-select";


interface Option {
    label: string;
    value: string;
}
interface CustomSelectProps {
    id: string;
    label?: string;
    options: Option[];
    value?: string;
    setFieldValue?: (value: string) => void;
    fullWidth?: boolean;
    isDisabled?: boolean;
    required?: boolean;
    error?: boolean;
    success?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    id,
    label,
    options,
    value,
    setFieldValue,
    fullWidth = true,
    isDisabled = false,
    required = false,
    error,
    success,
}) => {
    const currentValue = options.find((opt) => opt.value === value);

    const handleChange = (opt: Option | null) => {
        setFieldValue?.(opt?.value || "");
    };

    return (
        <div className={`${fullWidth ? "w-full" : "w-fit"} mb-5`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-default-700 mb-2 block"
                >
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <Select
                inputId={id}
                name={id}
                options={options}
                value={currentValue || null}
                onChange={handleChange}
                styles={customSelectStyles(error, success)}
                menuPortalTarget={document.body}
                placeholder={`Select ${label || "option"}`}
                isClearable
                menuPosition="absolute"
                menuPlacement="auto"
                isDisabled={isDisabled}
            />
        </div>
    );
};
export default CustomSelect