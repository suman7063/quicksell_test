import { useState, useEffect, useRef } from "react";
import "./customeSelect.css";

import down from "../assets/icons_FEtask/down.svg";

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
  const customeRef = useRef<any>(null);

  // To close the box if clicked outside
  const handleClickOutside = (e: any) => {
    if (!customeRef?.current?.contains(e?.target)) {
      setIsOpen(false);
    }
  };

  // To close the box after selecting an option from dropdown
  const handleOptionClick = (value: string) => {
    onSelect(value, type); // Call onSelect function with the selected value
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={customeRef}>
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
