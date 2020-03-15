import React, { useState, useEffect, useRef } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Global } from "@emotion/core";
import Input from "src/Components/Input";
import { DATE_FORMAT } from "src/constants";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import { ReactComponent as ArrowRight } from "src/shared/assets/arrow-right.svg";

import {
  EditFlightDetailsBodyStyled,
  EditFlightDetailsDescriptionStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldTitleStyled,
  EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled,
  ModalBackdropStyled,
  ModalContainerStyled,
  SmallTextDiv,
  TextDiv,
  SubmitButton,
  EditFlightDetailsDescriptionSmallStyled
} from "./AddPlaceDetails.modal.styled";
import { calendarStyles } from "src/Components/DatePickerRange/DatePickerRange.styled";
import "react-day-picker/lib/style.css";

import {
  flightLegForTripGuests,
  flightLegsForTripGuests
} from "src/Providers/Trips/Trip.reducer";

const AddFlightDetailsModal = (props: any) => {
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

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
  return (
    <ModalBackdropStyled ref={modalBackdropRef} onClick={handleClickOutside}>
      <ModalContainerStyled
        ref={modalContainerRef}
        onClick={handleContainerClick}
      >
        <div
          style={{
            width: "329px",
            margin: "32px"
          }}
        >
          {/* <Global styles={calendarStyles} /> */}
          <EditFlightDetailsBodyStyled>
            <EditFlightDetailsDescriptionStyled>
              Add Booking Details
            </EditFlightDetailsDescriptionStyled>
            <TextDiv>Caracas, VE</TextDiv>
            <div style={{ width: "100%" }}>
              <SmallTextDiv>ARRIVE</SmallTextDiv>
              <SmallTextDiv>DEPART</SmallTextDiv>
            </div>
            <div style={{ width: "100%" }}>
              <TextDiv>2020-03-23</TextDiv>

              <TextDiv>2020-07-27</TextDiv>
            </div>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  placeholder="ACCOMMODATION TYPE"
                  style={{ flex: 1, height: "48px" }}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  placeholder="ACCOMMODATION NAME"
                  style={{ flex: 1, height: "48px" }}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  style={{ flex: 1, height: "48px" }}
                  placeholder="WEBSITE LINK"
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <SubmitButton>SUBMIT</SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default AddFlightDetailsModal;
