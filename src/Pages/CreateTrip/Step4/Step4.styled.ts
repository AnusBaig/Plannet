import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";
import { SliderRangeStyled } from "src/Components/SliderRange/SliderRange.styled";

const SliderStyled = styled.div`
width: 90%;  
${SliderRangeStyled} {
    width: 100%;
    margin-bottom: 56px;
  }
`;

export {

  SliderStyled,
};
