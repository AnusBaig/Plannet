import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const StepStyled = styled.div`
  box-sizing: border-box;
  color: ${colors.steel};
  font-size: 16pt;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.19px;
  line-height: 1.25;
  margin-bottom: 40px;
  padding: 0 2%;
  text-align: center;
  width: 100%;

  & > svg {
    // max-width: 100%;
    // width: 156px;
    // height: 156px;
    // background-color: rgba(255, 202, 0, 0.15);
    // border-radius: 100%;
  }

  b {
    color: ${colors.black};
  }

  ${mediaQueries.md} {
    width: 25%;
    font-size: 19px;
  }
`;

const StepTitleStyled = styled.div`
  color: ${colors.black};
  font-size: 22px;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.19px;
  line-height: 1.25;

  ${mediaQueries.md} {
    font-size: 28px;
  }
`;

export { StepStyled, StepTitleStyled };
