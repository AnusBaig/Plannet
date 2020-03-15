import React, { useState, useCallback } from "react";
import { WrapperStyled, ButtonStyled } from "./InputPassword.styled";
import Input from "src/Components/Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  error?: boolean;
  label?: string;
  errorText?: string
}

const InputPassword: React.FC<InputProps> = (
  { ...props },
  ref: React.Ref<HTMLInputElement>,
) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(
    () => {
      setShowPassword(!showPassword);
    },
    [setShowPassword, showPassword]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);

      if (!props.onChange) return;

      const onChange = props.onChange as any;
      onChange({ target: { value } });
    },
    [setPassword, props.onChange]
  );

  return (
    <WrapperStyled>
      <Input {...props} ref={ref} errorText={props.errorText} type={showPassword ? "text" : "password"} value={password} onChange={handleChange} />
      <ButtonStyled type="button" style={{ cursor: 'pointer', zIndex: 0 }} onClick={toggleShowPassword}>{showPassword ? 'HIDE' : 'SHOW'}</ButtonStyled>
    </WrapperStyled>
  );
};

export default React.forwardRef(InputPassword);
