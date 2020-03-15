import React, { useCallback, useEffect } from "react";
import { navigate } from "@reach/router";
import { StepProps } from "@dimelo/jointrip";
import * as shortid from "shortid";
import { useAuth } from "src/Providers/Auth";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import LegTrip from "src/Components/LegTrip";
import Separator from "src/Components/Separator";
import BlueButton from "src/Components/BlueButton";
import {
  StepActiveAreaStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled
} from "src/Pages/JoinTrip/jointrip.styled";
import {
  Step2WrapperStyled,
  Step2ButtonsStyled,
  Step2ButtonStyled
} from "./Step2.styled";

const emptyLeg = {
  id: shortid.generate(),
  startDate: undefined,
  endDate: undefined,
  location: ""
};

const Step2: React.FC<StepProps> = data => {
  const { newTrip, dispatch, handleNext } = data;
  const { isLoggedIn } = useAuth();

  const handleAddLocation = useCallback(() => {
    if (!newTrip) return null;
    const prevLegs = newTrip.tripLegs ? [...newTrip.tripLegs] : [];

    dispatch({
      type: "UPDATE_NEW_TRIP",
      payload: {
        tripLegs: [...prevLegs, { ...emptyLeg, id: shortid.generate() }]
      }
    });
  }, [dispatch, newTrip]);

  const goBack = useCallback(() => {
    handleNext("Step1");
  }, [handleNext]);

  const goNext = useCallback(() => {
    handleNext("Step3");
  }, [handleNext]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        `/login?redirect=${window.location.pathname}${window.location.search}/step2`
      );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!newTrip || !newTrip.tripLegs || !newTrip.tripLegs.length) {
      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: {
          tripLegs: [{ ...emptyLeg, id: shortid.generate() }]
        }
      });
    }
  }, [dispatch, newTrip]);

  if (!newTrip) return null;

  const tripLegs =
    newTrip.tripLegs && newTrip.tripLegs.length
      ? newTrip.tripLegs
      : [{ ...emptyLeg }];

  return (
    <Step2WrapperStyled>
      <StepActiveAreaStyled>
        <StepHeaderStyled>
          {newTrip.tripName && <NameStyled>{newTrip.tripName}</NameStyled>}
        </StepHeaderStyled>
        <StepBodyStyled>
          <StepBodyWrapperStyled>
            <Heading as="h2">What locations would you like to go?</Heading>
            {tripLegs.map(item => {
              return <LegTrip key={item.id} leg={item} />;
            })}
            {/* TODO: only between the ranges */}
            {tripLegs.length < 10 && (
              <Step2ButtonStyled>
                <BlueButton width="240px" onClick={handleAddLocation}>
                  Add Location
                </BlueButton>
              </Step2ButtonStyled>
            )}
          </StepBodyWrapperStyled>
        </StepBodyStyled>
        <Separator width="20px" />
        <StepFooterStyled>
          <Step2ButtonsStyled>
            <Button onClick={goBack}>Back</Button>
            <Button onClick={goNext} active>
              Next
            </Button>
          </Step2ButtonsStyled>
        </StepFooterStyled>
      </StepActiveAreaStyled>
    </Step2WrapperStyled>
  );
};

export default Step2;
