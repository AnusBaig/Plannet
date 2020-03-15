import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { sectionMargin, sectionPadding } from "src/shared/styles/spacing";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import LandingBG from "./assets/landing-bg.svg";
import SmallLanding from "./assets/landing-sm.svg";
import { inputStylesShared, InputWrapperStyled } from "src/Components/Input/Input.styled";

const LandingWrapper = styled.div``;

const HeroStyled = styled.div`
  background: url(${LandingBG}) center no-repeat;
  background-size: 100%;
  background-position-y: bottom;
  // height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries.md} {
    height: 1024px;
  }
  
  ${mediaQueries.mobile}{
    background: url(${SmallLanding}) bottom no-repeat;
    background-size: 100%;
    width: 100%;    
  }
`;

const HeroTitleStyled = styled.h2`
  ${sectionPadding}

  max-width: 720px;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.13;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${colors.black};
  margin-top: 0;
  margin-bottom: 30px;

  ${mediaQueries.md} {
    font-size: 55px;
    margin-top: 15%;
  }

  ${mediaQueries.lg} {
    margin-top: 5%;
  }

  ${mediaQueries.mobile}{
    margin-top: 140px;
    font-size: 40px;
    }
`;

const HeroButtonsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.md} {
    flex-direction: row;
  }
  margin-bottom: 144px;
`;

const HeroButtonStyled = styled.a`
  box-sizing: border-box;
  height: 48px;
  width: 188px;
  border-radius: 6px;
  background-color: ${colors.cerulean};
  padding-top: 14px;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${colors.paleGrey2};
  margin: 20px 35px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0px 10px 33px -8px ${colors.cerulean};
  font-family: Quicksand;

  ${mediaQueries.md} {
    margin-bottom: 0;
    margin: 60px 35px;
  }
`;

const StepsStyled = styled.div`
  ${sectionMargin}

  padding: 96px 15px;
  padding-bottom: 56px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;

  ${mediaQueries.md} {
    padding: 100px 90px 50px;
  }
`;

const OptinStyled = styled.div`
  background: rgba(232, 248, 255, 0.75);
  padding: 20px 10px;

  ${mediaQueries.md} {
    padding: 100px 75px;
  }
`;

const OptinWrapperStyled = styled.div`
  ${sectionMargin}
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries.mobile}{
    margin: 76px auto;
  }
  ${mediaQueries.md} {
    flex-direction: row;
  }
`;

const OptinFormStyled = styled.div`
  width: 100%;
  padding-right: 0;
  box-sizing: border-box;
  font-size: 16pt;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  color: ${colors.darkGrey1};
  margin-bottom: 2em;
  text-align: center;
  ${mediaQueries.mobile}{
    font-size: 16px;
  }
  ${mediaQueries.md} {
    width: 50%;
    margin-bottom: 0;
    text-align: left;
  }
`;
const OptinTitleStyle = styled.div`
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-align: center;
  color: ${colors.black};
  margin-bottom: 30px;
  text-align: center;
  ${mediaQueries.mobile}{
    font-size: 32px;
    margin-top : 40px
  }
  ${mediaQueries.md} {
    text-align: left;
  }
`;

const OptinImageStyled = styled.img`
  width: 70%;
  padding-left: 0;
  box-sizing: border-box;

  ${mediaQueries.sm} {
    width: 50%;
    margin: 5% auto;
  }

  ${mediaQueries.md} {
    width: 30%;
    margin: 0 10%;
  }
`;

const EmailStyled = styled.div`  
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  ${InputWrapperStyled}{
    width: 340px;
    ${mediaQueries.mobile}{
      margin:auto;
    }
    margin-bottom: 35px !important;
    background: ${colors.white};
  
    }
  input {
    font-family: Quicksand;
    font-size: 14px;
  }
  label {
    font-size: 16px;
    ${mediaQueries.mobile} {
      font-size: 16px;
    }
  }  


  button {
    box-shadow: 0px 10px 33px -8px ${colors.cerulean};
    margin: auto;
    width: 188px;
    // height: 48px;
    text-transform: uppercase;
    font-family: Quicksand;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.25px;
    text-align: center;
    color: ${colors.paleGrey2};
  }

  ${mediaQueries.md} {
    button {
      margin: 0;
      float: left;
    }
  }
`;

const HiringStyled = styled.div`
  ${sectionPadding};

  font-size: 16pt;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: ${colors.darkGrey1};
  margin: 112px 0 128px 0;
  ${mediaQueries.mobile} {
      font-size: 16px;
      margin: 96px 0 128px 0;

  }
  h2 {
    color: ${colors.cerulean};
    margin: 30px auto;
  }
`;

const HiringButtonStyled = styled.a`
  display: block;
  text-decoration: none;
  width: 188px;
  height: 48px;
  border-radius: 6px;
  // background-color: ${colors.cerulean};
  background-color: #1285d8;
  box-sizing: border-box;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  text-align: center;
  color: ${colors.paleGrey2};
  margin: 50px auto 0;
  line-height: 49px;
  box-shadow: 0px 10px 33px -8px ${colors.cerulean};
  text-transform: uppercase;
  font-family: Quicksand;
  font-size: 16px;
  letter-spacing: 0.25px;
`;

const DescriptionStepStyled = styled.div`
  font-size: 16pt;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: #292c36;
  margin-bottom: 70px;
  ${mediaQueries.mobile} {
    font-size: 16pt;
}
  h2 {
    margin-bottom: 48px;
  }
  ${StepsStyled} > p {
    font-size: 30px;
  }

  ${mediaQueries.md} {
    padding: 0 15%;
    font-size: 24px;
    line-height: 30px;
    margin-top: 20px;
  }  
`;

export {
  LandingWrapper,
  HeroStyled,
  HeroTitleStyled,
  HeroButtonsContainerStyled,
  HeroButtonStyled,
  StepsStyled,
  OptinStyled,
  OptinWrapperStyled,
  OptinFormStyled,
  OptinTitleStyle,
  OptinImageStyled,
  EmailStyled,
  HiringStyled,
  HiringButtonStyled,
  DescriptionStepStyled
};
