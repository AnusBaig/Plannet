import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";
import { SliderRangeStyled } from "src/Components/SliderRange/SliderRange.styled";

const SliderStyled = styled.div`
  ${SliderRangeStyled} {
    width: 440px;
    margin-bottom: 56px;
  }
`;

export {

  SliderStyled,
};
