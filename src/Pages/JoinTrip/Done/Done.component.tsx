import React, { useCallback } from "react";
import { navigate } from "@reach/router";
import { StepProps } from "@dimelo/jointrip";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Separator from "src/Components/Separator";
import { ReactComponent as CheckCircle } from "src/shared/assets/check-circle.svg";
import {
  DoneWrapperStyled,
  DoneStyled,
  CheckCircleStyled
} from "./Done.styled";

const Done: React.FC<StepProps> = data => {
  const { newTrip } = data;

  const goToMyTrips = useCallback(() => navigate("/my-trips"), []);

  if (!newTrip) return null;

  return (
    <DoneWrapperStyled 
      style={{alignItems: "center"}}
    >
      <DoneStyled>
        <CheckCircleStyled>
          <CheckCircle />
        </CheckCircleStyled>
        <Heading as="h1">You’re All Set!</Heading>
        <Separator width="30px" />
        <Heading as="h4" color="steel">
          We will notify you once your friends set their dates.
        </Heading>
        <Separator width="50px" />
        <Button onClick={goToMyTrips} active style={{}}>
          My Trips
        </Button>
      </DoneStyled>
    </DoneWrapperStyled>
  );
};

export default Done;
