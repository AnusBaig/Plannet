import React, { useState, useEffect, useRef } from "react";
import Input from "src/Components/Input";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import { ReactComponent as ArrowRight } from "src/shared/assets/arrow-right-d-1.svg";
import useApi from "src/shared/hooks/useApi";
import Timepicker from '../../../../Components/Timepicker'
import {
  EditFlightDetailsBodyStyled,
  EditFlightDetailsDescriptionStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled,
  ModalBackdropStyled,
  ModalContainerStyled,
  SmallTextDiv,
  TextDiv,
  SubmitButton
} from "./AddFlightDetails.modal.styled";
import "react-day-picker/lib/style.css";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";


const AddFlightDetailsModal = (props: any) => {
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);
  const { state, dispatch } = useApi(props.Edit ? '/transportationLeg/updateFlightLeg' : "/transportationLeg/create", props.Edit ? 'put' : 'post');
  const [flightNumber, setFlightNumber] = useState('')
  const [isFlightNumber, setIsFlightNumber] = useState(true)
  const [origin, setOrigin] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [destination, setDestination] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
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
    const { name, value } = e.target;
    if (name === "flightNumber") {
      setIsFlightNumber(true)
      setFlightNumber(value);
    }
    if (name === "origin") setOrigin(value);
    if (name === "destination") setDestination(value);
  };
  const changeTime = (value: any, name: string) => {
    let obj = value.hours + ':' + value.minutes
    if (name === "departureTime") {
      //@ts-ignore          
      props.handleDepChange(true)
      setDepartureTime(obj);
    }
    if (name === "arrivalTime") {
      //@ts-ignore                
      props.handleArrChange(true)
      setArrivalTime(obj);
    }
    //@ts-ignore    
    props.addingMode()
  }
  
  const handleChangeOrigin = (e: any) => {
    const { name, value } = e.target;
    setOrigin(value);
  };
  
  const handleChangeDestination = (e: any) => {
    const { name, value } = e.target;
    setDestination(value);
  };
  useEffect(() => {
    if (props.Edit && props.EditObj) {
      let value = props.EditObj
      setFlightNumber(value.flightNumber)
      setDepartureDate(value.departureDate)
      setOrigin(value.origin)
      setDestination(value.destination)
      setDepartureTime(value.departureTime)
      setArrivalTime(value.arrivalTime)
    }
  }, [])
  useEffect(() => {
    console.log('stateUpdated', state)
    //@ts-ignore
    if (state && state.params) {
      //@ts-ignore
      props.updateTransportation(state.params)
    }
  }, [state])
  const addFlight = async () => {
    if (flightNumber) {
      let { tripId, tripLegId, tripGuestId, tripType, dpDate, arDate } = props
      const newTripData = {
        "type": tripType,
        tripId,
        tripGuestId: tripGuestId,
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        "departureDate": dpDate,
        "arrivalDate": arDate,
        "fromTripLegId": "1",
        "toTripLegId": "2"
      };
      await dispatch({ type: "ADD_FLIGHT_DETAILS", payload: { params: newTripData } });
      props.close()
    } else {
      setIsFlightNumber(false)
    }
  };
  const UPDATE_Flight = async () => {
    if (flightNumber) {
      let { tripId, tripLegId, tripGuestId, tripType, dpDate, arDate } = props
      const newTripData = {
        type: tripType,
        transportationLegId: tripLegId,
        tripId,
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        departureDate: dpDate,
        arrivalDate: arDate,
  
      };
      await dispatch({ type: "ADD_FLIGHT_DETAILS", payload: { params: newTripData } });
      props.close()
    } else {
      setIsFlightNumber(false)
    }
    
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
  const SmallScreen = useMediaQuery('SM');

  return (
    <ModalBackdropStyled ref={modalBackdropRef} onClick={handleClickOutside}>
      <ModalContainerStyled
        ref={modalContainerRef}
        onClick={handleContainerClick}
        style={{
          // height: '100%',
          width: SmallScreen ? '100%' : 'auto',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            // width: "329px",
            margin: "25px 32px"
          }}
        >
          <EditFlightDetailsBodyStyled>
            <EditFlightDetailsDescriptionStyled>
              <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>{departureDate}</span>
                <span
                    style={{
                    cursor: 'pointer',
                    fontSize: "1.8em",
                    color: "black"
                    }}
                    onClick={() => props.close()}
                >
                    &times;
                </span>
               </span> 
            </EditFlightDetailsDescriptionStyled>
            <div style={{ width: "100%" }}>
              <SmallTextDiv>ORIGIN</SmallTextDiv>
              <div
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px"
                }}
              ></div>
              <SmallTextDiv>DESTINATION</SmallTextDiv>
            </div>
            <div style={{ width: "100%" }}>
              <TextDiv>{origin}</TextDiv>
              <div
                style={{
                  display: "inline-block",
                  padding: '0 4px',
                  height: "16px"
                }}
              >
                <ArrowRight color="red" 
                  style={{
                    padding: '0 5px',
                  }}
                />
              </div>
              <TextDiv>{destination}</TextDiv>
            </div>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  label="Flight Number"
                  style={{ flex: 1, height: "48px", maxWidth: "100%" }}
                  name="flightNumber"
                  value={flightNumber}
                  onChange={handleChange}
                  errorText={isFlightNumber ? "" : 'Please enter flight number'}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  label="Origin"
                  style={{ flex: 1, height: "48px", maxWidth: "100%" }}
                  name="origin"
                  type="autocompleteCities"
                  value={origin}
                  onChange={handleChangeOrigin}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  style={{ flex: 1, height: "48px", maxWidth: "100%" }}
                  label="Destination"
                  name="destination"
                  type="autocompleteCities"
                  value={destination}
                  onChange={handleChangeDestination}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  {/* <Input
                    style={{ flex: 1, height: "48px", maxWidth: "100%" }}
                    label="Departure Time"
                    name="departureTime"
                    value={departureTime}
                    onChange={handleChange}
                  /> */}
                  <Timepicker
                    name='departureTime'
                    label="Departure Time"
                    //@ts-ignore                                                              
                    value={props.changeDep ? departureTime : ''}                    
                    //@ts-ignore                      
                    onChange={changeTime}
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <EditFlightsDatePickerStyled>
                  {/* <Input
                    style={{ flex: 1, height: "48px", maxWidth: "100%" }}
                    label="Arrival Time"
                    name="arrivalTime"
                    value={arrivalTime}
                    onChange={handleChange}
                  /> */}
                  <Timepicker
                    name='arrivalTime'
                    //@ts-ignore                                          
                    value={props.changeArr ? arrivalTime : ''}   
                    label="Arrival Time"                                     
                    //@ts-ignore
                    onChange={changeTime}
                  />
                </EditFlightsDatePickerStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <SubmitButton style={{
                width: "80%"
              }} onClick={props.Edit ? UPDATE_Flight : addFlight}>
                {props.Edit.flightNumber ? "Update" : "SUBMIT"}
              </SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default AddFlightDetailsModal;
