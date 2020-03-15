import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const OnboardingHeaderStyled = styled.nav`
  height: 72px;
  box-shadow: 0 1px 0 0 ${colors.darkGrey4};
  background-color: ${colors.white};
`;

const OnboardingHeaderWrapper = styled.div`
  ${sectionMargin}

  
  box-sizing: border-box;
  height: 80px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    cursor: pointer;
  }

 
  ${mediaQueries.md} {
    // padding: 0 12%;
  }
  ${mediaQueries.sm} {
    // padding: 0 20;
}




padding-left: 3%;
    padding-right: 3%;


  }
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

const MenuIconStyled = styled.div`
  margin-right: 28px;
`;

const HelpIconStyled = styled.div`
  margin-right: 36px;
`;

const AvatarStyled = styled.img`
width: 80px;
    left: 50%;
    top: 100px;
    position: absolute;
    transform: translate(-50%, -11%);
    ${mediaQueries.sm} {
      top: 50px;
    }
    `;

export {
  OnboardingHeaderStyled,
  OnboardingHeaderWrapper,
  BrandStyled,
  LogoContainer,
  MenuIconStyled,
  HelpIconStyled,
  AvatarStyled,
};
