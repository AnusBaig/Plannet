import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import css from "@emotion/css";

const TimepickerWrapperStyled = styled.div`
  // padding-top: 20px;
  display: flex;
  width: 100%;
  // background-color: ${colors.paleGrey};
`;


const inputStylesShared = css`
  background: none;
  border: 1px solid ${colors.charcoalGrey};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${colors.darkGrey1};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.19px;
  line-height: 1.25;
  height: 48px;
  max-width: 100%;
  outline: none;

  font-family: "Quicksand";

  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 5px 15px 0px 15px;

  &:not([value=""]):not(:focus) + label {
    font-size: 65%;
    padding-top: 5px;
    line-height: unset;
    padding-left: 15px;
    
  }

  &:focus {
    border: 0.8px solid ${colors.darkGrey2};
    // padding-top: 15px;
  }

  &:focus + label {
    font-size: 65%;
    padding-top: 5px;
    line-height: unset;
    z-index: 5;
    padding-left: 15px;
    font-weight: 600;
  }

  &:hover {
    border: 0.8px solid ${colors.darkGrey2};
  }

  & + svg {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;

const TimepickerStyled = styled.select`
  ${inputStylesShared};
  font-size: 16spx;
  font-family: Quicksand;
  width: 340px;
  height: 48px;
  // padding: 10px;
  // padding-top: 15px;
  padding-left: 15px;
`;

export { TimepickerWrapperStyled, TimepickerStyled };
