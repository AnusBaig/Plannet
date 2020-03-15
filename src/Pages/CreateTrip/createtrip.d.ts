declare module "@dimelo/createtrip" {
  import { TripType, Trip, Action } from "src/Providers/Trips/Trip.reducer";
  import { Maybe } from "@dimelo/global";

  export type Steps =
    | "Step0"
    | "Step1"
    | "Step11"
    | "Step12"
    | "Step21"
    | "Step13"
    | "Step14"
    | "Step15"
    | "Step2"
    | "Step3"
    | "Step4"
    | "Step5"
    | "Step51"
    | "Confirm"
    | "Done";
  export type FieldDate = "startDate" | "endDate" | "from" | "to";

  export interface StepProps {
    newTrip?: Maybe<Trip>;
    dispatch: React.Dispatch<Action>;
    handleClose: () => void;
    handleNext: (nextComponent: Steps) => void;
    handleBack: (nextComponent: Steps) => void;
  }
}
