import React, { useCallback, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import { TripType } from "src/Providers/Trips/Trip.reducer";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Input from "src/Components/Input";
import AvatarURL from "src/shared/assets/maya.png";
import { useInput } from "src/shared/hooks/useInput";
import { InputStyled } from "./Step0.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  HelpSpeechContainerStyled
} from "../createtrip.styled";
import useApi from "src/shared/hooks/useApi";
import { stat } from "fs";
import { useTrip } from "src/Providers/Trips";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step0: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext } = data;
  const { state, dispatch } = useApi("trip/addTripName", "post");
  const tripNameInput = useInput();

  const createTrip = useCallback(params => {
    if (newTrip && newTrip.trip && newTrip.trip.name === tripNameInput.value) {
      goForward()
    } else {
      // if(newTrip){  
      // }
      if (params.tripName) {
        return dispatch({ type: "CREATE_TRIP", payload: { params } })
      }
    }
  },
    [dispatch]
  );
  const smallScreen = useMediaQuery("SM");
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data)
  }, [state.api, state]);
  useEffect(() => {
    if (newTrip && newTrip.trip) {
      tripNameInput.setValue(newTrip.trip.name)
    }else{
      tripNameInput.setValue('')
    }
  }, [newTrip])
  const setTrip = useCallback(
    trip => {

      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );

  const goForward = useCallback(() => {
    handleNext("Step1");
  }, [handleNext]);

  if (!newTrip) return null;

  return (
    <StepContainerStyled>
      <QuestionStyled>
        Hi, i'm Arya! Let's plan this trip.
        <br />
        But first things first, lets give it
        a name.
      </QuestionStyled>
      <InputStyled>
        <Input value={tripNameInput.value} {...tripNameInput} label="Enter Trip Name" />
      </InputStyled>

      {(
        <HelpSpeechContainerStyled
          style={{
            overflow: 'hidden',
            transition: "max-height 1s",
            maxHeight: tripNameInput.value ? 500 : 0,
            width: smallScreen ? '320px' : "auto"
          }}>
          <img src={AvatarURL} />
          <p>You’ll be able to change this later!</p>
        </HelpSpeechContainerStyled>
      )}
      <Button
        glow
        onClick={() => createTrip({ tripName: tripNameInput.value })}
        width={smallScreen ? '80%' : "184px"}
        disabled={!tripNameInput.value}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step0;
