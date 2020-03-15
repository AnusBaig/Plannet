import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import { querystring } from "src/shared/utils/querystring";
import Footer from "src/Components/Footer";
import Input from "src/Components/Input";
import InputPassword from "src/Components/InputPassword";
import Heading from "src/Components/Heading";
import useApi from "src/shared/hooks/useApi";
import Fallback from "src/Components/Fallback";
import {
  ModalContainer,
  ModalWrapper,
  FormStyled,
  LoginText,
  ForgotText,
  BackLinkStyled,
  SubmitButtonStyled,
  ErrorStyled
} from "src/Pages/Modals/Modals.styled";
import { useInput } from "src/shared/hooks/useInput";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/arrow-left.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { ReactComponent as WarningIcon } from "src/shared/assets/warning.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel.svg";

const Login: React.FC<RouteComponentProps> = () => {
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useApi("auth/login");
  const { isLoading, isError } = state;
  const emailState = useInput();
  const passwordState = useInput();
  const smallScreen = useMediaQuery("SM");
  const [error, setError]  = useState(false);

  const sendForm = useCallback(
    ev => {
      ev.preventDefault();
      const user = {
        email: emailState.value,
        password: passwordState.value
      };

      dispatch({ type: "LOGIN", payload: { params: user } });
    },
    [dispatch, emailState.value, passwordState.value]
  );

  useEffect(() => {
    const redirect = querystring("redirect");

    if (isLoggedIn) {
      redirect ? navigate(redirect) : navigate("/my-trips");
    }

    if (isError) {
      //TODO: Show actual modal error
      // alert(isError);
      setError(true);
    }
  }, [isError, isLoggedIn]);

  const canLogin =
    !emailState.error &&
    emailState.dirty &&
    !passwordState.error &&
    passwordState.dirty;

  return (
    <ModalContainer>
      <ModalWrapper style={{ height: "calc(100vh - 50px)" }}>
        {isLoading && <Fallback />}
        <BackLinkStyled to="/">
          <ArrowLeftIcon />
          <h5>Back</h5>
        </BackLinkStyled>
        <Heading as="h1" align="center">
          Welcome Back!
        </Heading>
        {error && (
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
            {"email or password is incorrect"}
              <CancelIcon onClick={() => setError(false)} style={{ alignSelf: "flex-start" }} /> 
          </ErrorStyled>
        )}
        <FormStyled onSubmit={sendForm} noValidate>
          <Input
            name="email"
            label="EMAIL"
            width="550px"
            type="email"
            style={{ zIndex: 4 }}
            required
            {...emailState}
          />
          <InputPassword
            name="password"
            label="PASSWORD"
            width="550px"
            type="password"
            style={{ zIndex: 4 }}
            required
            {...passwordState}
          />
          <input type="submit" disabled={isLoading || !canLogin} />
          <ForgotText to="/forgot">Forgot password?</ForgotText>
          <LoginText>
            Don’t Have an account?{" "}
            <Link to={"/signup" + window.location.search}>Sign Up</Link>
          </LoginText>
        </FormStyled>
        <SubmitButtonStyled
          glow
          active
          onClick={sendForm}
          size="small"
          disabled={isLoading || !canLogin}
          style={smallScreen ? { width: "100%", padding: "10px" } : {}}
        >
          Login
        </SubmitButtonStyled>
      </ModalWrapper>
      <Footer />
    </ModalContainer>
  );
};

export default Login;
