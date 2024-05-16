import React, { useState } from "react";
import down from "../assets/icons_FEtask/down.svg";
import "./customeSelect.css";
const CustomSelect = ({
  options,
  onSelect,
  type,
  selectedFilter,
}: {
  options: any;
  onSelect: any;
  type: string;
  selectedFilter: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (value: string) => {
    onSelect(value, type); // Call onSelect function with the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedFilter[type] || "Select..."}
        <img src={down} alt="down" />
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option: any) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
