import React, { useState, useEffect, useRef } from "react";
import Input from "src/Components/Input";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";

import {
    EditFlightDetailsBodyStyled,
    EditFlightDetailsDescriptionStyled,
    EditFlightDetailsFieldStyled,
    EditFlightDetailsFieldInputStyled,
    ModalBackdropStyled,
    ModalContainerStyled,
    SmallTextDiv,
    TextDiv,
    SubmitButton,
} from "../../Accommodation/Modals/AddPlaceDetails.modal.styled";
// } from "./AddPlaceDetails.modal.styled";
import "react-day-picker/lib/style.css";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import DayPickerInput from "react-day-picker/DayPickerInput";

const EditCityModal = (props: any) => {
    const { state, dispatch } = useApi("/tripLeg/edit", "put");
    const { state: dashboardOverviewState, dispatch: dashboardOverviewDispatch } = useApi("trip/getDashboardData/" + props.currentUser, "get");

    const {
        state: { dashboardOverview },
        dispatch: dispatchDashboardOverview
      } = useDashboardOverview();


    const modalBackdropRef = useRef(null);
    const modalContainerRef = useRef(null);

   
    const [location, setLocation] = useState(props.leg.location);
    const [startDate, setStartDate] = useState(props.leg.startDate);
    const [endDate, setEndDate] = useState(props.leg.endDate);


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

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        if (name === "location" || name === undefined) setLocation(value);
        if(name === "startDate")  setStartDate(value);
        if(name === "endDate")  setEndDate(value);


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
    const editLeg = async () => {
        if ((props.leg.location === location) && (props.leg.startDate === startDate) && (props.leg.endDate === endDate) ) {
            dismiss()
        } else {
            const {id:tripLegId,  legOrder } = props.leg;
            const newTripData = {
                tripLegId,
                location,
                startDate,
                endDate,
                legOrder
            }
    
    
           await   dispatch({type: "EDIT_TRIP_LEG", payload: {params: newTripData}});
            setTimeout(() => {
                dashboardOverviewDispatch({ type: "GET_DASHBOARD" });
            }, 1500)
        }

    }
    useEffect(() => {
      if(dashboardOverviewState.data && dashboardOverviewState.data.currentDashboard) {
  
  
          dispatchDashboardOverview({
              type: "LOAD_DASHBOARD_OVERVIEW",
              payload: dashboardOverviewState.data.currentDashboard
            });
            props.close();
  
      }
    }, [dashboardOverviewState])
  

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
                //   style={{ flex: 1, height: "48px" }}


                  onDayChange={date => setStartDate(date.toDateString())}
                  component={(props: any) => (
                    <Input
                      label="Start Date"
                      name="startDate"
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
                  onDayChange={date => setEndDate(date.toDateString())}
                
                  component={(props: any) => (
                    <Input
                    // style={{ flex: 1, height: "48px" }}

                      label="endDate"
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
                            <SubmitButton onClick={editLeg} style={{ width: '50%' }}>UPDATE</SubmitButton>
                        </EditFlightDetailsFieldStyled>
                    </EditFlightDetailsBodyStyled>
                </div>
            </ModalContainerStyled>
        </ModalBackdropStyled>
    );
};

export default EditCityModal;
