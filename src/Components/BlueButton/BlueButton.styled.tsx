import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

interface BlueButtonProps {
  width?: string;
  active?: boolean;
  disabled?: boolean;
  name?: string;
}

const BlueButtonStyled = styled.h3<BlueButtonProps>`
  background-color: ${p =>
    p.disabled ? colors.paleGrey2 : colors.paleSkyBlue};
  border-radius: 40px;
  border: 2px solid ${p => (p.active ? colors.cerulean : colors.paleSkyBlue)};
  box-sizing: border-box;
  color: ${colors.cerulean};
  cursor: ${p => (p.disabled ? "initial" : "pointer")};
  opacity: ${p => (p.disabled ? "0.7" : "1")};
  font-size: 20px;
  font-weight: 500;
  min-height: 50px;
  letter-spacing: 0.19px;
  line-height: 20px;
  padding: 13px 35px;
  text-align: center;
  width: ${p => p.width};
  max-width: 100%;
  margin: 10px 0 10px 0;
`;

export { BlueButtonStyled };
