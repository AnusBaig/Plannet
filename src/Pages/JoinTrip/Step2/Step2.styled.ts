import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";

const Step2WrapperStyled = styled.div`
  ${sectionStep}
`;

const Step2ButtonStyled = styled.div`
  text-align: center;
  display: flex;
  margin-top: 30px;
  justify-content: center;
`;

const Step2ButtonsStyled = styled.div`
  ${stepSectionButtonsStyled}
`;

export { Step2WrapperStyled, Step2ButtonsStyled, Step2ButtonStyled };
