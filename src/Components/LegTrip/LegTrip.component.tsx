import React, { useCallback, useState } from "react";
import { FieldDate } from "@dimelo/createtrip";
import { useTrip } from "src/Providers/Trips";
import { Trip, TripLeg } from "src/Providers/Trips/Trip.reducer";
import Input from "src/Components/Input";
import DatePickerRange from "src/Components/DatePickerRange";
import { ReactComponent as EditIcon } from "src/shared/assets/edit.svg";
import { ReactComponent as CalendarIcon } from "src/shared/assets/calendar.svg";
import { LegTripStyled } from "./LegTrip.styled";

interface LegTripProps {
  leg: TripLeg;
}

function editLeg(
  newTrip: Trip | null | undefined,
  leg: TripLeg,
  day: Date | string,
  field: FieldDate | "location"
) {
  if (!newTrip || !newTrip.tripLegs) return [];

  const newLegs = newTrip.tripLegs.reduce(
    (newLegs: TripLeg[], item: TripLeg) => {
      if (item.id === leg.id) {
        return newLegs.concat({ ...item, [field]: day });
      }
      return newLegs.concat(item);
    },
    []
  );
  return newLegs;
}

const LegTrip: React.FC<LegTripProps> = ({ leg }) => {
  const {
    state: { newTrip },
    dispatch
  } = useTrip();
  const [state, setState] = useState({
    date1: leg.startDate,
    date2: leg.endDate,
    location: leg.location || ""
  });
  const { date1, date2, location } = state;

  const updateTrip = useCallback(
    (tripLegs: TripLeg[]) =>
      dispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { ...newTrip, tripLegs }
      }),
    [newTrip, dispatch]
  );

  const handleChangeLocation = useCallback(
    ev => {
      const value = ev.target.value;
      const tripLegs = editLeg(newTrip, leg, value, "location");
      setState({ ...state, location: value });
      updateTrip(tripLegs);
    },
    [leg, newTrip, state, updateTrip]
  );

  const handleDate1 = useCallback(
    (day: Date) => {
      const tripLegs = editLeg(newTrip, leg, day, "startDate");
      setState({ ...state, date1: day });
      updateTrip(tripLegs);
    },
    [leg, newTrip, state, updateTrip]
  );

  const handleDate2 = useCallback(
    (day: Date) => {
      const tripLegs = editLeg(newTrip, leg, day, "endDate");
      setState({ ...state, date2: day });
      updateTrip(tripLegs);
    },
    [leg, newTrip, state, updateTrip]
  );

  if (!newTrip) {
    return null;
  }

  return (
    <LegTripStyled>
      <DatePickerRange
        date1={date1}
        date2={date2}
        handleDate1={handleDate1}
        handleDate2={handleDate2}
        icon={<CalendarIcon />}
      />
      <Input
        value={location}
        placeholder="Location"
        onChange={handleChangeLocation}
        style={{ flex: 1 }}
        icon={<EditIcon />}
        type="autocompleteCities"
      />
    </LegTripStyled>
  );
};

export default LegTrip;
