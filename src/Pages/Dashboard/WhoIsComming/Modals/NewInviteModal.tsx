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
  const { state, dispatch } = useApi("/tripGuest/invite");
  let idFor = window.location.pathname.split('/')[2]
  const {
    state: dashboardOverviewState,
    dispatch: dashboardOverviewDispatch
  } = useApi("trip/getDashboardData/" + idFor , "get");

  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();

  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true)
  const [validEmailText, setValidEmailText] = useState('')
  const {
    state: { newTrip },
    dispatch: useTripDispatch
  } = useTrip();
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);


  useLockBodyScroll();
  useEffect(() => {
  }, [newTrip]);


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
    if (name === "firstName" || name === undefined) { 
      setFirstNameError(false)
      setFirstName(value); }
    if (name === "lastName") { 
      setLastNameError(false)
      setLastName(value); }
    if (name === "email") {
      setEmail(value)
      setValidEmail(true) 
      setEmailError(false)

    };
  };
  useEffect(() => {
  }, [dashboardOverview]);

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
  const validateEmail = (checkEmail: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(checkEmail).toLowerCase());
  }

  const addNewInvite = async () => {
    let data = props.data
    let found = false
    // console.log('data', data)
    //@ts-ignore                
    data && data.map((d: object) => {
      //@ts-ignore                
      if (d.email == email) {
        found = true
      }
      console.log('data', d, email, found)          
    })
    console.log('found', found)
    if (found) {
      setValidEmailText("This email is already in use")
      setValidEmail(false) 
      setEmailError(true) 
    } else {
      setEmailError(false);
      setFirstNameError(false);
      setLastNameError(false);
      if (validateEmail(email) && firstName && lastName) {
        const { TripId: tripId, legOrder } =
          dashboardOverview && dashboardOverview.tripLegs[0];
        const newTripData = {
          tripId,
          firstName,
          lastName,
          email,
        };
        await dispatch({ type: "ADD_NEW_INVITE", payload: { params: newTripData } });
        setTimeout(() => {
            dashboardOverviewDispatch({ type: "GET_DASHBOARD" });
        }, 1500)
      } else {
        setValidEmail(false);
        setValidEmailText("Enter Valid Email")
      }
      if(!firstName) setFirstNameError(true);
      if(!lastName) setLastNameError(true);
      if(!validateEmail(email)) setEmailError(true);
    }
  };
  useEffect(() => {
    if (
      dashboardOverviewState.data &&
      dashboardOverviewState.data.currentDashboard
    ) {
      props.settingData(dashboardOverviewState.data.currentDashboard)
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
            width: "329px",
            margin: "32px"
          }}
        >
          <EditFlightDetailsBodyStyled>
            
          <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }}
                >
                  <div style={{color: '#373948', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '21px'}}>
                    Invite Friend
                  </div>  
                  <span onClick={() => props.close()} style={{
                    cursor: 'pointer',
                    fontSize: "1.8em",
                    color: "black"
                  }}>
                    &times;
                  </span>
                </div>  
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  label="FIRST NAME"
                  style={firstNameError ? {border: "1px solid red", flex: 1, height: "48px"} : { flex: 1, height: "48px" }}
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  errorText={firstNameError ? "should not be empty" : ""}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                    label="LAST NAME"
                  style={lastNameError ? {border: "1px solid red", flex: 1, height: "48px"} : { flex: 1, height: "48px" }}
                    
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  errorText={lastNameError ? "should not be empty": ""}

                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                    style={emailError ? {border: '1px solid red',  flex: 1, height: "48px"} : { flex: 1, height: "48px"}}
                    label="EMAIL"
                    name="email"
                    value={email}
                    onChange={handleChange}      
                    validation={!validEmail}
                    errorText={emailError ? validEmailText : ""}       
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled style={{ flex: 1,width: '100%' , height: "48px" }}>
              <EditFlightDetailsFieldInputStyled>
                  <SubmitButton onClick={addNewInvite} style={{ flex: 1, width: '100%', height: "48px" }}>SUBMIT</SubmitButton>
              </EditFlightDetailsFieldInputStyled>    
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default AddCityModal;
