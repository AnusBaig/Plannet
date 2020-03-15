import React, { useState, useCallback, useEffect } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import {
  MainDiv,
  NavMainDiv,
  NavBarDiv,
  Nav,
  ConatinMainDiv
} from "../Transportation/Transportation.styled";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";


const Transportation: React.FC<RouteComponentProps> = props => {
  let path = window.location.pathname
  let tabName = ""
  if (path.includes('Travelers')) {
    tabName = "Travelers"
  } else if (path.includes('SearchHotels')) { 
    tabName = "SearchHotels"
  } else {
    tabName = ""
  }
  const [ActiveNav, setActiveNav] = useState(tabName);
  //@ts-ignore
  const { state, dispatch } = useApi(`trip/getAccommodationDashboardData/${props.id}/`, "get");
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  const { isLoading, isError } = state;
  console.log(dashboardOverview)
  const getDashboardData = useCallback(
    () => dispatch({ type: "GET_DASHBOARD" }),
    [dispatch]
  );

  useEffect(() => {
    if (!state.api) return;
    getDashboardData();

    return () => {
      dispatchDashboardOverview({ type: "CLEAR_DASHBOARD" });
    };
  }, [state.api, dispatchDashboardOverview, getDashboardData]);

  useEffect(() => {
    if (state.data.currentDashboard) {
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.currentDashboard
      });
    }
  }, [state.data.currentDashboard, dispatchDashboardOverview]);
  return (
    <MainDiv>
      <NavMainDiv>
        <NavBarDiv>
          <Nav onClick={() => setActiveNav("")}>
            <Link
              style={{
                borderBottom: ActiveNav === "" ? "3px solid #a7e5ff" : "none",
                paddingBottom: "7px",
                fontWeight: ActiveNav === "" ? 500 : "bold",
                color: "#292c36"
              }}
              to=""
            >
              My Places
            </Link>
          </Nav>
          <Nav onClick={() => setActiveNav("Travelers")}>
            <Link
              style={{
                borderBottom:
                  ActiveNav === "Travelers" ? "3px solid #a7e5ff" : "none",
                paddingBottom: "7px",
                fontWeight: ActiveNav === "Travelers" ? 500 : "bold",
                color: "#292c36"
              }}
              to="Travelers"
            >
              Travelers
            </Link>
          </Nav>
          <Nav onClick={() => setActiveNav("SearchHotels")}>
            <Link
              style={{
                borderBottom:
                  ActiveNav === "SearchHotels" ? "3px solid #a7e5ff" : "none",
                paddingBottom: "7px",
                fontWeight: ActiveNav === "SearchHotels" ? 500 : "bold",
                color: "#292c36"
              }}
              to="SearchHotels"
            >
              Search For Hotels
            </Link>
          </Nav>
        </NavBarDiv>
      </NavMainDiv>
      <ConatinMainDiv
        style={{
          padding: ActiveNav !== "SearchHotels" ? "0px 32px 32px 32px" : "0",
        }}
      >
        {props.children}
      </ConatinMainDiv>
    </MainDiv>
  );
};

export default Transportation;
