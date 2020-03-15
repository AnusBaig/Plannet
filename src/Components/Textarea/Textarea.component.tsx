import React from "react";
import { TextareaStyled } from "./Textarea.styled";

interface TextareaProps {
  value?: string;
  resize?: string;
  height?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  resize,
  height
}) => {
  return (
    <TextareaStyled
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      resize={resize}
      height={height}
    />
  );
};

export default Textarea;
