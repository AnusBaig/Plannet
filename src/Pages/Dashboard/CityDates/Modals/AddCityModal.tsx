import React, { useState, useEffect, useRef } from "react";
import Input from "src/Components/Input";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import DayPickerInput from "react-day-picker/DayPickerInput";

import {
  EditFlightDetailsBodyStyled,
  EditFlightDetailsDescriptionStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldInputStyled,
  ModalBackdropStyled,
  ModalContainerStyled,
  SmallTextDiv,
  TextDiv,
  SubmitButton
} from "../../Accommodation/Modals/AddPlaceDetails.modal.styled";
// } from "./AddPlaceDetails.modal.styled";
import "react-day-picker/lib/style.css";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { useTrip } from "src/Providers/Trips";

const AddCityModal = (props: any) => {
  const { state, dispatch } = useApi("/tripLeg/create");
  const {
    state: dashboardOverviewState,
    dispatch: dashboardOverviewDispatch
  } = useApi("trip/getDashboardData/" + props.currentUser, "get");

  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();

  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validLocation, setValidLocation] = useState(false)
  const [validLocationText, setValidLocationText] = useState('')
  const [validStartDate, setValidStartDate] = useState(false)
  const [validEndDate, setValidEndDate] = useState(false)
  const {
    state: { newTrip },
    dispatch: useTripDispatch
  } = useTrip();

  useLockBodyScroll();


  function dismiss() {
    //@ts-ignore
    modalBackdropRef.current.classList.remove("fade-in");
    //@ts-ignore
    modalContainerRef.current.classList.remove("fade-in");

    setTimeout(() => {
      props.close();
    }, 200);
  }
  //     useEffect(() => {
  //  useTripDispatch({
  //             type: "UPDATE_NEW_TRIP",
  //             payload: { hostTripStart: location }
  //           })
  //     },[location])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "location" || name === undefined) {
      setLocation(value)
      setValidLocation(false)
    };
    if (name === "startDate") {
      setStartDate(value)

    };
    if (name === "endDate") {
      setEndDate(value)
    };
  };

  useEffect(() => {
    if (props.open) {
      const fadeInTimeout = setTimeout(() => {
        //@ts-ignore
        modalBackdropRef.current.classList.add("fade-in");
        //@ts-ignore
        modalContainerRef.current.classList.add("fade-in");
      }, 100);

      return () => clearTimeout(fadeInTimeout);
    } else {
      dismiss();
    }
  }, [props.open]);
  const handleClickOutside = () => {
    if (props.open) {
      dismiss();
    }
  };
  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };
  const addLeg = async () => {
    let data = props.data
    let found = false
    //@ts-ignore    
    data && data.map((d) => {
      //@ts-ignore      
      if (d.location == location) {
        console.log('location', d.location, location)
        found = true
      }
    })
    if (found) {
      setValidLocation(true)
      setValidLocationText('This location is already exist')
    } else {
      if (!location) {
        setValidLocation(true)
        setValidLocationText('Enter Valid location')
      } else if (!startDate) {
        setValidStartDate(true)
      } else if (!endDate) {
        setValidEndDate(true)
      } else {
        const tripId = (dashboardOverview && dashboardOverview.tripLegs && dashboardOverview.tripLegs[0]) ? dashboardOverview.tripLegs[0].TripId : "1"
        const newTripData = {
          tripId: tripId,
          location,
          startDate,
          endDate,
          legOrder: dashboardOverview && dashboardOverview.tripLegs.length
        };

        await dispatch({ type: "ADD_TRIP_LEG", payload: { params: newTripData } });
        dashboardOverviewDispatch({ type: "GET_DASHBOARD" });
      }
    }
  };
  useEffect(() => {
    if (
      dashboardOverviewState.data &&
      dashboardOverviewState.data.currentDashboard
    ) {
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: dashboardOverviewState.data.currentDashboard
      });
      props.close();
    }
  }, [dashboardOverviewState]);

  return (
    <ModalBackdropStyled ref={modalBackdropRef} onClick={handleClickOutside}>
      <ModalContainerStyled
        ref={modalContainerRef}
        onClick={handleContainerClick}
      >
        <div
          style={{
            width: "272px",
            margin: "15px 32px 32px"
          }}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
              fontSize: "1.8em",
              color: "black"
            }}
            onClick={() => props.close()}
          >
            &times;
          </span>
          <EditFlightDetailsBodyStyled>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  label="LOCATION"
                  style={{ flex: 1, height: "48px" }}
                  name="location"
                  errorText={validLocation ? validLocationText : ''}
                  validation={validLocation}
                  value={location}
                  onChange={handleChange}
                  type="autocompleteCities"
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>

                <DayPickerInput
                  format="MM-DD-YYYY"
                  //   onDayChange={() => alert("asdas")}
                  dayPickerProps={{
                    // modifiers: {
                    //   disable: {
                    //     before: new Date()
                    //   }
                    // },
                    disabledDays: { before: new Date() },
                  }}
                  placeholder=""
                  onDayChange={date => {
                    setValidStartDate(false)
                    setStartDate(date.toDateString())
                  }}
                  component={(props: any) => (
                    <Input
                      style={{ flex: 1, height: "48px", width: '100%' }}
                      label="Start Date"
                      name="startDate"

                      errorText={validStartDate ? 'Enter select Start Date' : ''}
                      validation={validStartDate}
                      {...props}
                      value={startDate}
                      readOnly
                    />
                  )}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <DayPickerInput
                  format="MM-DD-YYYY"
                  dayPickerProps={{
                    modifiers: {
                      disable: {
                        before: startDate ? new Date(startDate) : new Date()
                      }
                    },
                    disabledDays: { before: startDate ? new Date(startDate) : new Date() },

                  }}
                  onDayChange={date => {
                    setValidEndDate(false)
                    setEndDate(date.toDateString())
                  }}
                  placeholder=""
                  component={(props: any) => (
                    <Input
                      style={{ flex: 1, height: "48px", width: '100%' }}
                      errorText={validEndDate ? 'Enter select End Date' : ''}
                      validation={validEndDate}
                      label="end Date"
                      name="endDate"
                      {...props}
                      value={endDate}
                      readOnly
                    />
                  )}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled style={{ width: '100%' }}>
              <SubmitButton onClick={addLeg} style={{ width: '50%' }}>Add</SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default AddCityModal;
