import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import SelectionCard from "src/Components/SelectionCard";
import Whoops from "src/Components/Whoops";
import {
} from "./Step12.styled";
import {
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as CalenderSelected } from "src/shared/assets/calendar-selected.svg";
import { ReactComponent as Calender } from "src/shared/assets/calendar-big.svg";
import { ReactComponent as CalenderEmpty } from "src/shared/assets/calendar-empty.svg";
import { ReactComponent as SelectedCalenderEmpty } from "src/shared/assets/selected-calendar.svg";
import { ReactComponent as BigCalendarEmpty } from "src/shared/assets/calendar-empty-big.svg";

const Step12: React.FC<StepProps> = data => {
  const { newTrip, handleBack, handleNext } = data;
  const [userResponse, setUserResponse] = useState();
  const [showWhoops, setShowWhoops] = useState();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  const goForward = () => {
    if (userResponse !== "no") {
      handleNext("Step13");
    } else {
      setShowWhoops(true)
    }
  }

  const goBack = useCallback(() => {
    handleBack("Step11");
  }, [handleBack]);

  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={BigCalendarEmpty}
        onGoBack={() => setShowWhoops(false)}
        message="We don’t currently support this option, but it’s coming shortly!"
      />
    )
  }

  return (
    <StepContainerStyled>
      <QuestionStyled>
        Do you know your travel dates?
      </QuestionStyled>
      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>

      <SelectionBoxContainerStyled>
        <SelectionCard
          icon={Calender}
          selectedIcon={CalenderSelected}
          label="Yes!"
          onClick={() => setUserResponse('yes')}
          selected={userResponse === 'yes'}
        />
        <SelectionCard
          icon={CalenderEmpty}
          selectedIcon={SelectedCalenderEmpty}
          label="SKIP FOR NOW"
          onClick={() => setUserResponse('no')}
          selected={userResponse === 'no'}
        />
      </SelectionBoxContainerStyled>

      <Button
        glow
        onClick={goForward}
        width="184px"
        disabled={!userResponse}
      >
        Next
      </Button>
    </StepContainerStyled>
  );
};

export default Step12;
