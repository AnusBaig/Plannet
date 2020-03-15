import React, { useState } from "react";
import { WrapperStyled, InputStyled, ButtonStyled } from "./InputButton.styled";

interface BlueButtonProps {
  disabled?: boolean;
  onClick: (email: string) => void;
}


const InputButton: React.FC<BlueButtonProps> = ({
  disabled,
  onClick,
}) => {
  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    onClick(email);
    setEmail('')
  }
  
  return (
    <WrapperStyled>
      <InputStyled value={email} onChange={handleChange} placeholder="Your e-mail address" />
      <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
    </WrapperStyled>
  );
};

export default InputButton;
