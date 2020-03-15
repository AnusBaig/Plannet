import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import { TripType } from "src/Providers/Trips/Trip.reducer";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Input from "src/Components/Input";
import AvatarURL from "src/shared/assets/maya.png";
import { useInput } from "src/shared/hooks/useInput";
import {
  CityNameStyled,
  InputStyled,
  RectangleStyled,
  VerticalLineStyled
} from "./Step15.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  HelpSpeechContainerStyled,
  BackButtonStyled
} from "../createtrip.styled";
import useApi from "src/shared/hooks/useApi";

import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as DottedLineicon } from "src/shared/assets/dots-menu.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step15: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/adminAddArrivalDeparture", "post");
  const departureCityInput = useInput();
  const arrivalCityInput = useInput();
  const [showArrival, setArrival] = useState<boolean>(false);
  const [showDeparture, setDeparture] = useState<boolean>(false);
  const [departureCity, setdepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  let cities = newTrip && newTrip.tripLegs ? newTrip.tripLegs : [];
  const smallScreen = useMediaQuery("XS");
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  const createTrip = useCallback(
    params => {
      if (params.tripGuestId && params.departureCity && params.tripId) {
        return dispatch({ type: "CREATE_TRIP", payload: { params } });
      }
    },
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data);
  }, [state.api, state]);
  useEffect(() => {
    if (newTrip && newTrip.tripGuest) {
      setArrivalCity(newTrip.tripGuest.arrivalCity);
      setdepartureCity(newTrip.tripGuest.departureCity);
    }
  }, []);
  const setTrip = useCallback(
    trip => {
      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );
  useEffect(() => {
    if (newTrip && newTrip.tripGuest && newTrip.tripGuest.arrivalCity) {
      setArrivalCity(newTrip.tripGuest.arrivalCity);
    }
    if (newTrip && newTrip.tripGuest && newTrip.tripGuest.departureCity) {
      setdepartureCity(newTrip.tripGuest.departureCity);
    }
  }, [newTrip]);
  const goForward = useCallback(() => {
    handleNext("Step2");
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step13");
  }, [handleBack]);
  useEffect(() => {
    console.log(smallScreen);
  }, [smallScreen]);

  // const setTripDestinationAndArrival = () => {
  //   dispatch({
  //     type: "UPDATE_NEW_TRIP", payload: {
  //       tripDeparture: departureCity,
  //       tripArrival: arrivalCity,
  //     }
  //   });
  // }
  const handleNextButton = () => {
    let value = arrivalCity;
    // if (showArrival && value != "") {
    //   goForward();
    // }
    setdepartureCity(departureCity);
    // if (value && departureCity && newTrip) {
    //   if (!showArrival) {

    //     createTrip({
    //       tripGuestId: newTrip.tripGuest.id,
    //       tripId: newTrip.tripGuest.TripId,
    //       departureCity: departureCity,
    //       arrivalCity: arrivalCity
    //     })
    //   } else {
    //     setArrival(false);
    //   }
    // } else {
    //   setArrival(true);
    // }
    if (value) {
      setArrival(true);
    }
    if (departureCity) {
      setDeparture(true);
    }
    if (showArrival && showDeparture && newTrip) {
      createTrip({
        tripGuestId: newTrip.tripGuest.id,
        tripId: newTrip.tripGuest.TripId,
        departureCity: departureCity,
        arrivalCity: arrivalCity
      });
    }
  };

  if (!newTrip) return null;

  const showArrivalMarkUp = () => {
    return showDeparture ? (
      <RectangleStyled
        style={smallScreen ? { width: "90%" } : {}}
        height="68px"
      >
        DEPARTING CITY
        <CityNameStyled color="blue">{departureCity}</CityNameStyled>
      </RectangleStyled>
    ) : (
      <Input
        {...departureCityInput}
        value={departureCity}
        onChange={(ev: any) => setdepartureCity(ev.target.value)}
        type="autocompleteCities"
        label="Enter Departing City"
      />
    );
  };
  const showArrivalCity = () => {
    return showArrival ? (
      <>
        <DottedLineicon />
        <RectangleStyled
          style={smallScreen ? { width: "90%" } : {}}
          height="68px"
        >
          ARRIVAL CITY
          <CityNameStyled color="blue">{arrivalCity}</CityNameStyled>
        </RectangleStyled>
      </>
    ) : (
      showDeparture && (
        <>
          <DottedLineicon />
          <Input
            className="arrivalInput"
            {...arrivalCityInput}
            value={arrivalCity}
            onChange={(ev: any) => setArrivalCity(ev.target.value)}
            type="autocompleteCities"
            label="Enter Arrival City"
          />
        </>
      )
    );
  };
  return (
    <StepContainerStyled>
      <QuestionStyled>
        {!showDeparture
          ? "What city will you be departing from?"
          : "What city will you go home to?"}
      </QuestionStyled>

      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <HelpSpeechContainerStyled width="100%" marginBottom="0">
        <img src={AvatarURL} />
        <p>This is typically your home city.</p>
      </HelpSpeechContainerStyled>

      <InputStyled style={smallScreen ? { width: "90%" } : {}}>
        {showArrivalMarkUp()}

        {cities.map(value => (
          <>
            <DottedLineicon />
            <RectangleStyled style={smallScreen ? { width: "90%" } : {}}>
              <CityNameStyled>{value.location}</CityNameStyled>
            </RectangleStyled>
          </>
        ))}
        {showArrivalCity()}
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

export default Step15;
