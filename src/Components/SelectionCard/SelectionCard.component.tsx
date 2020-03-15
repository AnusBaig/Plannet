import React from "react";

import {
  SelectionBoxStyled,
  SelectionStyled,
} from "./SelectionCard.styled";

interface SelectionCardProps {
  selected?: boolean;
  label?: string;
  icon?: React.FC | any;
  selectedIcon?: React.FC | any;
  onClick: () => void;
  margin?: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  label,
  icon: Icon,
  selectedIcon: SelectedIcon,
  onClick,
  margin,
}) => {
  return (
    <SelectionBoxStyled
      className={selected ? 'selected' : ''}
      onClick={onClick}
      margin={margin}
    >
      {selected && SelectedIcon?
        <SelectedIcon />
        :
        Icon ?
          <Icon />
          : null
      }
      <span>{label}</span>
      <SelectionStyled />
    </SelectionBoxStyled>
  );
};

export default SelectionCard;
