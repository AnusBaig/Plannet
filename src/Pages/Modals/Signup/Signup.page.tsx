import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import Input from "src/Components/Input";
import InputPassword from "src/Components/InputPassword";
import Footer from "src/Components/Footer";
import Heading from "src/Components/Heading";
import useApi from "src/shared/hooks/useApi";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/arrow-left.svg";
import { useInput } from "src/shared/hooks/useInput";
import {
  ModalContainer,
  ModalWrapper,
  FormStyled,
  LoginText,
  BackLinkStyled,
  SubmitButtonStyled,
  ErrorStyled
} from "src/Pages/Modals/Modals.styled";
import MaskedInputComponent from "src/Components/Input/MaskedInput.component";
import { querystring } from "src/shared/utils/querystring";
import { ReactComponent as WarningIcon } from "src/shared/assets/warning.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

interface SignupProps {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const Signup: React.FC<RouteComponentProps> = () => {
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useApi("auth/signup");
  const { isError } = state;
  const firstNameState = useInput();
  const lastNameState = useInput();
  const phoneState = useInput();
  const emailState = useInput();
  const passwordState = useInput();
  const confirmState = useInput();
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const smallScreen = useMediaQuery("SM");

  const sendForm = useCallback(
    ev => {
      ev.preventDefault();

      if(!firstNameState.value) firstNameState.setError(true);
      if(!lastNameState.value) lastNameState.setError(true);
      if(!emailState.value) emailState.setError(true);
     


      if(firstNameState.value && lastNameState.value && emailState.value) {
        const user = {
          firstName: firstNameState.value,
          lastName: lastNameState.value,
          phoneNumber: phoneState.value,
          email: emailState.value,
          password: passwordState.value
        };
        dispatch({ type: "SIGNUP", payload: { params: user } });
      }

    
     
    },
    [
      dispatch,
      firstNameState.value,
      lastNameState.value,
      phoneState.value,
      emailState.value,
      passwordState.value
    ]
  );

  const canSignUp =
    passwordState.value === confirmState.value &&
    !passwordState.error &&
    passwordState.dirty &&
    !emailState.error &&
    emailState.dirty;

  useEffect(() => {
    const redirect = querystring("redirect");
    console.log({ redirect });
    if (isLoggedIn) {
      redirect
        ? navigate(redirect)
        : navigate(`/emailVerification/0/${emailState.value}`);
    }
  }, [isError, isLoggedIn, state.data, emailState.value]);

  
  useEffect(() => {
    if (isError === "CONFLICT") {
      // alert("Email already exists");
      console.log(passwordState.value.length);
      setPasswordError(false);
      setEmailError(false);

      if (passwordState.value.length < 7) setPasswordError(true);
      else setEmailError(true);
      console.log(passwordState);
    }
  }, [isError]);
  return (
    <ModalContainer>
      <ModalWrapper>
        <BackLinkStyled to="/">
          <ArrowLeftIcon />
          <h5>Back</h5>
        </BackLinkStyled>
        <Heading as="h1" align="center" style={{ margin: "32px 0 16px 0" }}>
          Sign Up
        </Heading>
        {(passwordError || emailError) && (
          <ErrorStyled
            style={{
              width: smallScreen ? "90%" : "35%",
              color: "black",
              fontFamily: "Quicksand",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <WarningIcon />
            {emailError
              ? "email already exits"
              : passwordError
              ? "password should be at least 7 charachters long"
              : ""}
            <CancelIcon
              onClick={() => {
                setEmailError(false);
                setPasswordError(false);
              }}
              style={{ alignSelf: "flex-start" }}
            />
          </ErrorStyled>
        )}

        <FormStyled onSubmit={sendForm}>
          <Input
            name="firstName"
            label="FIRST NAME"
            width="550px"
            style={{ zIndex: 4 }}
            required
            {...firstNameState}
            //@ts-ignore
            onBlur={() => {
              if (firstNameState.value == "") {
                firstNameState.setError(true);
              }
            }}
            // errorText={ "should not be empty"}
          />
          <Input
            name="lastName"
            label="LAST NAME"
            width="550px"
            style={{ zIndex: 4 }}
            required
            {...lastNameState}
            //@ts-ignore
            onBlur={() => {
              if (lastNameState.value == "") {
                lastNameState.setError(true);
              }
            }}
          />
          <MaskedInputComponent
            style={{ zIndex: 4 }}
            name="phoneNumber"
            label="PHONE NUMBER"
            width="550px"
            type="tel"
            mask="(999)-999-9999" // this need to be tested
            {...phoneState}
           
          
          />
          <Input
            name="email"
            label="EMAIL"
            width="550px"
            type="email"
            style={
              emailError
                ? { border: "1px solid red", zIndex: 4 }
                : { zIndex: 4 }
            }
            required
            {...emailState}
            onBlur={() => {
              if (emailState.value == "") {
                emailState.setError(true);
              }
            }}
          />
          <InputPassword
            name="password"
            label="PASSWORD"
            width="550px"
            style={
              passwordError
                ? { border: "1px solid red", zIndex: 4 }
                : { zIndex: 4 }
            }
            required
            {...passwordState}
            error={
              passwordState.error || passwordState.value !== confirmState.value
            }
            onBlur={() => {
              if (passwordState.value == "") {
                passwordState.setError(true);
              }
            }}
          />
          <InputPassword
            name="confirm"
            label="CONFIRM PASSWORD"
            // style={{zIndex: 4}}

            required
            {...confirmState}
            error={
              confirmState.error || passwordState.value !== confirmState.value
            }
            errorText={
              confirmState.value.length > 1 &&
              passwordState.value !== confirmState.value
                ? "password should match"
                : ""
            }
            style={
              passwordState.value.length === confirmState.value.length &&
              passwordState.value !== confirmState.value
                ? { border: "1px solid red", zIndex: 0 }
                : { zIndex: 0 }
            }
            onBlur={() => {
              if (confirmState.value == "") {
                confirmState.setError(true);
              }
            }}
          />

          <input type="submit" disabled={!canSignUp} />
          <LoginText>
            Already have an account? <Link to="/login">Log In</Link>.
          </LoginText>
        </FormStyled>
        <SubmitButtonStyled
          glow
          onClick={sendForm}
          size="small"
          active
          disabled={!canSignUp}
        >
          Sign Up
        </SubmitButtonStyled>
      </ModalWrapper>
      <Footer />
    </ModalContainer>
  );
};

export default Signup;
