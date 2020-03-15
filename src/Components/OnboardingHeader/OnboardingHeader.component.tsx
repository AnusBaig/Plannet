import React, { useCallback } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import { ReactComponent as Logo } from "src/shared/assets/logo-dark.svg";
import { ReactComponent as HamburgerIcon } from "src/shared/assets/hamburger.svg";
import { ReactComponent as HelpIcon } from "src/shared/assets/help.svg";
import AvatarURL from "src/shared/assets/maya.png";
import {
  OnboardingHeaderStyled,
  OnboardingHeaderWrapper,
  BrandStyled,
  LogoContainer,
  MenuIconStyled,
  HelpIconStyled,
  AvatarStyled,
} from "./OnboardingHeader.styled";

const Footer: React.FC<RouteComponentProps> = ({
  children,
}) => {
  const goToHome = useCallback(() => navigate("/"), []);
  const { isLoggedIn, logout, currentUser } = useAuth();
  const userName = (currentUser && currentUser.firstName) || "";

  return (
    <>
      <OnboardingHeaderStyled>
        <OnboardingHeaderWrapper>
          <MenuIconStyled>
            <HamburgerIcon />
          </MenuIconStyled>
          <BrandStyled>
            <LogoContainer onClick={goToHome}>
              <Logo />
            </LogoContainer>
          </BrandStyled>
          <AvatarStyled src={AvatarURL} />
          <HelpIconStyled>
            <HelpIcon />
          </HelpIconStyled>
        </OnboardingHeaderWrapper>
      </OnboardingHeaderStyled>
      { children }
    </>
  );
};

export default Footer;
