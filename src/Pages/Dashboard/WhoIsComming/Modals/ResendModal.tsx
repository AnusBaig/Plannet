import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    EditFlightDetailsBodyStyled,
    EditFlightDetailsFieldStyled,
    ModalBackdropStyled,
    ModalContainerStyled,
    SubmitButton
} from "../../Accommodation/Modals/AddPlaceDetails.modal.styled"
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";

const ResendModal = (props: any) => {
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
        style={{
          // border: "2px solid red",
          height: "216px",
          width: "290px"
        }}
      >
        <EditFlightDetailsBodyStyled
          style={{
            // border: '2px solid black',

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0 10px",
            height: "216px",
            boxSizing: "border-box"
          }}
        >
          <span
            style={{
              alignSelf: "flex-end",
              fontSize: "1.8em",
              color: "black"
            }}
            onClick={() => props.close()}
          >
            &times;
          </span>
          <p
            style={{
              fontSize: "1.2em",
              padding: "0 10px",
              textAlign: "center",
              color: "black"
            }}
          >
            Invite has been sent
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "10px"
            }}
          >
            <EditFlightDetailsFieldStyled style={{ width: "40%" }}>
              <SubmitButton
                onClick={() => {
                    dismiss()                 
                }}
                style={{ width: "100%" }}
              >
                OK
              </SubmitButton>
            </EditFlightDetailsFieldStyled>
          </div>
        </EditFlightDetailsBodyStyled>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default ResendModal;
