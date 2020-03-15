import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const MainDiv = styled.div`
  width: 100%;
  border-radius: 4px;
`;
const NavMainDiv = styled.div`
  width: 100%;
  min-height: 60px;
  padding-top: 32px;
`;
const NavBarDiv = styled.div`
  width: 80%;
  max-width: 500px;
  margin: 0px auto;
  display: flex;
  justify-content: space-around;
  ${mediaQueries.mobile} {
    width: 90%;
  
  }
`;
const Nav = styled.button`
  // width: 28%;
  min-height: 24px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  color: #292c36;
  outline: none;
  background: transparent;
  border: none;
  letter-spacing: normal;
`;
const ConatinMainDiv = styled.div`
  // max-width: 1078px;
  max-width: 100%;
  border-radius: 4px;
  border: solid 1px #e5e7e9;
  margin: 0px 32px;
  background-color: #ffffff;
  ${mediaQueries.mobile} {
    padding: 0px 32px 32px;
    margin: 0;
  }
`;
const ContainDiv1 = styled.div`
 max-width: 812px;
  min-height: 90px;
  padding-top: 36px;

  border-radius: 4px;
  margin: 0px auto;
`;
const ConatinDiv1TextDiv = styled.p`
  width: 100%;
  margin: auto 0px;
  font-family: Quicksand;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #292c36;
  ${mediaQueries.mobile} {
    font-size: 19px;
  }
`;
const ConatinDiv1SmallTextDiv = styled.p`
 max-width: 348px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  padding-top: 5px;
  color: #292c36;
  ${mediaQueries.mobile} {
    width: 100%;
    font-size: 12px;    
  }
`;

const ContainDiv2 = styled.div`
  // min-height: 117px;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px #dadada;
  background-color: #ffffff;
`;
const ContentDiv2DateDiv = styled.div`
 max-width: 329px;
 min-height: 45px;
 ${mediaQueries.sm}{
   min-height: 24px;
   display: inline-block;
  }
  display: block;
  font-family: Quicksand;
  font-size: 21px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.5px;
  color: #292c36;
`;
const ContainDiv2OriginDiv = styled.p`
 max-width: 240px;
  min-height: 24px;
  min-width : 200px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  // line-height: 1.14;
  letter-spacing: 0.12px;
  color: #292c36;
  // margin: 24px 0;
  display: block;
    margin-bottom: 0;
    // margin-top: 10px;
  ${mediaQueries.sm}{
    // margin-top: 24px;
    padding-top: 0px;
    display: inline-block;
  }
`;
const ContainDiv2Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: unset;
  ${mediaQueries.sm} {
    align-items: flex-start;
    flex-direction: row;
  }
  & > svg { 
    // position: relative;
    // left: 80%;
    // top: -104px;
    padding : 0;
    ${mediaQueries.sm}{
      left: 0%;
    top: 0px;
    }
  }
`
const ContainDiv2DestinationDiv = styled.p`
 max-width: 240px;
  min-height: 24px;
  margin-left: 20px;
  ${mediaQueries.mobile}{
    margin-left : 0px
  }
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #292c36;
  margin: 24px 0;
  display: inline-block;
`;
const ContainDiv2FlightDetailDiv = styled.div`
 max-width: 67px;
  min-height: 20px;
  opacity: 0.4;
  border-radius: 2px;
  background-color: #a7e5ff;
  display: inline-block;
`;
const ContainDiv2AddFlightDetails = styled.div`
  //max-width: 129px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;

  display: inline-block;
  color: #1285d8;
  cursor: pointer;
  // margin-left: -150px;
  ${mediaQueries.sm}{
    margin-left: 0px;
  }
`;
const ContainDiv2ActionCon = styled.div`

`
const ContainDiv2SearchFilterButton = styled.button`
min-height: 48px;
cursor : pointer;
border-radius: 4px;
border : none;
background-color: #1285d8;
font-family: Quicksand;
font-size: 16px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: 0.1px;
text-align: center;
color: #fafbfd;
width: 100%;
float: right;

margin : 10px 5px;
${mediaQueries.sm}{
  max-width: 124px;
    width: auto;
    min-height: 32px;
    font-size: 12px;

    margin : 0px 0px;
  }
