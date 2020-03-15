import React from "react";
import { ButtonStyled, ButtonProps } from "./Button.styled";

const Button: React.FC<ButtonProps> = props => {
  return <ButtonStyled {...props} />;
};

export default Button;
