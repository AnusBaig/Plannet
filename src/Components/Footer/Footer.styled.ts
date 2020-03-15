import styled from "@emotion/styled/macro";
import { Link } from "@reach/router";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";

const FooterStyled = styled.footer`
  height: 100%;
  max-height: 30vh;

  ${mediaQueries.md} {
    height: 7vh;
    padding: 10px;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 -3px 9px 0 rgba(68, 68, 68, 0.1);
  background: ${colors.white};
  
  ${mediaQueries.mobile} {
    // height: 80px;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }


  ${mediaQueries.mobile} {
    
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #292c36;

  ${mediaQueries.xs} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const LinkButton = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: ${colors.darkGrey1};
  cursor: pointer;
  text-decoration: none;
  margin: 14px 20px;

  ${mediaQueries.md} {
    font-size: 16px;
  }
`;

export { FooterStyled, LogoContainer, LinksContainer, LinkButton };
