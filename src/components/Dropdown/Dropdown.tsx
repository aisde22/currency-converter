import React from "react";
import Select, { SingleValue, GroupBase, StylesConfig } from "react-select";
import { currency } from "../../config/currency";
interface CurrencyOption {
  value: string;
  label: string;
}

interface DropdownsProps {
  placeholder: string;
  handleChange: (selectedOption: CurrencyOption | null) => void;
  value: string;
}

const customStyles: StylesConfig<CurrencyOption, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "none",
    minHeight: "40px", // Fix height issue
    '&:hover': {
      borderColor: "#007bff",
    },
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#007bff" : "#fff",
    color: isFocused ? "#fff" : "#333",
    padding: "12px",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    maxHeight: "200px", // Ensure dropdown does not grow too large
    overflowY: "auto",
  }),
  input: (base) => ({
    ...base,
    height: "auto", // Allow input field to adjust height dynamically
  }),
};

const customSingleValue: React.FC<{ data: CurrencyOption }> = ({ data }) => (
  <div className="custom-single-value">
    <span className={`currency-flag currency-flag-${data.value}`} /> {data.label}
  </div>
);

const customOption: React.FC<any> = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="custom-option">
      <span className={`currency-flag currency-flag-${data.value}`} /> {data.label}
    </div>
  );
};

const Dropdowns: React.FC<DropdownsProps> = ({ handleChange, placeholder, value }) => {
  const selectValue = currency.find((option) => option.value === value || option.label === value) || null;

  return (
    <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
      classNamePrefix="custom-dropdown"
      styles={customStyles}
      options={currency}
      value={selectValue}
      onChange={handleChange}
      placeholder={placeholder}
      components={{ SingleValue: customSingleValue, Option: customOption }}
      isSearchable={true} // Enable searching
      filterOption={(option:any, input:any) =>
        option.data.label.toLowerCase().includes(input.toLowerCase()) ||
        option.data.value.toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default Dropdowns;

