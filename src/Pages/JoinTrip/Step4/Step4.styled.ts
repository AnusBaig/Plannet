import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";
import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";
import { SliderRangeStyled } from "src/Components/SliderRange/SliderRange.styled";


const Step5WrapperStyled = styled.div`
  ${sectionStep}
`;


const SliderStyled = styled.div`
width: 90%;  
${SliderRangeStyled} {
    width: 100%;
    margin-bottom: 56px;
  }
`;




const Step5Styled = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.md} {
    flex-direction: row;
  }
`;

const SectionStyled = styled.div`
  flex: 1;
  padding: 30px;
  box-sizing: border-box;
  width: 100%;

  ${mediaQueries.md} {
    width: 50%;
  }
`;

const Step5ButtonsStyled = styled.div`
  ${stepSectionButtonsStyled}
`;

const EmailListStyled = styled.div`
  height: 220px;
  overflow: auto;
  margin-top: 25px;
`;

const EmailRowStyled = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.15px;
  color: ${colors.steel};
  margin-bottom: 10px;
  border-bottom: solid 1px ${colors.paleGrey3};
  padding-top: 14px;
`;

export {
  SliderStyled,

  Step5Styled,
  SectionStyled,
  Step5WrapperStyled,
  Step5ButtonsStyled,
  EmailListStyled,
  EmailRowStyled
};
