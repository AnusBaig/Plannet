import styled from "@emotion/styled/macro";
import { HeadingStyled } from "src/Components/Heading/Heading.styled";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const Step1WrapperStyled = styled.div`
  width: 80%;
  height: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  box-sizing: border-box;

  ${mediaQueries.sm} {
    padding-top: 10px;
  }
`;

const Step1ContentStyled = styled.div`
  height: 100%;
  width: 100%;
  // display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding:0 10px;
  box-sizing: border-box;

  ${mediaQueries.md} {
    padding:0 20px;
    flex-direction: row;
    align-items: center;
  }
`;

const Step1FooterStyled = styled.div`
  width: 100%
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  ${mediaQueries.md} {
    justify-content: flex-end;
  }
`;

const Step1ButtonsStyled = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LegTripWrapperStyled = styled.div`
  margin-bottom: 30px;
  max-width: 100%;
`;

const WelcomeStyled = styled.div`
  text-align: center;
  color: ${colors.black};
  margin-bottom: 70px;
  flex: 1;

  ${HeadingStyled} {
    color: ${colors.black};
  }

  ${mediaQueries.md} {
    color: ${colors.white};

    ${HeadingStyled} {
      color: ${colors.white};
    }
  }
`;

const TripsListStyled = styled.div`
  height: 100%;
  flex: 1.75;
  display: flex;
  flex-wrap : wrap;
  // flex-direction: column;
  justify-content: space-around;
    // align-items: center;
  max-width: 100%;

  ${mediaQueries.md} {
    // align-items: center;
  }
`;

const TripCityDiv = styled.div`
// padding: 0px 16px;
max-width: 100%;
border-radius: 4px;
border: solid 1px #dadada;
background-color: #ffffff;
&::-webkit-scrollbar {
  width: 3px;
}

 
&::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
`
const TripCityTextDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 0px;
  margin-bottom: -1px;
  border-bottom : 1px solid #e5e7e9
`

const TripGuestDiv = styled.div`
  padding: 0px 16px;
  max-width: 100%;
  border-radius: 4px;
  border: solid 1px #dadada;
  background-color: #ffffff;
  &::-webkit-scrollbar {
    width: 3px;
  }
 
   
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`
const TripGuestTextDiv = styled.div`
  width: 100%;
  padding: 13px 0px;
  margin-bottom: -1px;
  border-bottom : 1px solid #e5e7e9;
  display: inline-flex;
  align-items: center
`
const MainDiv = styled.div`
  margin: 33px;
  width : 42%;
  margin-right : 5px;
${mediaQueries.mobile}{
  width : 100%;
  margin: 10px;
}
`

const DateStyled = styled.p`
  font-family: Quicksand;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`

const IndexStyled = styled.p`
  margin: 0 0 0 16px;
  font-family: Quicksand;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #70d5ff;
`

const LocationTagStyled = styled.p`
  font-family: Quicksand;
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: 0.08px;
  margin-top: 15px;
  color: #585858;
`

const LocationStyled = styled.p`
  font-family: Quicksand;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.12px;
  color: #292c36;
`

export {
  Step1WrapperStyled,
  Step1ContentStyled,
  Step1FooterStyled,
  Step1ButtonsStyled,
  LegTripWrapperStyled,
  WelcomeStyled,
  MainDiv,
  TripsListStyled,
  TripGuestDiv,
  IndexStyled,
  TripGuestTextDiv,
  TripCityDiv,
  TripCityTextDiv,
  DateStyled,
  LocationTagStyled,
  LocationStyled
};
