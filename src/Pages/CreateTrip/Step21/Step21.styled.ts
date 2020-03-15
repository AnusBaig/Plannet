import styled from "@emotion/styled/macro";
import { sectionStep, stepSectionButtonsStyled } from "src/shared/styles/step";

const Step21WrapperStyled = styled.div`
  ${sectionStep}
`;

const Step21ButtonsStyled = styled.div`
  ${stepSectionButtonsStyled}
`;

const Step21InputWrapperStyled = styled.div`
  text-align: center;
  width: 467px;
  margin: 20px auto;
  max-width: 100%;
`;

export { Step21WrapperStyled, Step21ButtonsStyled, Step21InputWrapperStyled };
