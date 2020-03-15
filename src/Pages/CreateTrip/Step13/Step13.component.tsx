import React, { useCallback, useState, useEffect, CSSProperties } from "react";
import { Global } from "@emotion/core";
import { StepProps, FieldDate } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Calendar from "src/Components/Calendar";
import {
  StepActiveAreaStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  BackButtonStyled,
} from "src/Pages/CreateTrip/createtrip.styled";
import {
  Step13WrapperStyled,
  calendarStyles,
  CalendarWrapperStyled,
  Step13ButtonsStyled
} from "./Step13.styled";

import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import useApi from "src/shared/hooks/useApi";

import "react-day-picker/lib/style.css";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step13: React.FC<StepProps> = data => {
  const smallScreen = useMediaQuery("SM");

  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("tripLeg/edit", "put");
  const [currentCalenderIndex, setCurrentCalenderIndex] = useState<number>(0)
  const [range, setRange] = useState<{ from: any, to: any }>({
    from: (newTrip && newTrip.startDate) || "",
    to: (newTrip && newTrip.endDate) || ""
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [cities, setCities] = useState(newTrip && newTrip.tripLegs ? newTrip.tripLegs : [])
  const createTrip = useCallback(params => {
    return dispatch({ type: "CREATE_TRIP", payload: { params } })
  },
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data)
  }, [state.api, state]);

  const setTrip = useCallback(
    (trip) => {
      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });

        // console.log(newTrip , 'newTrip');
        // goForward();
      }
    },
    [tripDispatch]
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    scrollToTop()
  }, [])
  const goBack = useCallback(() => {
    handleBack("Step12");
  }, [handleBack]);

  const goForward = useCallback(() => {
    handleNext("Step14");
  }, [handleNext]);

  if (!newTrip) return null;


  const setLegsRange = (index: any, ev: any) => {
    setRange(ev)

    if (cities[index - 1]) {
      let preLegObj = cities[index - 1]
      if (ev.from || ev.to) {
        if (
          preLegObj.startDate &&
          preLegObj.startDate.getTime &&
          preLegObj.startDate.getTime() <= ev.from.getTime()
          ||
          preLegObj.endDate &&
          preLegObj.endDate.getTime &&
          ev.to &&
          preLegObj.endDate.getTime() <= ev.to.getTime()
        ) {

          let legObj = cities[index];
          legObj.startDate = ev.from;
          legObj.endDate = ev.to;
          for (var i = 0; i < cities.length; i++) {
            if (i > index) {
              let nextLegObj = cities[i];
              nextLegObj.startDate = ev.to
              nextLegObj.endDate = ev.to
            }
          }
          setCities(cities)
          tripDispatch({
            type: "UPDATE_NEW_TRIP",
            payload: { tripLegs: cities }
          });
          createTrip({ ...legObj, tripLegId: legObj.id })
        }
      }

    } else {

      let legObj = cities[index];
      legObj.startDate = ev.from;
      legObj.endDate = ev.to;
      for (var i = 0; i < cities.length; i++) {
        if (i > index) {
          let nextLegObj = cities[i];
          nextLegObj.startDate = ev.to
          nextLegObj.endDate = ev.to
        }
      }

      setCities(cities)
      createTrip({ ...legObj, tripLegId: legObj.id })

      tripDispatch({
        type: "UPDATE_NEW_TRIP",
        payload: { tripLegs: cities }
      });
    }
  }
  const index = currentCalenderIndex
  const value = cities[currentCalenderIndex]
  let Rangeobj = {
    // from: value && value.startDate ? new Date(value.startDate) : range.from ? range.from : new Date(),
    // to: value && value.endDate ? new Date(value.endDate) : range.to ? range.to : new Date(), 
    //@ts-ignore
    from: value ? range.from : value && value.startDate ? new Date(value.startDate) : range.from,
    //@ts-ignore
    to: value ? range.to : value && value.endDate ? new Date(value.endDate) : range.to,
  }
  var date: any;
  if (cities[index - 1]) {
    if (cities[index - 1].endDate) {
      // @ts-ignore
      if (cities[index - 1].endDate.getTime) {
        date = cities[index - 1].endDate
        // @ts-ignore
        Rangeobj.from = new Date(cities[index - 1].endDate)

      } else {
        // @ts-ignore
        date = new Date(cities[index - 1].endDate)
        // @ts-ignore
        Rangeobj.from = new Date(cities[index - 1].endDate)
      }
    }
  }
  return (
    <>
      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>
      <Step13WrapperStyled>
        <Global styles={calendarStyles} />
        <StepActiveAreaStyled>
          <StepBodyStyled>
            {
              <StepBodyWrapperStyled key={index}>
                <Heading as="h2">Which dates will you be traveling to <span style={{ color: '#0088e3' }}>{value.location}</span> ?</Heading>
                <CalendarWrapperStyled>
                  <Calendar
                    range={Rangeobj}

                    setRange={(ev: any) => {
                      setLegsRange(index, ev)
                    }}
                    setDisabled={setDisabled}
                    disableDates={date}
                    disableCalenderDates={cities[index - 1] && cities[index - 1].endDate ? true : false}
                  />
                </CalendarWrapperStyled>
              </StepBodyWrapperStyled>

            }
          </StepBodyStyled>
          <Step13ButtonsStyled>
            <Button
              glow
              width={smallScreen ? '80%' : "184px"}

              onClick={() => {
                if (cities.length - 1 > currentCalenderIndex) {
                  createTrip({ ...cities[currentCalenderIndex], tripLegId: cities[currentCalenderIndex].id })
                  setCurrentCalenderIndex(currentCalenderIndex + 1)
                  setRange({
                    from: "",
                    to: ""
                  })
                } else {
                  createTrip({ ...cities[currentCalenderIndex], tripLegId: cities[currentCalenderIndex].id })
                  goForward()
                  // createTrip({
                  //   tripId: newTrip.tripGuest.TripId,
                  //   tripStartDate: cities[0].startDate,
                  //   tripEndDate: cities[cities.length - 1].endDate,
                  //   tripLegs: cities
                  // }
                  // );
                }
              }}
              active
              disabled={disabled}
            >
              Next
            </Button>
          </Step13ButtonsStyled>
        </StepActiveAreaStyled>
      </Step13WrapperStyled>
    </>
  );
};

export default Step13;
