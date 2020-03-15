import React, { useCallback } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import { ReactComponent as Logo } from "src/shared/assets/logo-dark.svg";
import {
  NavStyled,
  NavStyledWrapper,
  BrandStyled,
  LinkButton,
  LogoContainer,
  Button
} from "./Nav.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Footer: React.FC<RouteComponentProps> = ({
  children,
}) => {
  const goToHome = useCallback(() => navigate("/"), []);
  const { isLoggedIn, logout, currentUser } = useAuth();
  const userName = (currentUser && currentUser.firstName) || "";
  const smallScreen = useMediaQuery("SM");
  return (
    <>
      <NavStyled>
        <NavStyledWrapper>
          <BrandStyled>
            <LogoContainer 
            style={smallScreen ? {paddingTop: "8px"} : {}}
            onClick={goToHome}>
              <Logo 
              style={smallScreen ? {width: "80px", display: "flex", alignItems:"center"} : {} }
              />
            </LogoContainer>
          </BrandStyled>
          {!isLoggedIn && (
            <>
              <LinkButton to="/signup">Sign Up</LinkButton>
              <LinkButton to="/login">Login</LinkButton>
            </>
          )}
          {isLoggedIn && (
            <>
              <span>Hi, {userName}</span>
              <Button onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </NavStyledWrapper>
      </NavStyled>
      { children }
    </>
  );
};

export default Footer;
