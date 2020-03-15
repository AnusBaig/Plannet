import React, { useState, useCallback, useEffect, useRef } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Global } from "@emotion/core";
import Input from "src/Components/Input";
import Modal from "src/Components/Modal";
import { DATE_FORMAT } from "src/constants";
import {
  // EditFlightDetailsBodyStyled,
  // // EditFlightDetailsDescriptionStyled,
  // EditFlightDetailsFieldStyled,
  // EditFlightDetailsFieldTitleStyled,
  // EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled
} from "./EditFlightDetails.modal.styled";
import { calendarStyles } from "src/Components/DatePickerRange/DatePickerRange.styled";
import "react-day-picker/lib/style.css";

import {
  flightLegForTripGuests,
  flightLegsForTripGuests
} from "src/Providers/Trips/Trip.reducer";
import { SubmitButton, ModalBackdropStyled, ModalContainerStyled } from "../../Accommodation/Modals/AddPlaceDetails.modal.styled";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "src/shared/assets/arrow-right.svg";
import {
  SmallTextDiv, TextDiv, EditFlightDetailsDescriptionStyled,
  EditFlightDetailsBodyStyled,
  // EditFlightDetailsDescriptionStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldTitleStyled,
  EditFlightDetailsFieldInputStyled,
} from "../AddFlightDetailModal/AddFlightDetails.modal.styled";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { useAuth } from "src/Providers/Auth";

interface EditFlightDetailsModalProps {
  toggle(): void;
  onConfirm(
    flightLeg: flightLegForTripGuests,
    flightTrip: flightLegsForTripGuests
  ): void;
  onCancel?(): void;
  modalEditFlightDetailsData: {
    flightLeg: flightLegForTripGuests;
    flightTrip: flightLegsForTripGuests | any;
  };
  open: boolean
}

const EditFlightDetailsModal: React.FC<EditFlightDetailsModalProps> = ({
  toggle,
  onConfirm,
  onCancel,
  modalEditFlightDetailsData,
  open
}) => {
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  const [FlightOrigin, setFlightOrigin] = useState(
    modalEditFlightDetailsData.flightLeg.origin || ""
  );
  const [FlightDestination, setFlightDestination] = useState(
    modalEditFlightDetailsData.flightLeg.destination || ""
  );
  const [FlightNumber, setFlightNumber] = useState(
    modalEditFlightDetailsData.flightLeg.flightNumber || ""
  );
  const [FlightArrivalDate, setFlightArrivalDate] = useState(
    modalEditFlightDetailsData.flightLeg.departureDate || ""
  );
  const [FlightDepartureDate, setFlightDepartureDate] = useState(
    modalEditFlightDetailsData.flightLeg.arrivalDate || ""
  );
  const { currentUser } = useAuth();
  const { state, dispatch } = useApi("transportationLeg/updateFlightLeg", 'put');

  const handleChangeFlightOrigin = useCallback(ev => {
    setFlightOrigin(ev.target.value);
  }, []);

  const handleChangeFlightDestination = useCallback(ev => {
    setFlightDestination(ev.target.value);
  }, []);

  const handleChangeFlightNumber = useCallback(ev => {
    setFlightNumber(ev.target.value);
  }, []);

  const handleChangeFlightArrivalDate = useCallback(arrivalDate => {
    setFlightArrivalDate(arrivalDate);
  }, []);

  const handleChangeFlightDepartureDate = useCallback(departureDate => {
    setFlightDepartureDate(departureDate);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(
      {
        id: modalEditFlightDetailsData.flightLeg.id,
        origin: FlightOrigin,
        destination: FlightDestination,
        flightNumber: FlightNumber,
        arrivalDate: FlightArrivalDate,
        departureDate: FlightDepartureDate
      },
      modalEditFlightDetailsData.flightTrip
    );
  }, [
    FlightOrigin,
    FlightDestination,
    FlightNumber,
    FlightArrivalDate,
    FlightDepartureDate,
    onConfirm,
    modalEditFlightDetailsData.flightLeg.id,
    modalEditFlightDetailsData.flightTrip
  ]);
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  useLockBodyScroll();
  const Submit = () => {
    let tripId =
      dashboardOverview && dashboardOverview.tripLegs.length ? dashboardOverview.tripLegs[0].TripId : 1;
    let Obj = {
      type: modalEditFlightDetailsData.flightLeg.type,
      origin: FlightOrigin,
      destination: FlightDestination,
      flightNumber: FlightNumber,
      departureTime: new Date(FlightDepartureDate).toTimeString(),
      departureDate: new Date(FlightDepartureDate).toLocaleDateString(),
      arrivalTime: new Date(FlightArrivalDate).toTimeString(),
      arrivalDate: new Date(FlightArrivalDate).toLocaleDateString(),
      tripId,
      transportationLegId: modalEditFlightDetailsData.flightLeg.id
    }
    dispatch({ type: "UPDATE_TRANSPORTATION_LEG", payload: { params: Obj } });
  }
  function dismiss() {
    //@ts-ignore
    modalBackdropRef.current.classList.remove("fade-in");
    //@ts-ignore
    modalContainerRef.current.classList.remove("fade-in");

    setTimeout(() => {
      //@ts-ignore
      onCancel();
    }, 200);
  }

  useEffect(() => {
    if (open) {
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
  }, [open]);
  const handleClickOutside = () => {
    if (open) {
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
          height: '84vh',
          width: SmallScreen ? '80%' : 'auto',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: "329px",
            margin: "15px"
          }}
        >
          <EditFlightDetailsBodyStyled>
            <EditFlightDetailsDescriptionStyled>
              05/07/20
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
              <TextDiv>New York, NY</TextDiv>
              <div
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px"
                }}
              >
                <ArrowRight color="blue" />
              </div>
              <TextDiv>Caracas, VE</TextDiv>
            </div>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  value={FlightNumber}
                  onChange={handleChangeFlightNumber}
                  label="Flight Number"
                  style={{ flex: 1, height: "48px", maxWidth: "80%" }}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  value={FlightOrigin}
                  onChange={handleChangeFlightOrigin}
                  label="Origin"
                  style={{ flex: 1, height: "48px", maxWidth: "80%" }}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  value={FlightDestination}
                  onChange={handleChangeFlightDestination}
                  style={{ flex: 1, height: "48px", maxWidth: "80%" }}
                  label="Destination"
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <DayPickerInput
                  value={FlightArrivalDate}
                  format={DATE_FORMAT}
                  //@ts-ignore
                  dayPickerProps={{
                    disabledDays: { before: FlightDepartureDate },
                    month: FlightDepartureDate
                  }}
                  label="Arrival Time"

                  onDayChange={handleChangeFlightArrivalDate}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <DayPickerInput
                  value={FlightDepartureDate}
                  format={DATE_FORMAT}
                  placeholder="Departure Time"
                  onDayChange={handleChangeFlightDepartureDate}
                  // style={{ flex: 1, height: "48px", maxWidth: "80%" }}
                />

              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <SubmitButton onClick={() => Submit()} style={{
                width: "80%",
                marginLeft: "0"
              }}>SUBMIT</SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>

  );
};

export default EditFlightDetailsModal;