`;

const ContainDiv2FlightDetailErrorDiv = styled.span`
 max-width: 185px;
 padding: 2px 0;
  min-height: 24px;
  border-radius: 18px;
  background-color: #feeded;
  float: left;
  ${mediaQueries.sm}{
    float: right;
  }
`;
const ContainDiv2FlightDetailErrorTextDiv = styled.span`
  padding: 0px 11px;
  font-family: Quicksand;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #f85353;
`;
const YellowInfoIcon = styled.span`
  width: 16px;
  height: 16px;
  padding: 4px;
  text-align: center;
  font-size: 18px;
  border-radius: 50%;
  background: yellow;
  color: black;
  display: inline-block;
  font-weight: bold;
  padding-bottom: 7px;
  padding-top: 2px;
`;

const RedInfoIcon = styled.span`
  width: 16px;
  height: 16px;
  padding: 2px;
  margin-left: 6px;
  margin-top: 1px;
  text-align: center;
  font-size: 14px;
  border-radius: 50%;
  background: #f85353;
  color: white;
  display: inline-block;
  font-weight: bold;
  padding-bottom: 3px;
`;

const TravelDetailExpensionDiv = styled.div`
  max-width: 100%;
  min-height: 134px;
  border-radius: 4px;
  padding: 24px;
  padding-bottom: 0px;
  background-color: #e8f8ff;
`;
const TravelDetailExpensionTextDiv = styled.div`
//  max-width: 180px;
//  width: 120px;
  min-height: 16px;
  margin: 4px 0px;
  font-family: Quicksand;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #292c36;
`;

const TravelDetailExpensionTextDivLink = styled.div`
 max-width: 180px;
 width: 120px;
  min-height: 16px;
  margin: 4px 0px;
  font-family: Quicksand;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #0088e4;
`;
const TravelDetailExpensionSmallTextDiv = styled.div`
//  max-width: 180px;
//  width: 120px;
  min-height: 16px;
  font-family: Quicksand;
  margin: 4px 0px;
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: 0.08px;
  color: #585858;
`;

const EditButton = styled.button`
  // position: relative;
  // right: -95%;
  margin-right: 10px;
  background: none;
  border: none;
 max-width: 26px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #1285d8;
  outline: none;
  cursor: pointer;
`;

const EditButtonPlaces = styled.button`
  position: relative;
  right: 10%;
  background: none;
  border: none;
 max-width: 26px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #1285d8;
  outline: none;
  cursor: pointer;
`;

const TravelersContainDiv1 = styled.div`
 max-width: 812px;
  min-height: 90px;
  padding-top: 36px;

  border-radius: 4px;
  // margin: 0px auto;
`;
const TravelerContainDiv2 = styled.div`
// width: 812px;
  min-height: 117px;
  ${mediaQueries.sm}{
    height: auto
  }
  // max-height 476px;
  padding : 24px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px #dadada;
  background-color: #ffffff;
`;
const IFrame = styled.iframe`
  border: 0;
  overflow: auto;
  width: 100%;
  min-height: 80vh;
`;

export {
  MainDiv,
  NavBarDiv,
  NavMainDiv,
  Nav,
  ConatinMainDiv,
  ContainDiv1,
  ConatinDiv1TextDiv,
  ConatinDiv1SmallTextDiv,
  ContainDiv2,
  ContentDiv2DateDiv,
  ContainDiv2OriginDiv,
  ContainDiv2DestinationDiv,
  ContainDiv2FlightDetailDiv,
  ContainDiv2AddFlightDetails,
  ContainDiv2SearchFilterButton,
  ContainDiv2FlightDetailErrorDiv,
  ContainDiv2FlightDetailErrorTextDiv,
  YellowInfoIcon,
  RedInfoIcon,
  TravelDetailExpensionDiv,
  TravelDetailExpensionTextDiv,
  TravelDetailExpensionTextDivLink,
  TravelDetailExpensionSmallTextDiv,
  EditButton,
  EditButtonPlaces,
  TravelersContainDiv1,
  TravelerContainDiv2,
  IFrame,
  ContainDiv2Container,
  ContainDiv2ActionCon
};
