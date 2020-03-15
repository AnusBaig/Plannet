import React, { useCallback } from "react";
import dayjs from "dayjs";
import { StepProps } from "@dimelo/jointrip";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import {
  Step1WrapperStyled,
  Step1ContentStyled,
  Step1FooterStyled,
  Step1ButtonsStyled,
  TripsListStyled,
  IndexStyled,
  TripCityDiv,
  TripCityTextDiv,
  TripGuestDiv,
  TripGuestTextDiv,
  MainDiv,
  DateStyled,
  LocationTagStyled,
  LocationStyled,
} from "./Step1.styled";
import { ReactComponent as User } from "src/shared/assets/user.svg";
import { ReactComponent as LocationIcon } from "src/shared/assets/shape.svg";


const Step1: React.FC<StepProps> = data => {
  const { newTrip, handleNext } = data;

  const goToStep2 = useCallback(() => {
    handleNext("Step2");
  }, [handleNext]);

  const goToStep3 = useCallback(() => {
    handleNext("Step3");
  }, [handleNext]);
  const midiumScreen = useMediaQuery("MOBILE");
  
  const smallScreen = useMediaQuery("SM");
  console.log(smallScreen);

  console.log(midiumScreen);
  if (!newTrip) return null;
  return (
    // <div
      // style={!midiumScreen ? {height: "84vh"} : {}}
    // >
    <>
      <Heading as="h1" width="100%" align="center">
        {newTrip.name}
      </Heading>
      <Step1FooterStyled>
        <Step1ButtonsStyled>
          <Button
            onClick={goToStep3}
            active
            width="240px"
            style={{ marginBottom: "20px" }}
          >
            confirm details
          </Button>
          <Button onClick={goToStep2} width="240px" style={{ backgroundColor: 'transparent', color: 'blue', border: 0, textTransform: 'capitalize' }}>
            Suggest New Details
          </Button>
        </Step1ButtonsStyled>
      </Step1FooterStyled>
      <Step1WrapperStyled 
      style={midiumScreen ? {border: "none", margin: "auto", width: smallScreen ? "100%" : "", maxHeight: "200vh", padding: 0} : {maxHeight: "50vh"}}
      >
        <Step1ContentStyled
        style={midiumScreen ? {padding: 0} : {}}
        >
          <TripsListStyled>

            <MainDiv>
              <h3 style={{fontSize: "22px", fontWeight: 500, padding: '10px', fontFamily: "Quicksand",     borderBottom: '1px solid #8080805c' }}>
                Locations & Dates
              </h3>
              <TripCityDiv style={midiumScreen ? {border: "none", height: "auto", maxHeight: "50vh", overflow: "auto", width: "100%" } : {maxHeight: "35vh", overflow: "auto"}}>
                {newTrip.tripLegs &&
                  newTrip.tripLegs.map((leg, index) => (
                    <TripCityTextDiv  >
                        <LocationIcon style={{paddingLeft: "10px"}} />
                      <div style={{ marginLeft: 20 }}>
                        <DateStyled>
                          <span>{leg.startDate ? new Date(leg.startDate).toLocaleDateString() : ""}</span> - <span>{leg.endDate ? new Date(leg.endDate).toLocaleDateString() : ""}</span>
                        </DateStyled>
                        <LocationTagStyled>LOCATION</LocationTagStyled>
                        <LocationStyled>{leg.location ? leg.location : ""}</LocationStyled>
                      </div>
                    </TripCityTextDiv>
                  ))}
              </TripCityDiv>
            </MainDiv>

            <MainDiv>
              <h3 style={{fontSize: "22px", fontWeight: 500, padding: '10px', fontFamily: "Quicksand",     borderBottom: '1px solid #8080805c' }}>
                Travelers
              </h3>
              <TripGuestDiv
              style={midiumScreen ? {padding: 0,  border: "none", maxHeight: "50vh", overflow: "auto"} : {maxHeight: "35vh", overflow: "auto"}}
              >
                {newTrip && newTrip.tripGuests ?
                  newTrip.tripGuests.map((value, index) => {
                    return (
                      <TripGuestTextDiv>
                        <div><User width="50px" /></div>
                        <div>{value.firstName + " " + value.lastName}</div>
                      </TripGuestTextDiv>
                    )
                  })
                  : null}
              </TripGuestDiv>
            </MainDiv>

          </TripsListStyled>
        </Step1ContentStyled>
      </Step1WrapperStyled>
    </>
     
  );
};

export default Step1;
