import styled from "@emotion/styled/macro";
import { Link } from "@reach/router";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const NavStyled = styled.nav`
  // margin-bottom: 10%;
  background-color: ${colors.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
  z-index: 10;
  // z-index: 20;
  position: sticky;
  top: 0;
`;

const NavStyledWrapper = styled.div`
  // ${sectionMargin}
  // margin: 0 32px;
  box-sizing: border-box;
  height: 80px;
  // padding: 0 5%;
  padding: 0 27px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const BrandStyled = styled.span`
  color: ${colors.black};
  flex: 1;
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 0.31px;
`;

const LogoContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const LinkButton = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: ${colors.black};
  margin-left: 30px;
  cursor: pointer;
  text-decoration: none;

  ${mediaQueries.md} {
    font-size: 16px;
  }
`;

const Button = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: ${colors.black};
  margin-left: 30px;
  cursor: pointer;
  text-decoration: none;

  ${mediaQueries.md} {
    font-size: 16px;
  }
`;

export { NavStyled, NavStyledWrapper, BrandStyled, LogoContainer, LinkButton, Button };
