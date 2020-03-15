import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const LabelCircledStyled = styled.span`
  border-radius: 10px;
  border: 1px solid ${colors.cerulean};
  color: ${colors.cerulean};
  display: inline-table;
  font-size: 12px;
  margin-right: 20px;
  padding: 0px 5px;
  vertical-align: text-bottom;
`;

export { LabelCircledStyled };
