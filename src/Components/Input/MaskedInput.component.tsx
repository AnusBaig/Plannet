import React, { useCallback } from "react";
import {
  InputWrapperStyled,
  InputMaskedFieldStyled,
  LabelStyled,
} from "./Input.styled";
import { MaskedFieldProps } from "react-masked-field";

interface InputProps extends MaskedFieldProps {
  icon?: JSX.Element;
  type?:
  | "email"
  | "phone"
  | "tel"
  | "number"
  | "text"
  | "password";
  width?: string;
  error?: boolean;
  label?: string;
}

const MaskedInput: React.FC<InputProps> = (
  { type = "text", ...props },
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <InputWrapperStyled>
      <InputMaskedFieldStyled
        placeholder={' '}
        {...props}
      />
      <LabelStyled style={{zIndex: 3}} htmlFor={props.label}>{props.label}</LabelStyled>
    </InputWrapperStyled>
  );
};

export default React.forwardRef(MaskedInput);
