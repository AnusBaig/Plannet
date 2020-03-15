import React, { useState, useCallback, useEffect, useRef } from "react";
import { CalendarDay } from "@dimelo/itinerary";
import Input from "src/Components/Input";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import {
  EditFlightDetailsBodyStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled,
  ModalBackdropStyled,
  ModalContainerStyled,
  SubmitButton
} from "../../Transportation/AddFlightDetailModal/AddFlightDetails.modal.styled";
import "../../../CreateTrip/Step11/scrollbarStyled.css";
import { ReactComponent as CalendarIcon } from "src/shared/assets/calendar.svg";
import { ReactComponent as LocationIcon } from "src/shared/assets/location.svg";
import DatePickerRange from "src/Components/DatePickerRange";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { useAuth } from "src/Providers/Auth";
import Timepicker from '../../../../Components/Timepicker'


const addActivity = {
  name: '',
  startDate: '',
  endDate: '',
  location: '',
  notes: '',
  tripId: ''
}

const NewActivityModal = (props: any) => {
  const { state, dispatch } = useApi('/activity/createActivity', 'post');
  let { data } = props;
  const { currentUser } = useAuth();
  const useTripObject = useDashboardOverview();
  const dashboard = useTripObject.state.dashboardOverview;
  const tripGuestId = currentUser && currentUser.id;
  const calendarDayId = data && data.id;
  const TripLegId = data && data.TripLegId;

  const [activityState, setActivityState] = useState({
    ...addActivity,
    tripGuestId,
    tripId: props.tripId,
    location: ''
    // calendarDayId,
    // TripLegId
  });

  const handleChangeState = useCallback(
    name => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log('name++', name, ev.target.value)
      setActivityState({ ...activityState, [name]: ev.target.value })
    },
    [activityState]
  );
  const handleDateChange = (value: any, name: any) => {
    setActivityState({ ...activityState, [name]: value })
  }

  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  useLockBodyScroll();

  function dismiss() {
    //@ts-ignore
    modalBackdropRef.current.classList.remove("fade-in");
    //@ts-ignore
    modalContainerRef.current.classList.remove("fade-in");

    setTimeout(() => props.close(), 200)
  }

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

  const postActivityData = useCallback(
    (data) => dispatch({ type: "ADD_ACTIVITY", payload: { params: data } }),
    [dispatch]
  )
  useEffect(() => {
    if (state.data.added) {
      props.onAddSuccess && props.onAddSuccess(state.data.added);
      dismiss();
    }
  }, [state.data.added])

  return (
    <ModalBackdropStyled
      style={{ zIndex: 30, background: "none !important" }}
      ref={modalBackdropRef}
      onClick={handleClickOutside}
    >
      <ModalContainerStyled
        ref={modalContainerRef}
        style={{ boxShadow: '0 9px 25px 0 #00000051' }}
        onClick={handleContainerClick}
      >
        <div style={{ width: "329px", margin: "32px" }}>
          <EditFlightDetailsBodyStyled>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  name='name'
                  placeholder="Activity Name"
                  onChange={handleChangeState('name')}
                  withoutBorder={true}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <DatePickerRange
                  date1={new Date()}
                  date2={new Date()}
                  handleDate1={(ev: any) => handleDateChange(ev, 'startDate')}
                  handleDate2={(ev: any) => handleDateChange(ev, "endDate")}
                  icon={<CalendarIcon />}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            {/* <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  <Timepicker
                    //@ts-ignore     
                    name='departureTime'
                    label=""                    
                    value={''}                    
                    //@ts-ignore                      
                    onChange={() => {}}
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  <Timepicker
                    //@ts-ignore     
                    name='departureTime'
                    label=""                    
                    value={''}                    
                    //@ts-ignore         
                    onChange={() => {}}                    
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled> */}
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  <Input
                    onChange={handleChangeState('location')}
                    withoutBorder={true}
                    type="autocompleteCities"
                    label='location'
                    value={activityState.location}
                    icon={<LocationIcon style={{
                      position: "absolute",
                      top: "15px",
                      right: "13px",
                    }} />}
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  <textarea
                    name='notes'
                    onChange={handleChangeState('notes')}
                    placeholder="Notes"
                    style={{
                      width: "90%",
                      height: "76px",
                      borderRadius: "4px",
                      border: "2px solid #dadada",
                      outline: "none",
                      padding: "8px 12px 0px 12px",
                      //   border: "0px !important",
                      // borderBottom: "1px solid !important"
                    }}
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled style={{display: 'flex', justifyContent: 'flex-end'}}>
              <SubmitButton style={{ width: '35%', margin: '0px' }} onClick={() => postActivityData(activityState)}> SAVE</SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default NewActivityModal;
