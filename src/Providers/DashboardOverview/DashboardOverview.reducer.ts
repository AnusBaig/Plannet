import { Maybe } from "@dimelo/global";

export interface DashboardOverview {
  [k: string]: any;
}

export interface TripData {
  [k: string]: any;
}

export interface dashboardOverviewState {
  dashboardOverview: Maybe<DashboardOverview>;
  tripData: Maybe<TripData>;
}

export type Action =
  | { type: "LOAD_DASHBOARD_OVERVIEW"; payload: DashboardOverview }
  | { type: "CLEAR_DASHBOARD" };

function dashboardOverviewReducer(
  state: dashboardOverviewState,
  action: Action
): dashboardOverviewState {
  switch (action.type) {
    case "CLEAR_DASHBOARD":
      return {
        ...state,
        dashboardOverview: null
      };
    case "LOAD_DASHBOARD_OVERVIEW":
      return {
        ...state,
        dashboardOverview: action.payload,
        tripData: dashboardOverviewToTripData(action.payload)
      };
    default:
      throw new Error("Not supported action");
  }
}

export default dashboardOverviewReducer;

function dashboardOverviewToTripData(dashboardOverview: DashboardOverview) {
  if (!dashboardOverview.tripLegs)
    return {
      MyTrips: [],
      totalLegs: 0,
      bookedLegs: 0,
      MyPlaces: [],
      totalPlaces: 0,
      bookedPlaces: 0
    };
  console.log({ dashboardOverview })
  const MyTrips = dashboardOverview.allTransportationLegs
  // .concat({
  //   location: dashboardOverview.arrivalCity,
  //   startDate:
  //     dashboardOverview.tripLegs[dashboardOverview.tripLegs.length - 1] && dashboardOverview.tripLegs[dashboardOverview.tripLegs.length - 1]
  //       .endDate
  // })
  // .map((value: any, i: any) => ({
  //   ...value,
  //   date: value.startDate,
  //   origin: i
  //     ? dashboardOverview.tripLegs[i - 1].location
  //     : dashboardOverview.departureCity,
  //   destination: value.location,
  //   flightDetails: "",
  //   searchFlight: true
  // }));
  const MyPlaces = dashboardOverview.tripLegs;
  const totalLegs = MyTrips && MyTrips.length;
  const bookedLegs = MyTrips && MyTrips.filter(({ type }: any) => type)
    .length;
  const totalPlaces = MyPlaces.length;
  const bookedPlaces = MyPlaces.filter(
    ({ type }: any) => type
  ).length;
  return {
    MyTrips,
    totalLegs,
    bookedLegs,
    MyPlaces,
    totalPlaces,
    bookedPlaces
  };
}
