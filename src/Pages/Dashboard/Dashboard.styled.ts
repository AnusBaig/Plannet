import { ButtonStyled } from "src/Components/Button/Button.styled";
import { HeadingStyled } from "src/Components/Heading/Heading.styled";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { css } from "@emotion/core";
import BGModal from "src/shared/assets/bg-white-shape.svg";
const DashboardWrapperStyled = styled.div`
  // background-color: ${colors.paleGrey};

  `;

const DashboardStyled = styled.div`
  ${sectionMargin};
  background-image: url(${BGModal});
  background-position: bottom;
  background-repeat: no-repeat;
  // min-height: 1650px;
  max-height: auto;
  padding: 1em;
  min-height: 85vh;
  ${mediaQueries.mobile} {
    padding: 0;
  }
`;

const TabsWrapperStyled = styled.nav`
  padding: 25px 0;
  display: inline-block;
  flex-wrap: wrap;
  float: right;
  & > a {
    // font-size: 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: 0.19px;
    text-align: center;
    color: ${colors.charcoalGrey};
    margin-right: 30px;
    text-decoration: none;
    display: inline-block;

    & > hr {
      border: 0;
      border-radius: 2.5px;
      background-color: ${colors.azure};
      min-height: 4px;
      width: 50%;
      margin: 10px 0 0;
    }
  }
`;

const InlineButtonStyled = styled.a`
  text-decoration: none;
  cursor: pointer;
  h5 {
    display: inline;
    position: relative;
    font-size: 14px !important;
    top: -3px;
    color: ${colors.cerulean};
  }
`;

const gridCommon = css`
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;

  & > div {
    width: 100%;
    grid-area: inherit;
    min-height: 400px;

    ${mediaQueries.md} {
      grid-template-columns: 2fr 1.5fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  ${mediaQueries.md} {
    grid-template-columns: 2fr 1.5fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const Grid1Styled = styled.div`
  ${gridCommon}

  & > div {
    ${mediaQueries.md} {
      &:first-of-type {
        grid-area: 1 / 1 / 2 / 2;
        & + div {
          grid-area: 2 / 1 / 3 / 3;
        }
        & + div + div {
          grid-area: 1 / 2 / 2 / 3;
        }
      }
    }
  }
`;

const Grid2Styled = styled.div`
  ${gridCommon}

  & > div {
    ${mediaQueries.md} {
      &:first-of-type {
        grid-area: 1 / 1 / 2 / 3;
        & + div {
          grid-area: 2 / 1 / 2 / 2;
        }
        & + div + div {
          grid-area: 2 / 2 / 3 / 3;
        }
      }
    }
  }
`;

const Grid3Styled = styled.div`
  ${gridCommon}

  & > div {
    ${mediaQueries.md} {
      &:first-of-type {
        grid-area: 1 / 1 / 2 / 2;
        & + div {
          grid-area: 2 / 1 / 2 / 3;
        }
        & + div + div {
          grid-area: 3 / 1 / 4 / 3;
        }
        & + div + div + div {
          grid-area: 1 / 2 / 2 / 2;
        }
      }
    }
  }
`;

const TitleBoxStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
  ${mediaQueries.mobile} {
    margin-top: 12px;
  }

  ${HeadingStyled} {
    width: auto;
  }

  ${ButtonStyled} {
    padding: 3px 12px;
    line-height: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.38;
    letter-spacing: 0.15px;
  }
`;

const CircleStyled = styled.span`
  border: 1px solid ${colors.paleGrey2};
  border-radius: 50%;
  max-width: 24px;
  min-height: 24px;
  display: inline-flex;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.15px;
  color: ${colors.steel};
`;

const ContainWrapperStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: auto;
  width: 100%;
`;

const NoDataWrapperStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.steel};
`;

const DashboardStyleWrapper = styled.div`
  width: 100%;
  margin: 0px auto;
`;

const DashboardOverViewContainer = styled.div`
  width: 100%;
  
  border-radius: 4px;
  box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;
const DashboardTextRectangle = styled.div`
  width: 100%;
  min-height: 72px;
  border-radius: 4px;
  background-color: #e8f8ff;
