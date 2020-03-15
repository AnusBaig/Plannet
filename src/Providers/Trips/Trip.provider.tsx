import React, { useContext, useMemo, useReducer, useEffect } from "react";
import { Maybe } from "@dimelo/global";
import tripReducer, { TripsState, Action } from "./Trip.reducer";
import createPersistedReducer from 'use-persisted-reducer';
const usePersistedReducer = createPersistedReducer('trip_reducer');

interface TripContextProps {
  state: TripsState;
  dispatch: React.Dispatch<Action>;
}

const TripContext = React.createContext<Maybe<TripContextProps>>(null);

function useTrip() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("Can't use this hook without a TripProvider.");
  }
  return context;
}

const TripProvider: React.FC = props => {
  const [state, dispatch] = usePersistedReducer(tripReducer, {
    trips: null,
    newTrip: {
      travelerEmails: [],
      tripLegsSet: false,
      isPrivate: true,
      tripDescription: "",
      depositDescription: ""
    },
    currentStep: 'Step0', 
    currentDashboard: null
  });
  useEffect(() => {
    
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <TripContext.Provider value={value} {...props} />;
};

export { useTrip };
export default TripProvider;
