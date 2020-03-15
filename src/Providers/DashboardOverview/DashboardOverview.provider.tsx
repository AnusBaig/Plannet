import React, { useContext, useMemo, useReducer } from "react";
import { Maybe } from "@dimelo/global";
import dashboardOverviewReducer, {
  dashboardOverviewState,
  Action
} from "./DashboardOverview.reducer";

interface DashboardOverviewContextProps {
  state: dashboardOverviewState;
  dispatch: React.Dispatch<Action>;
  getDashboardData: (dotNotation: string, defaultR?: any) => any;
  getTripData: (dotNotation: string, defaultR?: any) => any;
}

const DashboardOverviewContext = React.createContext<
  Maybe<DashboardOverviewContextProps>
>(null);

function useDashboardOverview() {
  const context = useContext(DashboardOverviewContext);

  if (!context) {
    throw new Error("Can't use this hook without a DashboardOverviewProvider.");
  }
  return context;
}

const DashboardOverviewProvider: React.FC = props => {
  const [state, dispatch] = useReducer(dashboardOverviewReducer, {
    dashboardOverview: null,
    tripData: null
  });
  const getTripData = (dotNotation: string, defaultR: any = ""): any =>
    (state.tripData &&
      dotNotation
        .split(".")
        .reduce((object, key) => object && object[key], state.tripData)) ||
    defaultR;
  const getDashboardData = (dotNotation: string, defaultR: any = ""): any =>
    (state.dashboardOverview &&
      dotNotation
        .split(".")
        .reduce((object, key) => object && object[key], state.dashboardOverview)) ||
    defaultR;
  const getItineraryData = (dotNotation: string, defaultR: any = ""): any =>
    (state.dashboardOverview &&
      dotNotation
        .split(".")
        .reduce((object, key) => object && object[key], state.dashboardOverview)) ||
    defaultR;
  const value = useMemo(() => ({ state, dispatch, getDashboardData, getTripData, getItineraryData }), [
    state,
    dispatch
  ]);

  return <DashboardOverviewContext.Provider value={value} {...props} />;
};

export { useDashboardOverview };
export default DashboardOverviewProvider;
