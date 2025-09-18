export const customSelectStyles = (error?: boolean, success?: boolean) => ({
  control: (provided: any, state: any) => {
    const baseBorderColor = error
      ? "#F87171" 
      : success
        ? "#22C55E" 
        : "#80B4B4"; 

    const focusRingColor = error
      ? "0 0 0 2px #FECACA"
      : success
        ? "0 0 0 2px #BBF7D0" 
        : "0 0 0 2px #80B4B4"; // default-300

    return {
      ...provided,
      borderColor: baseBorderColor,
      boxShadow: state.isFocused ? focusRingColor : undefined,
      borderRadius: "0.375rem",
      padding: "0 0.5rem",
      minHeight: "3rem",
      height: "3rem",
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s",
    };
  },
  placeholder: (provided: any) => ({
    ...provided,
    color: "#4D9696", // default-400
    fontSize: "0.875rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#0D1111", // default-900
    fontSize: "0.875rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.375rem",
    zIndex: 9999,
    overflow: "hidden",
    backgroundColor: "#F3F8F8", // default-50
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#F3F8F8" : "#ffffff", // default-50 on focus
    color: "#0D1111", // default-900
    cursor: "pointer",
    fontSize: "0.875rem",
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
});
