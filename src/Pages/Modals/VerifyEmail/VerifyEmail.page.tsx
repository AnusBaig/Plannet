import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import useApi from "src/shared/hooks/useApi";
import RectanguleShadow from 'src/Components/RectanguleShadow';
import Fallback from "src/Components/Fallback";
import { useAuth } from "src/Providers/Auth";
import { ReactComponent as PlaneCircle } from "src/shared/assets/plane-circle.svg";
import { ReactComponent as CheckCircle } from "src/shared/assets/check-circle.svg";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/arrow-left.svg";
import {
  ModalContainer,
  ModalWrapper,
  BackLinkStyled,
  SubmitButtonStyled,
  InformationWrapperStyled,
  WelcomeTitleStyled,
  WelcomeSubtitleStyled
} from "src/Pages/Modals/Modals.styled";
import Footer from "src/Components/Footer";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

type RouteProps = RouteComponentProps & {
  token?: string;
  email?: string;
};

const VerifyEmail: React.FC<RouteProps> = ({ token, email }) => {
  const verifyEmailEndpoint = useApi(`auth/emailAddressVerification/${token}/${email}`, "get");
  const resendVerifyEmailEndpoint = useApi("auth/resendEmailVerification");
  const [pathN, setPath] = useState('/signup')
  const { isLoggedIn, logout, currentUser } = useAuth();
  const mdScreen = useMediaQuery("MD");

  const handleRedirectToLogin = useCallback(() => {
    navigate("/login");
  }, []);

  const handleResendEmail = useCallback(() => {
    resendVerifyEmailEndpoint.dispatch({ type: "RESEND_VERIFY_EMAIL", payload: { params: { email } } });
  }, [resendVerifyEmailEndpoint, email]);

  const mediumScreen = useMediaQuery("MD");


  useEffect(() => {
    window.onpopstate  = () => {
      logout()
      window.location.pathname = pathN
    }
  })

  useEffect(() => {
    if (token === '0') { return; }

    verifyEmailEndpoint.dispatch({ type: "VERIFY_EMAIL", payload: { params: null } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyEmailEndpoint.dispatch, token]);

  if (token === '0' || resendVerifyEmailEndpoint.state.data.token) {
    return (
      <ModalContainer>
        <ModalWrapper style={{ height: 'calc(100vh - 156px)' }}>
          <BackLinkStyled to="/">
            <ArrowLeftIcon />
            <h5>Back</h5>
          </BackLinkStyled>
          <RectanguleShadow width="400px" column>
            <InformationWrapperStyled>
              <PlaneCircle />
              <WelcomeTitleStyled>Verify your email</WelcomeTitleStyled>
              <WelcomeSubtitleStyled>
                <p>We sent an email to {email}. Please verify your account!</p>
                <p>Can’t find our email? Be sure to check your spam folder.</p>
              </WelcomeSubtitleStyled>
            </InformationWrapperStyled>
          </RectanguleShadow>
          <SubmitButtonStyled
            glow
            size="small"
            onClick={handleResendEmail}
            disabled={resendVerifyEmailEndpoint.state.isLoading}>
            Resend Email
          </SubmitButtonStyled>
        </ModalWrapper>
        <Footer />
      </ModalContainer>
    )
  }

  if (verifyEmailEndpoint.state.isError) {
    console.log(mediumScreen);

    return (
      <ModalContainer 
    
      >
        <ModalWrapper>
          <BackLinkStyled to="/">
            <ArrowLeftIcon />
            <h5>Back</h5>
          </BackLinkStyled>
          <RectanguleShadow width="400px" column>
            <InformationWrapperStyled>
              <WelcomeTitleStyled>Verification failed.</WelcomeTitleStyled>
              <br />
              <WelcomeSubtitleStyled>
                The email link might have been expired. <br />Click the button below to restart the verification process.
              </WelcomeSubtitleStyled>
            </InformationWrapperStyled>
          </RectanguleShadow>
          <SubmitButtonStyled
            glow
            size="small"
            onClick={handleResendEmail}
            disabled={resendVerifyEmailEndpoint.state.isLoading}>
            Resend Email
          </SubmitButtonStyled>
        </ModalWrapper>
      </ModalContainer>
    );
  }

  if (verifyEmailEndpoint.state.data && verifyEmailEndpoint.state.data.isEmailVerified) {
    return (
      <div>
      <ModalContainer 
       style={!mediumScreen ? {height:  'calc(100vh - 156px)', minHeight: "80vh"} : {height:  'calc(100vh - 220px)', minHeight: "80vh"}}
      >
        <ModalWrapper>
          <BackLinkStyled to="/">
            <ArrowLeftIcon />
            <h5>Back</h5>
          </BackLinkStyled>
          <RectanguleShadow 
          width={!mdScreen ? "50%" : "400px"} column>
            <InformationWrapperStyled>
              <CheckCircle />
              <WelcomeTitleStyled 
              style={!mdScreen ? {fontSize: "35px"} : {} }
              >Welcome {verifyEmailEndpoint.state.data.firstName}!</WelcomeTitleStyled>
              <WelcomeSubtitleStyled
              style={!mdScreen ? {fontSize: "25px"} : {} }
              
              >Thank you for verifying your email.</WelcomeSubtitleStyled>
            </InformationWrapperStyled>
          </RectanguleShadow>
          <SubmitButtonStyled
            glow
            size="small"
            style={{marginTop: mdScreen ? "10%" : "5%"}}
            onClick={handleRedirectToLogin}>
            Login
          </SubmitButtonStyled>
        </ModalWrapper>
      </ModalContainer>
    <Footer />
      </div>

    );
  }

  return (
    <ModalContainer>
      <ModalWrapper>
        <Fallback />
      </ModalWrapper>
    </ModalContainer>
  )
};

export default VerifyEmail;
