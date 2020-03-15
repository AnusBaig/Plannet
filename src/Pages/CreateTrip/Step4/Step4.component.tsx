import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import { TripType } from "src/Providers/Trips/Trip.reducer";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Input from "src/Components/Input";
import AvatarURL from "src/shared/assets/maya.png";
import { useInput } from "src/shared/hooks/useInput";
import { SLIDER_MAX_VALUE } from "src/constants";

import {
  SliderStyled
} from "./Step4.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  HelpSpeechContainerStyled,
  SelectionBoxContainerStyled,
  BackButtonStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as NoBudgetIcon } from "src/shared/assets/no-budget.svg";
import { ReactComponent as NotSureIcon } from "src/shared/assets/magnifying-glass.svg";
import { ReactComponent as NotSureBigIcon } from "src/shared/assets/magnifying-big.svg";
import { ReactComponent as CustomBudgetIcon } from "src/shared/assets/active.svg";
import { ReactComponent as CustomBudgetIconDefault } from "src/shared/assets/custom-amount-default.svg";
import { ReactComponent as NoBudgetActiveIcon } from "src/shared/assets/active-no-budget.svg";
import { ReactComponent as NoSureActiveIcon } from "src/shared/assets/active-skip-for-now.svg";



// import CustomBudgetIcon from "src/shared/assets/magnifying-big.svg";


// import CutomBudgetImg from "src/shared/assets/active.png";

import Whoops from "src/Components/Whoops";
import SelectionCard from "src/Components/SelectionCard";
import SliderRange from "src/Components/SliderRange";
import useApi from "src/shared/hooks/useApi";
import { InputWrapperStyled } from "src/Components/Input/Input.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step4: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/specifyBudget", "post");
  const tripNameInput = useInput();
  const [userResponse, setUserResponse] = useState();
  const [errorSpeech, setErrorSpeech] = useState();
  //@ts-ignore
  const [budgetValue, setBudgetValue] = useState(!newTrip.hostTripBudget || newTrip.hostTripBudget < 1
    ? 0
    //@ts-ignore

    : newTrip.hostTripBudget < SLIDER_MAX_VALUE
      //@ts-ignore

      ? newTrip.hostTripBudget
      : SLIDER_MAX_VALUE);
  const [showWhoops, setShowWhoops] = useState();
  const createTrip = useCallback(params => {
    if (params.budget) {

      return dispatch({ type: "CREATE_TRIP", payload: { params } })
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
      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    scrollToTop()
  }, [])
  const goForward = () => {
    if (userResponse !== "no") {
      handleNext('Step5');
    } else {
      setShowWhoops(true)
    }
  }
  const smallScreen = useMediaQuery("SM");

  const goBack = useCallback(() => {
    handleBack("Step3");
  }, [handleBack]);

  const handleChange = useCallback(
    (values, setValues) => {
      setValues(values);
      setBudgetValue(values)
      setErrorSpeech(false)

      // dispatch({
      //   type: "UPDATE_NEW_TRIP",
      //   payload: { hostTripBudget: values }
      // });
      // if (newTrip) {
      //   createTrip({
      //     tripGuestId: newTrip.tripGuest.id,
      //     tripId: newTrip.tripGuest.TripId,
      //     // tripLegId: cities[selected].id,
      //     budget: values
      //   })
      
    },
    [dispatch]
  );

  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={NotSureBigIcon}
        message="We don’t currently support this option, but it’s coming shortly!"
        onGoBack={() => setShowWhoops(false)}
      />);
  }
  let budget = !newTrip.hostTripBudget || newTrip.hostTripBudget < 1
    ? 0
    : newTrip.hostTripBudget < SLIDER_MAX_VALUE
      ? newTrip.hostTripBudget
      : SLIDER_MAX_VALUE;
  return (
    <StepContainerStyled>
      <QuestionStyled>
        How much are you looking to budget for this trip?
      </QuestionStyled>

      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <HelpSpeechContainerStyled width="100%" marginBottom="0">
        <img src={AvatarURL} />
        <p>Our budget suggestion for this trip is $2,500</p>
      </HelpSpeechContainerStyled>

      <SelectionBoxContainerStyled
        width="768px"
      >
        <SelectionCard
          icon={CustomBudgetIconDefault}
          selectedIcon={CustomBudgetIcon}
          label="Custom Budget!"
          onClick={() => setUserResponse('custom')}
          selected={userResponse === 'custom'}
          margin="24px"
        />
        <SelectionCard
          icon={NoBudgetIcon}
          selectedIcon={NoBudgetActiveIcon}
          label="No Budget!"
          onClick={() => setUserResponse('no_budget')}
          selected={userResponse === 'no_budget'}
          margin="24px"
        />
        <SelectionCard
          icon={NotSureIcon}
          selectedIcon={NoSureActiveIcon}
          label="SKIP FOR NOW"
          onClick={() => setUserResponse('no')}
          selected={userResponse === 'no'}
          margin="24px"
        />
      </SelectionBoxContainerStyled>
      <SliderStyled>
        {userResponse === "custom" && (
          <SliderRange
            values={budgetValue}
            handleChange={handleChange}
          />)}
        {userResponse === "custom" && (
          <InputWrapperStyled style={{
            maxWidth: '248px', margin: "5px auto", marginBottom: "48px",
          }}>
            <Input value={budgetValue} onChange={(ev) => {
              if (Number(ev.target.value) <= SLIDER_MAX_VALUE)
                setErrorSpeech(false)
              setBudgetValue(Number(ev.target.value))
            }} />
          </InputWrapperStyled>

        )}
      </SliderStyled>
      {errorSpeech && budgetValue <= 0 && userResponse === "custom" && (
        <HelpSpeechContainerStyled
          style={{
            overflow: 'hidden',
            transition: "max-height 1s",
            maxHeight: 500,
            width: smallScreen ? '320px' : "auto"
          }}>
          <img src={AvatarURL} />
          <p>You need to set a budget</p>
        </HelpSpeechContainerStyled>
      )}
      <Button
        glow
        onClick={() => {
          if (newTrip && budgetValue > 0 && userResponse === "custom") {
            createTrip({
              tripGuestId: newTrip.tripGuest.id,
              tripId: newTrip.tripGuest.TripId,
              budget: budgetValue,
            })
          } else if (budgetValue <= 0 && userResponse === "custom") {
            setErrorSpeech(true)
          }
          else if (userResponse !== "custom") {
            goForward()
          }
        }}
        width="184px"
        disabled={!userResponse}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step4;
