import { Link } from "@reach/router";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import BGModal from "src/shared/assets/bg-white-shape.svg";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { InputStyled } from "src/Components/Input/Input.styled";
import { RectanguleStyled } from 'src/Components/RectanguleShadow/RectanguleShadow.styled';
import Button from "src/Components/Button";

export interface WelcomeTitleStyledProps {
  size?: "small" | "large";
}

const ModalContainer = styled.div`
  width: 100%;
  // height: 100%;
  height: calc(-50px + 100vh);
`;

const ModalWrapper = styled.div`
  background: ${colors.paleGrey} url(${BGModal}) no-repeat top left;
  background-size: 100%;
  background-position-y: bottom;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;

  ${RectanguleStyled} {
    // padding: 32px;
  }

  ${RectanguleStyled} + button {
    margin-top: 16px;
  }

  ${mediaQueries.md} {
    padding: 40px;
  }
`;

const FormStyled = styled.form`
  margin: 1em;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px ${colors.paleGrey2};
  background-color: ${colors.white};
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;

  ${InputStyled} {
    margin-bottom: 20px;
  }

  input[type="submit"] {
    display: none;
  }

  ${mediaQueries.md} {
    width: 400px;
    padding: 35px;
  }
  .css-1if5d6m-InputMaskedFieldStyled{
    z-index:1
  }
  .css-1eqj5cq-InputStyled:focus + label{
    z-index : 1
  }
`;

const ModalTitleStyled = styled.div`
  margin: 1em;
  display: flex;
  align-items: center;
  width: 50%;
`;

const LoginText = styled.div`
  align-self: flex-center;
  color: ${colors.black};
`;

const ForgotText = styled(Link)`
  align-self: flex-start;
  text-decoration: none;
  line-height: 1.38;
  letter-spacing: 0.15px;
  color: ${colors.black};
  margin: -15px 0 24px 0;
  font-weight: normal;
  font-size: 16px;
  z-index: 1;
`;

const ButtonsSectionStyled = styled.div`
  text-align: center;
  button {
    display: inline;
    margin-right: 5px;
  }
  ${mediaQueries.md} {
    display: flex;
  }

`;

const ParagraphStyled = styled.div`
  margin-bottom: 24px;
  color: ${colors.darkGrey1};
`;

const BackLinkStyled = styled(Link)`
  align-self: flex-start;
  font-size: 20px;
  color: ${colors.black};
  position: absolute;
  top: 32px;

  h5 {
    display: inline;
    position: absolute;
    font-size: 14px;
    top: 3px;
    color: ${colors.cerulean};
  }
`;

const SubmitButtonStyled = styled(Button)`
    height: 48px;
    width: 184px;
    padding: 6px;
    text-transform: uppercase;
    margin-top: 16px;
    font-family: 'Quicksand';
    font-size: 16px;
    font-weight: 500;
    // margin-top: 16px;
`;

const SubmitModalButtonStyled = styled(SubmitButtonStyled)`
  align-self: center;
`;

const InformationWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const WelcomeTitleStyled = styled.h2<WelcomeTitleStyledProps>`
  margin: 16px 0 10px 0;
  font-weight: 600;
  color: ${colors.darkGrey1};
  font-size: ${p => p.size === 'large' ? '40px' : '24px'};
`;

const WelcomeSubtitleStyled = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.darkGrey1};
  margin-top: 16px;
  max-width: 320px;

  p:last-child {
    color: ${colors.darkGrey2};
    margin-top: 35px;
  }
`;

const ErrorStyled = styled.div`
  color: #e83030;
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  width: 424px;
  padding: 8px;
  border-radius: 4px;
  background-color: #ffebea;
  margin-top: 24px;
  margin-bottom: 24px;

  svg {
    margin: -3px 7px;
  }

  svg:last-child {
    cursor: pointer;
    position: relative;
    float: right;
    top: 7px;
  }
`;

export {
  ModalContainer,
  ModalWrapper,
  FormStyled,
  ModalTitleStyled,
  LoginText,
  ForgotText,
  ButtonsSectionStyled,
  ParagraphStyled,
  BackLinkStyled,
  SubmitButtonStyled,
  SubmitModalButtonStyled,
  InformationWrapperStyled,
  WelcomeTitleStyled,
  WelcomeSubtitleStyled,
  ErrorStyled,
};
