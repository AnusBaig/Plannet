import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const ButtonsDetailsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 200px;

  & > svg {
    border-radius: 50%;
    box-shadow: 0 4px 7px 0 ${colors.paleGrey2};
    cursor: pointer;
    padding: 4px;
  }
`;

const InlineIconsStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  & > svg {
    margin-right: 5px;
  }
`;

export { ButtonsDetailsStyled, InlineIconsStyled };
