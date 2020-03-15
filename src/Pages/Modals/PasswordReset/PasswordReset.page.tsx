import React, { useCallback, useState, useEffect } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import useApi from "src/shared/hooks/useApi";
import {
  ModalContainer,
  ModalWrapper,
  FormStyled,
  ModalTitleStyled
} from "src/Pages/Modals/Modals.styled";

interface PasswordResetProps {
  password?: string;
  confirm?: string;
}

const PasswordReset: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useState<PasswordResetProps>({});
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useApi("auth/resetPassword");
  const { isError } = state;
  const [canResetPassword, setCanResetPassword] = useState(false);

  const handleChange = useCallback(
    ({ target: { value, name } }) => {
      setUser({ ...user, [name]: value });
    },
    [user]
  );

  const sendForm = useCallback(
    ev => {
      ev.preventDefault();
      dispatch({ type: "RESET_PASSWORD", payload: { params: user } });
    },
    [user, dispatch]
  );

  useEffect(() => setCanResetPassword(user.password === user.confirm), [
    setCanResetPassword,
    user.password,
    user.confirm
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/my-trips");
    }

    if (isError) {
      if (isError === "CONFLICT") {
        alert("This is not a valid password!");
      }
    }
  }, [isError, isLoggedIn]);

  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalTitleStyled>
          <Heading as="h1" color="cerulean" align="left">
            Password Reset
          </Heading>
        </ModalTitleStyled>
        <FormStyled onSubmit={sendForm}>
          <Input
            name="password"
            value={(user && user.password) || ""}
            placeholder="Password"
            onChange={handleChange}
            width="550px"
            type="password"
            required
          />
          <Input
            name="confirm"
            value={(user && user.confirm) || ""}
            placeholder="Confirm password"
            onChange={handleChange}
            width="550px"
            type="password"
            required
          />
          <Button
            active
            style={{ alignSelf: "flex-end" }}
            disabled={!canResetPassword}
          >
            Reset Password
          </Button>
        </FormStyled>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default PasswordReset;
