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
} from "./Step5.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  HelpSpeechContainerStyled,
  SelectionBoxContainerStyled,
  BackButtonStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as BaggageIcon } from "src/shared/assets/baggage.svg";
import { ReactComponent as SelectedBaggageIcon } from "src/shared/assets/selected-baggage.svg";
import { ReactComponent as BagIcon } from "src/shared/assets/bag.svg";
import { ReactComponent as SelectedBagIcon } from "src/shared/assets/selected-bag.svg";
import { ReactComponent as SuitcaseIcon } from "src/shared/assets/suitcase.svg";
import { ReactComponent as SuitcaseBigIcon } from "src/shared/assets/suitcase-big.svg";
import Whoops from "src/Components/Whoops";
import SelectionCard from "src/Components/SelectionCard";
import SliderRange from "src/Components/SliderRange";
import useApi from "src/shared/hooks/useApi";

const Step5: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/inviteGuests", "post");
  const tripNameInput = useInput();
  const [userResponse, setUserResponse] = useState();
  const [showWhoops, setShowWhoops] = useState();
  const [mode, setMode] = useState("");

  useEffect(() => {

  }, [mode])

  const goForward = () => {
    if (mode === "solo") {
      handleNext('Confirm');
    } else {
      if (userResponse !== "no") {
        handleNext('Step51');
      } else {
        setShowWhoops(true)
      }
    }

  }

  const goBack = useCallback(() => {
    handleBack("Step4");
  }, [handleBack]);

  const handleChange = useCallback(
    (values, setValues) => {
      setValues(values);
      tripDispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { hostTripBudget: values }
      });
    },
    [dispatch]
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={SuitcaseBigIcon}
        message="We don’t currently support this option, but it’s coming shortly!"
        onGoBack={() => setShowWhoops(false)}
      />);
  }
  const budget =
    !newTrip.hostTripBudget || newTrip.hostTripBudget < 1
      ? 0
      : newTrip.hostTripBudget < SLIDER_MAX_VALUE
        ? newTrip.hostTripBudget
        : SLIDER_MAX_VALUE;

  return (
    <StepContainerStyled>
      <QuestionStyled>
        Do you know who’s coming along?
      </QuestionStyled>

      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <SelectionBoxContainerStyled
        width="768px"
      >
        <SelectionCard
          icon={BaggageIcon}
          selectedIcon={SelectedBaggageIcon}
          label="YES!"
          onClick={() => {
            setUserResponse('yes')
            setMode("")
          }}
          selected={userResponse === 'yes'}
          margin="24px"
        />
        <SelectionCard
          icon={BagIcon}

          selectedIcon={SelectedBagIcon}
          label="SOLO"
          onClick={() => {
            // setUserResponse('yes')
            setMode("solo");
            setUserResponse("solo");

          }}
          selected={userResponse === "solo"}
          margin="24px"
        />
        <SelectionCard
          icon={SuitcaseIcon}
          selectedIcon={SuitcaseBigIcon}
          label="SKIP FOR NOW"
          onClick={() => setUserResponse('no')}
          selected={userResponse === 'no'}
          margin="24px"
        />
      </SelectionBoxContainerStyled>

      <Button
        glow
        onClick={goForward}
        width="184px"
        disabled={mode !== "solo" && !userResponse}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step5;
