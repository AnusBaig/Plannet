import React from "react";
import {
  FooterStyled,
  LogoContainer,
  LinksContainer,
  LinkButton
} from "./Footer.styled";
// import { ReactComponent as Logo } from "src/shared/assets/logo-dark.svg";
import { ReactComponent as Logo } from "src/shared/assets/footer-plannet.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Footer: React.FC = () => {

  
  return (
    <FooterStyled>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LinksContainer>
        <LinkButton to="/terms">Terms &amp; Conditions</LinkButton>
        <LinkButton to="/policy">Privacy Policy</LinkButton>
      </LinksContainer>
      <LinksContainer>
        <LinkButton to="/">© {new Date().getFullYear()} Plannet</LinkButton>
      </LinksContainer>
    </FooterStyled>
  );
};

export default Footer;