`;
const TextDiv = styled.div`
  max-width: 137px;
  min-height: 40px;
  padding: 16px 32px;
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
`;
const OverViewContentWraper = styled.div`
  // max-width: 1142px;
  // min-height: 774px;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  ${mediaQueries.mobile} {
    flex-direction: column;
  }
`;
const InnerDiv1 = styled.div`
  // max-width: 614px;
  width: 100%;
  // min-height: 630px;
  padding-left: 32px;
  ${mediaQueries.mobile} {
    padding-left: 0;
  }
`;
const InnerDiv2 = styled.div`
  min-width: 33%;
  // min-height: 630px;
  padding: 0px 32px 32px 32px;
  ${mediaQueries.mobile} {
    padding: 0;
  }
`;
const DetailDivText = styled.div`
  max-width: 550px;
  // min-height: 52px;
  font-family: Quicksand;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  color: var(--D2);
`;
const StrongText = styled.strong`
  font-weigth: bold;
`;
const DetailDiv = styled.div`
  // max-width: 614px;
  min-height: 322px;
  border-radius: 4px;
  border: solid 2px #dadada;
  // background-color: red;
`;
const BudgetDiv = styled.div`
  // max-width: 614px;
  min-height: 276px;
  margin: 32px 0px;
  border-radius: 4px;
  border: solid 2px #dadada;
  // background-color: blue;
`;
const ChatDiv = styled.div`
  max-width: 432px;
  min-height: 630px;
  border-radius: 4px;
  border: solid 1px red;
  background-color: green;
`;
const LinkText = styled.strong`
  font-weight: 600;
  color: #0f7ef5;
`;
const DetailDivSmallText = styled.div`
  max-width: 550px;
  // min-height: 52px;
  // padding: 0px 33px 0px 32px;
  // font-family: Quicksand;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  // text-align: center;
  color: grey;
`;
const ProgressStyleDiv = styled.div`
  // max-width: 542px;
  // min-height: 48px;
  // padding: 0px 33px 0px 32px;
`;
const BudgetTextDiv1 = styled.span`
  max-width: 82px;
  min-height: 32px;
  // padding: 0px 33px 0px 32px;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: var(--D1);
`;
const BudgetTextDiv2 = styled.span`
  max-width: 201px;
  float: right;
  min-height: 16px;
  // padding: 0px 33px 0px 32px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #1285d8;
`;
const D1Div = styled.div`
  text-align: center;
  margin-top: 63px;
`;
const BudgetValueDiv = styled.div`
  min-width: 94%;
  // padding: 0px 80px 0px 80px;
  text-align: center;
`;
const BudgetValue = styled.span`
  min-width: 17%;
  min-height: 32px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #bfbfbf;
  display: inline-block;
  margin: 0px !important;
`;

const SVGBottomTextContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  ${mediaQueries.mobile} {
    // background-color: gray; 
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }
`;

const SVGBottomText = styled.li`
  // max-width: 48px;
  // min-height: 16px; 
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  ${mediaQueries.mobile} {
    font-size: 16px;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  width: 100%; 
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  ${mediaQueries.mobile} {
    flex-direction: column;
  }
`;

const OverviewProcess = styled.div`
  display: flex; 
  flex-direction: column;
  margin-left: 10px;

  ${mediaQueries.mobile} {
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const ProgressBarProcess = styled.div`
  width: 22px;
  height: 22px;
  background-color: #dadada;
  border-radius: 100%;
  border: 4px solid #dadada;
  margin-right: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  z-index: 1;
  ${mediaQueries.mobile} {
    margin-left: 10px;
    margin-right: 10px;
  }
    
  &.active {
    width: 15px;
    height: 15px;
    border: 8px solid #6bc3ff;
    background-color: #fff;
    z-index: 1;
  }
  
  &.completed {
    background-color: #6bc3ff;
    font-size: 20px;
    color: blue;
    border-color: #6bc3ff;
    z-index: 1;
  }
`;

const ProgressLine = styled.div`
  border: 1px solid #dadada; 
  position: absolute; 
  top: 15px;
  left: 45px;
  right: 45px;
  // width: calc(100% - 75px);

  ${mediaQueries.mobile} {
    top: 15px;
    bottom: 20px;
    left: 35px;
    right: unset;  
  }
`;

const SpentValue = styled.span`
  min-width: 17%;
  min-height: 32px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #bfbfbf;
  display: inline-block;
  margin: 0px !important;
