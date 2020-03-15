import React, { useState, useCallback, useEffect } from "react";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import { toast } from "react-toastify";
import useApi from "src/shared/hooks/useApi";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import Fallback from "src/Components/Fallback";
import Separator from "src/Components/Separator";
import SelectMenu from "src/Components/SelectMenu";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/arrow-left.svg";

import {
  DashboardWrapperStyled,
  DashboardStyled,
  TitleBoxStyled,
  TabsWrapperStyled,
  InlineButtonStyled,
  DashboardStyleWrapper,
  TripNameHeading,
  NavBarWrapper,
  NavBarHeading,
  TriplanningMainDiv
} from "./Dashboard.styled";
import Footer from "src/Components/Footer";
import OverviewComponent from "./Overview";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { useTrip } from "src/Providers/Trips";

type DashboardProps = RouteComponentProps & { id?: string };

const tabs = [
  { value: "city-and-dates", label: "City & Dates" },
  { value: "who-is-coming", label: "Who's Coming?" },
  { value: "transportation", label: "Transportation" },
  { value: "accommodation", label: "Accommodation" },
  { value: "itinerary", label: "Itinerary" }
];

const NavLink = (props: any) => {
  const [current, setCurrent] = useState(false);
  let path = window.location.pathname
  return (
    <Link
      {...props}
      style={current ||  path.includes(props.children.toLowerCase()) ? { color: "#1ea4ff" } : {}}
      getProps={({ isCurrent }) => setCurrent(isCurrent)}
    >
      {props.children}
    </Link>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ id, children }) => {
  const smallScreen = useMediaQuery("SM");

  const handleSelectTab = useCallback(
    tab => {
      tab === "city-and-dates"
        ? navigate("/dashboard/" + id)
        : navigate("/dashboard/" + id + "/" + tab);
    },
    [id]
  );
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  const { state, dispatch } = useApi("trip/getDashboardData/" + id, "get");
  const { isLoading, isError } = state;

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

  useEffect(() => {
    if (isError) {
      //TODO: Proper error alert
      toast.error(isError);
    }
  }, [isError]);

  const goToMyTrips = useCallback(() => {
    navigate("/my-trips");
  }, []);

  const handleShareTrip = useCallback(() => {
  }, [id]);

  return (
    <>
      {isLoading && <Fallback />}
      <DashboardWrapperStyled>
        <DashboardStyled>
          <DashboardStyleWrapper>
            <TitleBoxStyled>
              <InlineButtonStyled style={{paddingLeft: smallScreen ? '10px' : '0px', paddingTop: '15px'}} onClick={goToMyTrips}>
                <ArrowLeftIcon /> <h5>Back to My Trips</h5>
              </InlineButtonStyled>
            </TitleBoxStyled>
            <Separator width="50px" />

            <TripNameHeading style={{paddingLeft: smallScreen ? '10px' : '0px'}}>
              {dashboardOverview
                ? dashboardOverview.tripName || "Error on fetching data"
                : ""}
            </TripNameHeading>
            <Separator width="30px" />
            <OverviewComponent id={id} />
            <Separator width="48px" />
            <TriplanningMainDiv>
              <NavBarWrapper>
                <NavBarHeading>Trip Planning</NavBarHeading>
                {smallScreen ? (
                  <>
                    <SelectMenu options={tabs} onChange={handleSelectTab} />
                    <Separator width="30px" />
                  </>
                ) : (
                  <TabsWrapperStyled>
                    {tabs.map(({ value, label }, index) => (
                      <NavLink to={value == "city-and-dates" ? "" : value}>
                        {label}
                      </NavLink>
                    ))}
                  </TabsWrapperStyled>
                )}
              </NavBarWrapper>
              {children}
            </TriplanningMainDiv>
          </DashboardStyleWrapper>
        </DashboardStyled>
        <Footer />
      </DashboardWrapperStyled>
    </>
  );
};

export default Dashboard;
