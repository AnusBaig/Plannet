import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const SearchBoxStyled = styled.div`
  border-radius: 20px;
  background-color: ${colors.paleGrey};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 9px 5px 24px;
`;

const SearchInputStyled = styled.input`
  border: 0;
  background: transparent;
  color: ${colors.charcoalGrey};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.15px;
  outline: none;
  &::placeholder {
    color: ${colors.steel};
  }
`;

export { SearchBoxStyled, SearchInputStyled };
