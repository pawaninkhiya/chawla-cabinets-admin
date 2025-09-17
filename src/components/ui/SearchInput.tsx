import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const COMMON_STYLES = {
  inputHeight: "h-12",
  paddingY: "py-3",
  borderRadius: "rounded-md",
  border: "border",
  focusRing: "focus:ring-2 focus:ring-offset-1 focus:ring-default-300 focus:border-default-500 outline-none",
  transition: "transition-colors duration-200",
  textSize: "text-sm",
  iconSize: 20,
};

interface SearchInputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  debounceTime?: number;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onChange,
  placeholder = "Search",
  width = "w-full md:max-w-sm",
  debounceTime = 500,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange({ target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>);
      }
    }, debounceTime);
    return () => clearTimeout(handler);
  }, [inputValue, debounceTime, onChange, value]);

  return (
    <div className={`relative ${width} ${className} `}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-default-400">
        <FiSearch size={COMMON_STYLES.iconSize} />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={`
          block w-full ${COMMON_STYLES.textSize} text-default-900 placeholder-default-400
          ${COMMON_STYLES.border} ${COMMON_STYLES.borderRadius} bg-white
          ${COMMON_STYLES.paddingY} pr-4 pl-10
          ${COMMON_STYLES.transition} ${COMMON_STYLES.focusRing}
          border-default-300
          ${COMMON_STYLES.inputHeight}
        `}
      />
    </div>
  );
};

export default SearchInput;
