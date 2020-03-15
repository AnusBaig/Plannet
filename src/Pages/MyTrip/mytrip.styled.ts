import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";
import BGStep from "src/shared/assets/landing-bg.svg";

const StepWrapperStyled = styled.div`
  // ${sectionMargin};
  width: 100%;
  padding: 20px;
  background: url(${BGStep}) center no-repeat;
  background-size: 100%;
  background-position-y: bottom;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  overflow: auto;
`;

const NameStyled = styled.span`
  border-radius: 4px;
  border: solid 1px ${colors.cerulean};
  color: ${colors.cerulean};
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 1.56; 
  padding: 6px 16px;
  text-align: center;
  text-transform: uppercase;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export { StepWrapperStyled, NameStyled };
