import styled from "@emotion/styled/macro";
import css from "@emotion/css";
import Autocomplete from "react-google-autocomplete";
import { colors } from "src/shared/styles/colors";
import MaskedField, { MaskedFieldProps } from 'react-masked-field';

interface InputProps {
  width?: string;
  error?: boolean;
}

const InputWrapperStyled = styled.div`
  position: relative;
  width: 100%;
`;
const ErrorMessage = styled.div`
  color: red;
  paddingLeft: 4px;
  position: absolute;
    top: 50px;
`;
const LabelStyled = styled.label`
  position: absolute;
  // padding-top: 4.3%;
  padding-left: 15px !important;
  padding: 10px;
  line-height: 28px;
  top: 0;
  bottom: 0;
  left: 0;
  // width: 100%;
  pointer-events: none;
  color: ${colors.steel};
  transition: padding 0.2s, font-size 0.2s;
  z-index: 3;
  text-transform: uppercase;
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

  // position: relative;
  top: 0;
  left: 0;
  // z-index: 2;
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
    // z-index: 5;
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


const inputStylesSharedWithoutBorder = css`
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

  // position: relative;
  top: 0;
  left: 0;
  // z-index: 2;
  padding: 5px 15px 0px 15px;

  &:not([value=""]):not(:focus) + label {
    font-size: 65%;
    padding-top: 5px;
    line-height: unset;
    padding-left: 15px;
    
  }

  &:focus {
    border: none;
    border-bottom: 0.8px solid ${colors.darkGrey2};
    // padding-top: 15px;
  }

  &:focus + label {
    font-size: 65%;
    padding-top: 5px;
    line-height: unset;
    // z-index: 5;
    padding-left: 15px;
    font-weight: 600;
  }

  &:hover {
    border: none ;
    border-bottom: 0.8px solid ${colors.darkGrey2};
  }

  & + svg {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;

const InputAutocompleteStyled = styled(Autocomplete) <InputProps>`
  ${inputStylesShared};
  -webkit-border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};

  width: ${p => (p.width ? p.width : "100%")};
  z-index: 4;

  &::placeholder {
    text-transform: uppercase;
  }
`;

const InputAutocompleteStyledWithoutBorder = styled(Autocomplete) <InputProps>`
  ${inputStylesSharedWithoutBorder};
  width: ${p => (p.width ? p.width : "100%")};
  border: none;
  
  -webkit-border-bottom:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border-bottom:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border-radius: 0px;  
  z-index: 4;

  &::placeholder {
    text-transform: uppercase;
  }
`;

const InputMaskedFieldStyled = styled(MaskedField) <MaskedFieldProps & { error?: boolean }>`
  ${inputStylesShared};
  margin-bottom: 20px;
  -webkit-border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  width: ${p => (p.width ? p.width : "100%")};

  &::placeholder {
    text-transform: uppercase;
  }
`;

const InputStyled = styled.input<InputProps>`
  ${inputStylesShared};
  font-size: 16spx;
  font-family: Quicksand;
  width: 340px;
  height: 48px;
  padding: 10px;
  -webkit-border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  width: ${p => (p.width ? p.width : "100%")};
  padding-left: 15px;
`;
const InputStyledWithoutBorder = styled.input<InputProps>`
  ${inputStylesSharedWithoutBorder};
  font-size: 16spx;
  font-family: Quicksand;
  width: 340px;
  height: 48px;
  padding: 10px;
  border: none;
  border-radius: 0px;
  -webkit-border-bottom:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  border-bottom:1px solid ${p => (p.error ? "red" : colors.paleGrey6)};
  width: ${p => (p.width ? p.width : "100%")};
  padding-left: 15px;
`;
export {
  InputWrapperStyled,
  InputStyled,
  InputAutocompleteStyled,
  LabelStyled,
  ErrorMessage,
  InputMaskedFieldStyled,
  inputStylesShared,
  InputStyledWithoutBorder,
  InputAutocompleteStyledWithoutBorder
};
