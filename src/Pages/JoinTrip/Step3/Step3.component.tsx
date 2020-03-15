import React, { useState, useCallback, useEffect } from "react";
import { navigate } from "@reach/router";
import { StepProps } from "@dimelo/jointrip";
import { useAuth } from "src/Providers/Auth";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import AvatarURL from "src/shared/assets/maya.png";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as DottedLineIcon } from "src/shared/assets/dots-menu.svg";
import {
  StepActiveAreaStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled,
  HelpSpeechContainerStyled,
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled
} from "src/Pages/JoinTrip/jointrip.styled";

import {
  Step3WrapperStyled,
  Step3ButtonsStyled,
  Step3InputWrapperStyled,
  InputStyled
} from "./Step3.styled";
import { RectangleStyled, CityNameStyled } from "src/Pages/CreateTrip/Step15/Step15.styled";
import { useInput } from "src/shared/hooks/useInput";
import useApi from "src/shared/hooks/useApi";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";


const Step3: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("/trip/rsvpAddArrivalDeparture", "post");
  const departureCityInput = useInput();
  const arrivalCityInput = useInput();
  const [showArrival, setArrival] = useState<boolean>(false);
  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  const [showArrivalCity, setShowArrivalCity] = useState<boolean>(false);

  const { currentUser } = useAuth();
  const xsScreen = useMediaQuery("XS");

  let cities = newTrip && newTrip.tripLegs ? newTrip.tripLegs : []

  const createTrip = useCallback(params => {
    if (params.tripGuestId && params.departureCity && params.tripId) {

      return dispatch({ type: "JOIN_TRIP", payload: { params } })
    }
  },
    [dispatch]
  );

  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data)
  }, [state.api, state]);

  const setTrip = useCallback(
    (trip) => {
      if (trip.transportationLegs) {
        tripDispatch({ type: "RSVP_ARRIVAL_DEPARTURE", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );
  const goForward = useCallback(() => {
    handleNext('Transportation');
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step1");
  }, [handleBack]);

  const smallScreen = useMediaQuery("SM");

  const handleNextButton = () => {
    let value = arrivalCity

    setDepartureCity(departureCity)
    if (arrivalCity && showArrivalCity && departureCity && newTrip) {
      let tripGuestId = newTrip && newTrip.tripGuests && newTrip.tripGuests.filter((d) => {
        return currentUser && (d.email === currentUser.email)
      }) 
      createTrip({
        tripGuestId: tripGuestId && tripGuestId[0] && tripGuestId[0].id,
        // tripGuestId: '1019',
        tripId: newTrip && newTrip.id,
        // tripId: '902',
        departureCity: departureCity,
        arrivalCity: arrivalCity
      })
    }
    if(showArrival) {
      setShowArrivalCity(true);
      setArrival(false)
    }
      setArrival(true);

    

  };

  if (!newTrip) return null;

  const showArrivalMarkUp = () => {
    return (
      showArrival
        ? (<RectangleStyled
          style={xsScreen ? {display: "flex",flexDirection: "column", justifyContent: "center", width:"90%"} : {display: "flex",flexDirection: "column", justifyContent: "center"}}

        height="68px">
           <p>DEPARTING CITY</p>
            <CityNameStyled color="blue" >
            {departureCity}
          </CityNameStyled>
        </RectangleStyled>)
        : <Input
          // style={xsScreen ? {width: "80%"} : {}}
        {...departureCityInput}
          value={departureCity}
          onChange={(ev: any) => setDepartureCity(ev.target.value)}
          type="autocompleteCities" label="Enter Departing City" />
    )
  }


  return (
    <StepContainerStyled>
      <QuestionStyled 
      style={{marginTop: 0, margin: "50px"}}
      >
        {showArrival ? 'What city will you go home to?' : 'What city will you be departing from?'}
      </QuestionStyled>

      <BackButtonStyled style={smallScreen ? {top: "15%"} : {}} onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <HelpSpeechContainerStyled width="100%" marginBottom="0" style={!xsScreen ? { marginTop: 20 } : {margin: 0, display: "flex"}}>
        <img style={xsScreen ? {alignSelf: "flex-end"} : {}}  src={AvatarURL} />
        <p>This is typically your home city.</p>
      </HelpSpeechContainerStyled>

      <InputStyled style={!xsScreen ? {textAlign: "center"}: {textAlign: "center", width: "90%"}}>
        {showArrivalMarkUp()}

        {cities.map(value => (
          <>
            <DottedLineIcon />
            <RectangleStyled 
          style={xsScreen ? {display: "flex",flexDirection: "column", justifyContent: "center", width:"90%"} : {display: "flex",flexDirection: "column", justifyContent: "center"}}

            >
              <CityNameStyled>
                {value.location}
              </CityNameStyled>
            </RectangleStyled>
          </>
        ))}
        {(showArrival && !showArrivalCity) &&
          (
            <>
              <DottedLineIcon />
              <Input {...arrivalCityInput}
                value={arrivalCity}
                onChange={(ev: any) => setArrivalCity(ev.target.value)}
                type="autocompleteCities" label="Enter Arrival City" />
            </>
          ) 
        }
        {showArrivalCity &&  
        (
          <>
          <DottedLineIcon />
        
        <RectangleStyled
          style={xsScreen ? {display: "flex",flexDirection: "column", justifyContent: "center", width:"90%"} : {display: "flex",flexDirection: "column", justifyContent: "center"}}
        
        height="68px">
        ARRIVAL CITY
          <CityNameStyled color="blue" >
          {arrivalCity}
        </CityNameStyled>
      </RectangleStyled>
      </>
      )
        }

      </InputStyled>

      <Button
        glow
        onClick={() => handleNextButton()}
        width="184px"
        disabled={!departureCity}
        marginBottom="56px"
        marginTop="56px"
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step3;
