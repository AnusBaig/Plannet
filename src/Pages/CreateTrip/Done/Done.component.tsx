import React, { useCallback, useEffect } from "react";
import { navigate } from "@reach/router";
import { StepProps } from "@dimelo/createtrip";
import useApi from "src/shared/hooks/useApi";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Fallback from "src/Components/Fallback";
import Separator from "src/Components/Separator";
import { ReactComponent as CheckCircle } from "src/shared/assets/check-circle.svg";
import {
  DoneWrapperStyled,
  DoneStyled,
  CheckCircleStyled
} from "./Done.styled";

const Done: React.FC<StepProps> = data => {
  const { newTrip } = data;
  const { state, dispatch } = useApi("trip/create", "post");
  const { isLoading, isError } = state;

  const goToMyTrips = useCallback(() => navigate("/my-trips"), []);

  const createTrip = useCallback(
    params => dispatch({ type: "CREATE_TRIP", payload: { params } }),
    [dispatch]
  );

  useEffect(() => {
    if (!state.api) return;
    createTrip(newTrip);
  }, [state.api, createTrip, newTrip]);

  useEffect(() => {
    if (isError) {
      //TODO: Proper error alert
      alert(isError);
    }
  }, [isError]);

  if (!newTrip) return null;

  return (
    <>
      {isLoading && <Fallback />}
      <DoneWrapperStyled>
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
    </>
  );
};

export default Done;
