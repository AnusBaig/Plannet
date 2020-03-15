import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const DayControlStyled = styled.span`
  border-radius: 4px;
  background-color: ${colors.paleGrey};
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.31;
  letter-spacing: 0.15px;
  color: ${colors.steel};
  display: flex;
  justify-content: space-between;
  width: 135px;
`;

const ArrowsStyled = styled.div``;

const ArrowStyled = styled.button`
  background: transparent;
  border: none;
  color: ${colors.steel};
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  outline: none;

  svg {
    height: 16px;
    width: 16px;
  }
`;

export { DayControlStyled, ArrowsStyled, ArrowStyled };
