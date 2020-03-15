import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";
import { RectangleStyled } from "src/Pages/CreateTrip/Step15/Step15.styled";

const Step3WrapperStyled = styled.div`
  ${sectionStep}
`;

const Step3ButtonsStyled = styled.div`
  ${stepSectionButtonsStyled}
`;

const Step3InputWrapperStyled = styled.div`
  text-align: center;
  width: 467px;
  margin: 20px auto;
  max-width: 100%;
`;

const InputStyled = styled.div`
  width: 320px;
  margin-top: 56px;
  align-items: center;
  display: flex;
  flex-direction: column;

  svg {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  // ${RectangleStyled} {
  //   display: flex;
  //   justify-content: center;
  //   flex-direction: column;
  //   align-items: center;
  // }

`;

export { Step3WrapperStyled, Step3ButtonsStyled, Step3InputWrapperStyled, InputStyled };
