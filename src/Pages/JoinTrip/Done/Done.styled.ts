import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { ButtonStyled } from "src/Components/Button/Button.styled";
import { colors } from "src/shared/styles/colors";

const DoneWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  min-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-right: inherit;
  box-sizing: border-box;
  background-color: ${colors.white};

  ${mediaQueries.md} {
    background-color: initial;
    align-items: flex-end;
  }
`;

const DoneStyled = styled.div`
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  ${ButtonStyled} {
    width: auto;
    margin: 0 auto;
  }
`;

const CheckCircleStyled = styled.div`
  text-align: center;
  padding-bottom: 40px;
`;

export { DoneWrapperStyled, DoneStyled, CheckCircleStyled };
