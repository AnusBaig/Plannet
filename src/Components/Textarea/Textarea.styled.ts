import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

interface TextAreaProps {
  height?: string;
  resize?: string;
}

const TextareaStyled = styled.textarea<TextAreaProps>`
  background-color: ${colors.paleGrey};
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  color: ${colors.charcoalGrey};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.19px;
  line-height: 1.25;
  outline: none;
  padding: 20px;
  width: 100%;
  height: ${p => (p.height ? p.height : "auto")};
  resize: ${p => (p.resize ? p.resize : "default")};

  &::placeholder {
    color: ${colors.steel};
  }
`;

export { TextareaStyled };