`;
const DetailInnerDiv = styled.div`
  padding: 32px;
  ${mediaQueries.mobile} {
    padding: 10px;
  }
`;
const RemaningValue = styled.span`
  min-width: 17%;
  min-height: 32px;
  font-size: 24px;
  font-weight: 550;
  display: inline-block;
  margin: 0px !important;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #0f7ef5;
`;
const SignSpan = styled.span`
  min-width: 4%;
  // min-height: 32px;
  display: inline-block;
  margin: 0px !important;

  padding: 0px 15px 0px 15px;
  ${mediaQueries.mobile} {
    padding: 0px 3px 0px 3px;
  }
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #bfbfbf;
`;
const BudgetSmallTextSpan = styled.span`
  min-width: 17%;
  display: inline-block;
  margin: 0px !important;
  font-size: 10px;
  text-align: left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #585858;
`;

const TripNameHeading = styled.p`
  min-height: 64px;
  font-family: Quicksand;
  font-size: 48px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.6px;
  color: var(--D1);
  // border: 2px solid black;
  width: 100%;
  ${mediaQueries.mobile} {
    font-size: 32px;
    line-height: 1.25;
    letter-spacing: -0.5px;
  }
`;
const NavBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 4px;
  border: solid 1px #dadada;
  background-color: #ffffff;
`;
const NavBarHeading = styled.p`
  // max-width: 189px;
  min-height: 40px;
  padding: 16px 32px;
  display: inline-block;
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
`;

const TriplanningMainDiv = styled.div`
  // max-width: 1142px;
  max-width: 100%;
  min-height: auto;
  border-radius: 4px;
  border: solid 1px #dadada;
`;
const TripPlaningMainContainer = styled.div`
  border: solid 1px #dadada;

  // max-width: 1142px;
  max-width: 100%;
  background-color: #ffffff;
`;
const NewFriendButtonDiv = styled.div`
  // max-width: 1142px;
  height: 2vh;
    padding: 32px 0px;
    width: 100%;
    ${mediaQueries.sm}{
      width: 96%;
    }
`;
const StatusPendingTd = styled.span`
width: 91px;
display: inline-block;
min-height: 16px;
  padding: 7px;
  border-radius: 4px;
  background-color: rgb(229,231,233);
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  text-align: center;
  color: #585858;
`;
const StatusJoinedTd = styled.span`
width: 91px;
    display: inline-block;
    min-height: 16px;
    padding: 7px;
    margin-left: auto;
    border-radius: 4px;
    background-color: rgba(42,199,200,0.2);
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  text-align: center;
  color: #008a8a;
`;

const StatusRejectedTd = styled.span`
width: 91px;
display: inline-block;
min-height: 16px;
  padding: 7px;
  border-radius: 4px;
  background-color: rgba(255,140,138,0.2);
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  text-align: center;
  color: #f85353;
`;

export {
  DashboardWrapperStyled,
  DashboardStyled,
  TabsWrapperStyled,
  InlineButtonStyled,
  Grid1Styled,
  Grid2Styled,
  Grid3Styled,
  TitleBoxStyled,
  CircleStyled,
  ContainWrapperStyled,
  NoDataWrapperStyled,
  DashboardOverViewContainer,
  DashboardTextRectangle,
  TextDiv,
  DetailDiv,
  BudgetDiv,
  ChatDiv,
  OverViewContentWraper,
  InnerDiv1,
  InnerDiv2,
  DetailDivText,
  StrongText,
  LinkText,
  DetailDivSmallText,
  ProgressStyleDiv,
  BudgetTextDiv1,
  BudgetTextDiv2,
  BudgetValueDiv,
  BudgetValue,
  SpentValue,
  RemaningValue,
  SignSpan,
  BudgetSmallTextSpan,
  DashboardStyleWrapper,
  TripNameHeading,
  DetailInnerDiv,
  SVGBottomText,
  D1Div,
  NavBarHeading,
  NavBarWrapper,
  TriplanningMainDiv,
  NewFriendButtonDiv,
  TripPlaningMainContainer,
  StatusPendingTd,
  StatusJoinedTd,
  StatusRejectedTd,
  SVGBottomTextContainer,
  OverviewProcess,
  ProgressBarProcess,
  ProgressBar,
  ProgressLine
};
