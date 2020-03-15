import styled from "@emotion/styled/macro";
import { ButtonStyled } from "src/Components/Button/Button.styled";
import { colors } from "src/shared/styles/colors";

const DateInlineWidgetStyled = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const LabelStyled = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.75;
  letter-spacing: 0.13px;
  color: ${colors.cerulean};
`;

const ValueStyled = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  color: ${colors.charcoalGrey};
`;

const ButtonWrapperStyled = styled.div`
  ${ButtonStyled} {
    padding: 3px 12px;
    line-height: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.38;
    letter-spacing: 0.15px;
  }
`;

export {
  DateInlineWidgetStyled,
  LabelStyled,
  ValueStyled,
  ButtonWrapperStyled
};
