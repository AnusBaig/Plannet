import React, { useState, useEffect, useRef } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Global } from "@emotion/core";
import Input from "src/Components/Input";
import { DATE_FORMAT } from "src/constants";
import '../../../CreateTrip/Step11/scrollbarStyled.css'
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import { ReactComponent as ArrowRight } from "src/shared/assets/arrow-right.svg";
import useApi from "src/shared/hooks/useApi";
//@ts-ignore
import Select from 'react-select'

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
import { SelectMenuStyled } from "src/Components/SelectMenu/SelectMenu.styled";

const AddFlightDetailsModal = (props: any) => {
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);
  const { state, dispatch } = useApi(props.EditObj ? '/accommodation/update' : "/accommodation/create", props.EditObj ? "put" : "post");
  const [type, setType] = useState('airbnb')
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [validLink, setValidLink] = useState(true)

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
  console.log('props.EditObj', props)
  useEffect(() => {
    if (props.EditObj) {
      var value = props.EditObj;
      setType(value.type ? value.type : "")
      setName(value.name ? value.name : "")
      setLink(value.link ? value.link : "")
    }
  }, [])
  
  useEffect(() => {
    console.log('stateUpdated', state, props.EditObj)
    //@ts-ignore
    if (state && state.params) {
      //@ts-ignore
      props.updateAccommodation(state.params)
    }
  }, [state])
  const customStyleForSelect = {
    fontSize: 14,
    color: 'blue',
    position: 'relative',
    zIndex: 9999,
    //@ts-ignore    
    control: styles => ({ ...styles, backgroundColor: 'white',
  
    position: 'relative',
    zIndex: 9999,
    width: '100%',
   }),
    //@ts-ignore    
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        position: 'relative',
        zIndex: 9999,
      };
    },
  };
  
  const options = [
    {label : "Airbnb",value:"airbnb"},
    {label : "Hotel",value:"hotel"},
    {label : "Local",value:"local"},
  ]
  const handleChange = (e: any) => {
    if (e && e.target && (e.target.name === 'name' || e.target.name === 'link')) {
      const { name, value } = e.target;
      console.log('typetype', e)
      if (name === "name") setName(value);
      if (name === "link") {
        setLink(value);
        setValidLink(true)
      }
    } else {
      setType(e.value);
    }
  };
  const addBooking = async () => {
    let linkReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    if (linkReg.test(link)) {
      let { tripLegId } = props
      const newBookingData = {
        tripLegId,
        type,
        name,
        link,
      };
      await dispatch({ type: "ADD_BOOKING_DETAILS", payload: { params: newBookingData } });
      props.close()
    } else {
      setValidLink(false)
    }

  };
  const UpdateBooking = async () => {
    let linkReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    if (linkReg.test(link)) {
      let { tripLegId } = props
      const newBookingData = {
        accommodationId: props.EditObj.accommodationId,
        type,
        name,
        link,
      };
      await dispatch({ type: "ADD_BOOKING_DETAILS", payload: { params: newBookingData } });
      props.close()
    } else {
      setValidLink(false)
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
              {props.EditObj.name || props.EditObj.link ? 'Update' : 'Add'} Booking Details
            </EditFlightDetailsDescriptionStyled>
            <TextDiv>{props.EditObj.location}</TextDiv>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '67%'}}>
              <div>
                <div>
                  <SmallTextDiv>ARRIVE</SmallTextDiv>
                </div>
                <div>
                  <TextDiv>{props.EditObj.startDate}</TextDiv>
                </div>
              </div>  
              <div>
                <div>
                  <SmallTextDiv>DEPART</SmallTextDiv>
                </div>
                <div>
                  <TextDiv>{props.EditObj.endDate}</TextDiv>
                </div>
              </div>  
            </div>  
            <EditFlightDetailsFieldStyled style={{zIndex: 100}}>
              <EditFlightDetailsFieldInputStyled style={{zIndex: 100}}>
                <SelectMenuStyled>
                    
                <Select options={options}
                    name='type' onChange={handleChange} 
                    styles={customStyleForSelect}     
                    isSearchable={false}         
                    placeholder={'ACCOMMODATION TYPE'} 
                />
                </SelectMenuStyled>
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  label="ACCOMMODATION NAME"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  style={{ flex: 1, height: "48px" }}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>

            <EditFlightDetailsFieldStyled>
              <EditFlightDetailsFieldInputStyled>
                <Input
                  name="link"
                  value={link}
                  onChange={handleChange}
                  style={{ flex: 1, height: "48px" }}
                  label="WEBSITE LINK"
                  errorText={validLink ? '' : 'Please enter valid url'}
                />
              </EditFlightDetailsFieldInputStyled>
            </EditFlightDetailsFieldStyled>
            <EditFlightDetailsFieldStyled>
              <SubmitButton style={{ width: "50%" , marginTop: '5px'}} onClick={props.EditObj ? UpdateBooking : addBooking}>{props.EditObj.name || props.EditObj.link ? "UPDATE" : "SUBMIT"}</SubmitButton>
            </EditFlightDetailsFieldStyled>
          </EditFlightDetailsBodyStyled>
        </div>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default AddFlightDetailsModal;
