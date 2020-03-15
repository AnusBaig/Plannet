import React, { useCallback, useState } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/arrow-left.svg";
import { ReactComponent as WarningIcon } from "src/shared/assets/warning.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel.svg";
import { ReactComponent as GreenCheckCircle } from "src/shared/assets/green-check-circle.svg";
import RectanguleShadow from 'src/Components/RectanguleShadow';
import {
  ModalContainer,
  ModalWrapper,
  FormStyled,
  ModalTitleStyled,
  ButtonsSectionStyled,
  BackLinkStyled,
  ParagraphStyled,
  SubmitButtonStyled,
  SubmitModalButtonStyled,
  InformationWrapperStyled,
  WelcomeSubtitleStyled,
  WelcomeTitleStyled,
  ErrorStyled,
} from "src/Pages/Modals/Modals.styled";
import useApi from "src/shared/hooks/useApi";
import Footer from "src/Components/Footer";
import Input from "src/Components/Input";
import Heading from "src/Components/Heading";
import { useInput } from "src/shared/hooks/useInput";

const Forgot: React.FC<RouteComponentProps> = () => {
  const { state, dispatch } = useApi("auth/forgotPassword");
  const [showError, setShowError] = useState(true);
  const emailState = useInput();

  const sendForm = useCallback(
    ev => {
      ev.preventDefault();
      const user = {
        email: emailState.value
      };
      setShowError(true);
      dispatch({ type: "FORGOT_PASSWORD", payload: { params: user } });
    },
    [emailState.value, dispatch]
  );

  const goToLogin = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    navigate("/login");
  }, []);

  const canReset = !emailState.error && emailState.dirty;

  return (
    <ModalContainer>
      <ModalWrapper style={{ height: 'calc(100vh - 130px)' }}>
        <BackLinkStyled to="/">
          <ArrowLeftIcon />
          <h5>Back</h5>
        </BackLinkStyled>
        {!state.data.email ?
          <>
            <Heading as="h1" align="center">
              Forgot Password?
          </Heading>
            {state.isError && showError &&
              <ErrorStyled>
                {/* <WarningIcon /> */}
                {state.isError}
                <CancelIcon onClick={() => setShowError(!showError)} />
              </ErrorStyled>
            }
            <FormStyled onSubmit={sendForm}>
              <ParagraphStyled>
                Enter your e-mail address and we’ll send you a link to reset your
                password.
            </ParagraphStyled>
              <Input
                name="email"
                label="E-mail"
                width="550px"
                required
                type="email"
                style={{ marginBottom: 0 }}
                {...emailState}
              />
              <input type="submit" disabled={!canReset} />
            </FormStyled>
            <ButtonsSectionStyled>
              <SubmitButtonStyled
                size="small"
                onClick={goToLogin}
                variant="secondary"
              >
                Cancel
            </SubmitButtonStyled>
              <SubmitButtonStyled
                active
                disabled={!canReset}
                size="small"
                onClick={sendForm}
                glow
              >
                Reset
            </SubmitButtonStyled>
            </ButtonsSectionStyled>
          </>
          :
          <>
            <RectanguleShadow width="400px" column>
              <InformationWrapperStyled>
                <GreenCheckCircle />
                <WelcomeTitleStyled size="large">Success!</WelcomeTitleStyled>
                <WelcomeSubtitleStyled>{state.data.message}</WelcomeSubtitleStyled>
              </InformationWrapperStyled>
              <SubmitModalButtonStyled
                glow
                variant="secondary"
                size="small"
                onClick={sendForm}>
                RESEND EMAIL
            </SubmitModalButtonStyled>
            </RectanguleShadow>
          </>
        }
      </ModalWrapper>
      <Footer />
    </ModalContainer>
  );
};

export default Forgot;
