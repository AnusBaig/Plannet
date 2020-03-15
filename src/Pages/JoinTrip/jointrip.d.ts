declare module "@dimelo/jointrip" {
  import { TripType, Trip, Action } from "src/Providers/Trips/Trip.reducer";
  import { Maybe } from "@dimelo/global";

  export type Steps = "Step1" | "Step2" | "Step3" | "Step4" | "Transportation" | "Done";
  export type FieldDate = "startDate" | "endDate";

  export interface StepProps {
    newTrip?: Maybe<Trip>;
    dispatch: React.Dispatch<Action>;
    handleClose: () => void;
    handleNext: (nextComponent: Steps) => void;
    handleBack: (nextComponent: Steps) => void;
  }
}
