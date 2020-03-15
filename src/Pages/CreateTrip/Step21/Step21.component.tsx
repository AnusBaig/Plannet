import React, { useCallback, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import {
  StepActiveAreaStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled
} from "src/Pages/CreateTrip/createtrip.styled";
import {
  Step21WrapperStyled,
  Step21ButtonsStyled,
  Step21InputWrapperStyled
} from "./Step21.styled";

const Step21: React.FC<StepProps> = data => {
  const { newTrip, dispatch, handleNext, handleBack } = data;

  const handleInput1 = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { hostTripStart: value }
      }),
    [dispatch]
  );

  const handleInput2 = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { hostTripEnd: value }
      }),
    [dispatch]
  );
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(()=>{
    scrollToTop()
  },[])
  const goBack = useCallback(() => {
    handleBack("Step12");
  }, [handleBack]);

  const goForward = useCallback(() => {
    handleNext("Step13");
  }, [handleNext]);

  if (!newTrip) return null;

  return (
    <Step21WrapperStyled>
      <StepActiveAreaStyled>
        <StepHeaderStyled>
          {newTrip.tripName && <NameStyled>{newTrip.tripName}</NameStyled>}
        </StepHeaderStyled>
        <StepBodyStyled>
          <StepBodyWrapperStyled>
            <Heading as="h3">Where would you like to start your trip?</Heading>
            <Heading as="h4" color={"steel"}>
              (This is typically your home city)
            </Heading>
            <Step21InputWrapperStyled>
              <Input
                value={newTrip.hostTripStart || ""}
                placeholder="Starting location"
                onChange={handleInput1}
                type="autocompleteCities"
              />
            </Step21InputWrapperStyled>
            <br />
            <Heading as="h3">Where would you like to end your trip?</Heading>
            <Heading as="h4" color={"steel"}>
              (This is typically your home city)
            </Heading>
            <Step21InputWrapperStyled>
              <Input
                value={newTrip.hostTripEnd || ""}
                placeholder="Ending location"
                onChange={handleInput2}
                type="autocompleteCities"
              />
            </Step21InputWrapperStyled>
          </StepBodyWrapperStyled>
        </StepBodyStyled>
        <StepFooterStyled>
          <Step21ButtonsStyled>
            <Button onClick={goBack}>Back</Button>
            <Button
              onClick={goForward}
              active
              disabled={!newTrip.hostTripStart || !newTrip.hostTripEnd}
            >
              Next
            </Button>
          </Step21ButtonsStyled>
        </StepFooterStyled>
      </StepActiveAreaStyled>
    </Step21WrapperStyled>
  );
};

export default Step21;
