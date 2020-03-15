import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { RectanguleStyled } from "src/Components/RectanguleShadow/RectanguleShadow.styled";

const DropdownMenuStyled = styled.div`
  position: relative;

  ${RectanguleStyled} {
    max-height: 250px;
    overflow: auto;
  }
`;

const LinkStyled = styled.a`
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57;
  letter-spacing: 0.13px;
  color: ${colors.cerulean};
  text-decoration: none;
`;

const MenuStyled = styled.div`
  position: absolute;
  right: 0;
  max-width: 250px;
  box-sizing: border-box;
  z-index: 10;
  min-width: 250px;
`;

export { DropdownMenuStyled, LinkStyled, MenuStyled };
