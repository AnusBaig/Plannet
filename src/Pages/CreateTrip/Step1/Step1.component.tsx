import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import { TripType } from "src/Providers/Trips/Trip.reducer";
import Button from "src/Components/Button";
import SelectionCard from "src/Components/SelectionCard";
import Whoops from "src/Components/Whoops";
import {
} from "./Step1.styled";
import {
  StepContainerStyled,
  QuestionStyled,
  HelpSpeechContainerStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as CityIcon } from "src/shared/assets/city.svg";
import { ReactComponent as CityIconSelected } from "src/shared/assets/city-selected.svg";
import { ReactComponent as GlobeIcon } from "src/shared/assets/globe.svg";
import { ReactComponent as GlobeIconSelected } from "src/shared/assets/globe-selected.svg";
import { ReactComponent as BigGlobeIcon } from "src/shared/assets/globe-2.svg";

const Step1: React.FC<StepProps> = data => {
  const { newTrip, dispatch, handleBack, handleNext } = data;
  const [userResponse, setUserResponse] = useState();
  const [showWhoops, setShowWhoops] = useState(false);

  const goBack = useCallback(() => {
    handleBack("Step0");
  }, [handleBack]);

  const setTripType = (type: any) => {
    dispatch({ type: "UPDATE_NEW_TRIP", payload: { tripType: type } });
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  const goForward = () => {
    if (userResponse == 'yes') {
      handleNext("Step11");
    } else {
      setShowWhoops(true)
    }
  }

  if (!newTrip) return null;
  if (showWhoops) {
    return (
      <Whoops
        icon={BigGlobeIcon}
        onGoBack={() => setShowWhoops(false)}
        message="We don’t currently support this option, but it’s coming shortly!"
      />
    )
  }

  return (
    <StepContainerStyled>
      <QuestionStyled>
        Do you know which cities you want to visit?
      </QuestionStyled>
      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <SelectionBoxContainerStyled>
        <SelectionCard
          icon={CityIcon}
          selectedIcon={CityIconSelected}
          label="Yes!"
          onClick={() => setUserResponse('yes')}
          selected={userResponse === 'yes'}
        />
        <SelectionCard
          icon={GlobeIcon}
          selectedIcon={GlobeIconSelected}
          label="SKIP FOR NOW"
          onClick={() => {
            setUserResponse('no')
          }}
          selected={userResponse === 'no'}
        />
      </SelectionBoxContainerStyled>

      <Button
        glow
        onClick={() => {
          setTripType(userResponse)
          goForward()
        }
        }
        width="184px"
        disabled={!userResponse}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step1;
