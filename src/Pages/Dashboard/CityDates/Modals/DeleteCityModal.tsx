import React, { useState, useEffect, useRef, useCallback } from "react";
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
  SubmitButton
} from "../../Accommodation/Modals/AddPlaceDetails.modal.styled";
// } from "./AddPlaceDetails.modal.styled";
import "react-day-picker/lib/style.css";
import useApi from "src/shared/hooks/useApi";
import { useDashboardOverview } from "src/Providers/DashboardOverview";

const DeleteCityModal = (props: any) => {
    
  const { state, dispatch } = useApi(
    `/tripLeg/delete/${props.deleteLeg.id}`,
    "delete"
  );

  const { state: dashboardOverviewState, dispatch: dashboardOverviewDispatch } = useApi("trip/getDashboardData/" + props.currentUser, "get");

  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();

//   useEffect(() => {
//     if (!state.api) return;

//     dashboardOverviewDispatch({ type: "GET_DASHBOARD" });

//     return () => {
//       dispatchDashboardOverview({ type: "CLEAR_DASHBOARD" });
//     };
//   }, [dashboardOverviewState.api, dispatchDashboardOverview])

//   const {
//     state: dashboardOverviewState,
//     dispatch: dashboardOverviewDispatch
//   } = useApi("trip/getDashboardData/" + props.currentUserId, "get");
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  useLockBodyScroll();

  const updateDashboard = () => {
    //   alert("asdasd")
    dashboardOverviewDispatch({ type: "GET_DASHBOARD" });
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


//   useEffect(() => {
//     // dispatch({ type: "GET_DASHBOARD" })
//   }, [state, dispatch]);
//   const getDashboardData = useCallback(
//     () => dashboardOverviewDispatch({ type: "GET_DASHBOARD" }),
//     [dashboardOverviewDispatch]
//   );

//   useEffect(() => {
//     if (!state.api) return;
//     getDashboardData();

//         if (dashboardOverviewState.data.currentDashboard) {
//             dispatchDashboardOverview({
//               type: "LOAD_DASHBOARD_OVERVIEW",
//               payload: dashboardOverviewState.data.currentDashboard
//             });
          
//             };
//   }, [state.api, dispatchDashboardOverview, getDashboardData]);

//   useEffect(() => {
//     if (state.data.currentDashboard) {
//       dispatchDashboardOverview({
//         type: "LOAD_DASHBOARD_OVERVIEW",
//         payload: state.data.currentDashboard
//       });
//     }
//   }, [state.data.currentDashboard, dispatchDashboardOverview]);
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
            Are You sure You want to delete this trip leg?
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
                style={{
                  width: "100%",
                  border: "2px solid #1285d8",
                  backgroundColor: "white",
                  color: "#1285d8"
                }}
                onClick={() => {
                props.close()
                    
                }}
              >
                No
              </SubmitButton>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled style={{ width: "40%" }}>
              <SubmitButton
                onClick={async () => {
                  await dispatch({
                    type: "DELETE_TRIP_LEG",
                    payload: props.deleteLeg
                  });
                  setTimeout(() => {
                    updateDashboard();
                  }, 1500)

                  
                }}
                style={{ width: "100%" }}
              >
                Yes
              </SubmitButton>
            </EditFlightDetailsFieldStyled>
          </div>
        </EditFlightDetailsBodyStyled>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default DeleteCityModal;
