import React, { useEffect } from "react";
import useApi from "src/shared/hooks/useApi";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAuth } from "src/Providers/Auth";
import {  HeadingStyled, RSVPStyled, ConfiremdStyled, FinishedStyled, MainStyled  } from "./TripDashboard.styled"

const TripDashboard: React.FC<RouteComponentProps> = () => {
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useApi("trip/tripDashboard", "get");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        `/login?redirect=${window.location.pathname}${window.location.search}`
      );
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (state.api) {
        dispatch({ type: "GET_TRIP_DASHBOARD" });
    }
  }, [state.api, dispatch]);

  useEffect(() => {
  }, [state]);

  return (
    <MainStyled>
      <HeadingStyled>
          <h1>Trip Dashboard</h1>
          <button>+ Plan a Trip</button>
      </HeadingStyled>
      <RSVPStyled>
        <div>
          <h3><span>O</span> RSVP</h3>
            <p>Join These trips before time is up</p>
        </div>
        <div>
          V
        </div>

      </RSVPStyled>

      <FinishedStyled>
      <div>
          <h3><span>O</span> RSVP</h3>
            <p>Join These trips before time is up</p>
        </div>
        <div>
          V
        </div>

      </FinishedStyled>
      <div>
          <h3><span>O</span> RSVP</h3>
            <p>Join These trips before time is up</p>
        </div>
        <div>
          V
        </div>
      <ConfiremdStyled>

      </ConfiremdStyled>
    </MainStyled>
  );
};

export default TripDashboard;
