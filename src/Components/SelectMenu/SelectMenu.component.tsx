import React, { useCallback } from "react";
import {
  SelectMenuStyled
} from "./SelectMenu.styled";

//@ts-ignore
import Select from 'react-select'

interface Option {
  value: string,
  label: string
}

interface DropdownMenuProps {
  options: Option[];
  onChange: (e: React.MouseEvent) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onChange }) => {
  const handleOptionChange = useCallback(e => {
    onChange(e.value)
  }, [onChange]);  
  let path = window.location.pathname
  let defaultValue = {}
  if (path.includes('who-is-coming')) {
    defaultValue = options[1]
  } else if (path.includes('transportation')) {
    defaultValue = options[2]
  } else if (path.includes('accommodation')) {
    defaultValue = options[3]    
  } else if (path.includes('itinerary')) {
    defaultValue = options[4]    
  } else {
    defaultValue = options[0]
  }
  return (
    <SelectMenuStyled>
      {/* <select onChange={handleOptionChange}>
        {options.map((option: Option) =>
          <option key={option.value} value={option.value}>{option.label}</option>
        )}
      </select> */}
      <Select options={options}
          onChange={handleOptionChange} 
          defaultValue={defaultValue}
          isSearchable={false}         
      />
    </SelectMenuStyled>
  );
};

export default DropdownMenu;
