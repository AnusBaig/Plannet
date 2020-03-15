import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const WrapperStyled = styled.div`
  width: 100%;
  position: relative;

  input {
    padding-right: 78px;
  };
`;

const ButtonStyled = styled.button`
  border: none;
  color: ${colors.cerulean};
  position: absolute;
  right: 5px;
  top: 14px;
  font-family: 'Quicksand';
  font-weight: 500;
  cursor: pointer;
  z-index: 1;
  background: initial;


  ${mediaQueries.md} {
    font-size: 15px;
  }
`;

export { WrapperStyled, ButtonStyled };
