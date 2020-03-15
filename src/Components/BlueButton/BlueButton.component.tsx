import React from "react";
import { BlueButtonStyled } from "./BlueButton.styled";

interface BlueButtonProps {
  width?: string;
  active?: boolean;
  disabled?: boolean;
  type?: string;
  onClick: () => void;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  width = "475px",
  active,
  disabled,
  onClick,
  children
}) => {
  function handleClick() {
    if (!disabled) {
      onClick();
    }
  }

  return (
    <BlueButtonStyled
      active={active}
      onClick={handleClick}
      width={width}
      disabled={disabled}
    >
      {children}
    </BlueButtonStyled>
  );
};

export default BlueButton;
