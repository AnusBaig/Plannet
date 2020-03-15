import React, { useCallback, useState, useEffect } from "react";
import { StepProps, Steps } from "@dimelo/mytrip";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import useApi from "src/shared/hooks/useApi";
import { useTrip } from "src/Providers/Trips";
import Fallback from "src/Components/Fallback";
import Dashboard from "./Dashboard";
import { StepWrapperStyled } from "./mytrip.styled";
import Collapsible from 'react-collapsible';
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";


const Components = {
  Dashboard
};

const MyTrip: React.FC<RouteComponentProps> = () => {
  const {
    state: { newTrip },
    dispatch: dispatchTrip
  } = useTrip();
  const { isLoggedIn } = useAuth();
  const [Active, setActive] = useState<Steps>("Dashboard");
  const { state, dispatch } = useApi("trip/getMyTrips", "get");
  const { isLoading, isError } = state;
  const smallScreen = useMediaQuery("SM");

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(
  //       `/login?redirect=${window.location.pathname}${window.location.search.replace('?' , '&')}`
  //     );
  //   }
  // }, [isLoggedIn]);

  
  const data: StepProps = React.useMemo(
    () => ({
      newTrip,
      trips: state.data,
      dispatch: dispatchTrip
    }),
    [newTrip, dispatchTrip, state.data]
  );

  const ActiveComponent = Components[Active];

  useEffect(() => {
    if (state.api) {
      dispatch({ type: "GET_MYTRIPS" });
    }
  }, [state.api, dispatch]);

  useEffect(() => {
    if (state.data && state.data.length) {
      dispatchTrip({ type: "LOAD_TRIPS", payload: state.data });
    }
  }, [state.data, dispatchTrip]);

  useEffect(() => {
    if (isError) {
      //TODO: Proper error alert
      alert(isError);
    }
  }, [isError]);

  return (
    <>
      {isLoading && <Fallback />}
      <StepWrapperStyled style={smallScreen ? {background: "none"} : {}}>
        <ActiveComponent {...data} />
      </StepWrapperStyled>
    </>
  );
};

export default MyTrip;
