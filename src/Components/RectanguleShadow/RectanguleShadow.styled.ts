import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

export interface RectanguleProps {
  column?: boolean;
  width?: string;
  id?: any;
  onDragOver?: any;
  draggable?: boolean;
  onDragStart?: any;
  [k: string]: any;
}

const RectanguleStyled = styled.div<RectanguleProps>`
  align-items: center;
  background-color: ${colors.white};
  border-radius: 4px;
  border: solid 1px ${colors.paleGrey2};
  // box-shadow: 0 4px 7px 0 ${colors.black18};
  border: solid 1px #dadada;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${p => (p.column ? "column" : "row")};
  justify-content: ${p => (p.column ? "space-around" : "space-around")};
  align-items: ${p => (p.column ? "flex-start" : "inherit")};
  margin: 0 auto;
  max-width: 100%;
  padding: 17px;
  width: ${p => (p.width ? p.width : "auto")};
`;

export { RectanguleStyled };
