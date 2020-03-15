declare module "@dimelo/mytrip" {
  import { Maybe } from "@dimelo/global";
  import { TripType, Trip, Action } from "src/Providers/Trips/Trip.reducer";

  export type Steps = "Dashboard";
  export type FieldDate = "startDate" | "endDate";

  type TripGuest = Trip & { attendingStatus: string };

  interface TripsWrapper {
    trip: Trip;
    tripGuest: TripGuest;
  }

  export interface StepProps {
    newTrip?: Maybe<Trip>;
    trips?: {
      tripsNeedToBeRSVP: TripsWrapper[];
      tripsRSVPed: TripsWrapper[];
    };
    dispatch: React.Dispatch<Action>;
  }
}
