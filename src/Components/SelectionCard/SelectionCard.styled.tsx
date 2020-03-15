import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const SelectionStyled = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid ${colors.darkGrey3};
  border-radius: 50%;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.darkGrey1};
  }
`;

interface SelectionBoxProps {
  margin?: string;
}

const SelectionBoxStyled = styled.div<SelectionBoxProps>`
  width: 208px;
  height: 224px;
  margin: 10px auto;
  border-radius: 4px;
  border: solid 0.8px ${colors.darkGrey3};
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  &:hover {
    border-color: ${colors.darkGrey2};
  }

  &.selected {
    border-color: ${colors.darkGrey2};
    background: ${colors.paleGrey3};

    ${SelectionStyled} {
      background: ${colors.skyBlue};
      border-color: ${colors.darkGrey4};
      padding: 4px;
      background-clip: content-box;
      height: 28px;
      width: 28px;
    }
  }
  ${mediaQueries.md}{
    margin: ${p => p.margin ? p.margin : null};

  }
`;

export {
  SelectionStyled,
  SelectionBoxStyled,
};
