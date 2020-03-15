import { mediaQueries } from "src/shared/styles/mediaQueries";
import { CSSProperties } from "react";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const sizes = {
  small: {
    fontSize: "16px",
    padding: "5px 15px"
  },
  normal: {
    fontSize: "20px",
    padding: "10px 30px"
  },
  large: {
    fontSize: "24px",
    padding: "15px 40px"
  }
};

export interface ButtonProps {
  disabled?: boolean;
  active?: boolean;
  glow?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  width?: string;
  style?: CSSProperties;
  size?: "small" | "normal" | "large";
  variant?: "primary" | "secondary";
  marginTop?: string;
  marginBottom?: string;
}

const getBackground = (props: ButtonProps) => {
  if (props.variant === 'secondary') {
    return props.disabled ? colors.paleGrey4 : colors.white;
  }
  return props.disabled ? colors.paleGrey4 : colors.cerulean;
};

const getBorderColor = (props: ButtonProps) => {
  if (props.variant === 'secondary') {
    return props.disabled ? colors.darkGrey : colors.cerulean;
  }
  return props.disabled ? colors.darkGrey : colors.cerulean;
};

const getColor = (props: ButtonProps) => {
  if (props.variant === 'secondary') {
    return props.disabled ? colors.darkGrey5 : colors.cerulean;
  }
  return props.disabled ? colors.darkGrey5 : colors.white;
};

const getBoxShadow = (props: ButtonProps) => {
  if (props.glow && props.variant !== 'secondary') {
    return props.disabled ? 'initial' : `0px 10px 33px -8px ${colors.cerulean}`;
  }
  return 'inital';
};

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${getBackground};
  border-radius: 4px;
  border: solid 1px;
  border-color: ${p => (p.disabled ? colors.paleGrey4 : colors.cerulean)};
  color: ${getColor};
  cursor: pointer;
  font-size: ${p =>
    p.size ? sizes[p.size].fontSize : sizes["normal"].fontSize};
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.25px;
  line-height: 1.5;
  outline: none;
  padding: ${p => (p.size ? sizes[p.size].padding : sizes["normal"].padding)};
  // margin-left: 5px;
  width: ${p => (p.width ? p.width : "auto")};
  box-shadow: ${getBoxShadow};

  margin-bottom: ${p => p.marginBottom ? p.marginBottom : null};
  margin-top: ${p => p.marginTop ? p.marginTop : null};

  font-size: 1em;
  font-family: "Quicksand";


  & > svg {
    margin-right: 5px;
  }

  ${mediaQueries.md} {
    float: right;
  }
  ${mediaQueries.mobile} {
    font-size: 0.8em;
    margin: 0 auto;
    margin-top: 10px;
  }
`;

export { ButtonStyled };
