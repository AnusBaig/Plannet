import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import SelectionCard from "src/Components/SelectionCard";

import {
  CityNameStyled,
  CityList,
  SelectionContainerStyled,
  TransportationContainerStyled,
} from "./Transportation.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
} from "../jointrip.styled";

import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as CarIcon } from "src/shared/assets/car-big.svg";
import { ReactComponent as SelectedCarIcon } from "src/shared/assets/selected-car.svg";
import { ReactComponent as BoatIcon } from "src/shared/assets/boat-big.svg";
import { ReactComponent as GlobeIcon } from "src/shared/assets/globe.svg";
import { ReactComponent as TrainIcon } from "src/shared/assets/train-big.svg";
import { ReactComponent as AirplaneIcon } from "src/shared/assets/airplane-big.svg";
import { ReactComponent as AirplaneSelectedIcon } from "src/shared/assets/airplane-selected.svg";
import { ReactComponent as BoatSelectedIcon } from "src/shared/assets/boat-selected.svg";
import { ReactComponent as TrainSelectedIcon } from "src/shared/assets/train-selected.svg";
import { ReactComponent as BigGlobeIcon } from "src/shared/assets/globe-2.svg";
import { ReactComponent as GlobeIconSelected } from "src/shared/assets/globe-selected.svg";

import TransportationCard from "src/Components/TransportationCard";
import useApi from "src/shared/hooks/useApi";
import { useAuth } from "src/Providers/Auth";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import Whoops from "src/Components/Whoops";


const Transportation: React.FC<StepProps> = data => {
  //@ts-ignore
  const { newTrip, joinTrip, dispatch: tripDispatch, handleNext, handleBack, } = data;
  const { state, dispatch } = useApi("trip/rsvpSpecifyTransportationType", "post");
  const [userResponse, setUserResponse] = useState();
  const [selected, setSelected] = useState<number>(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [transportationResponse, setTransportationResponse] = useState<any>({});
  const { currentUser } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showWhoops, setShowWhoops] = useState(false);

  let cities = state.data && joinTrip.transportationLegs ? joinTrip.transportationLegs : []



  const dates = ["05/16/20 ", "05/11/20", "05/07/20 "];

  const goForward = useCallback(() => {
    handleNext("Step4");
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step3");
  }, [handleBack]);

  const handleTransportCardClick = (index: number) => {
    setSelected(index);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  const smallScreen = useMediaQuery('MOBILE');
  const xsScreen = useMediaQuery('XS');

  console.log('xsScreen '+ xsScreen, 'smallScreen ' +  smallScreen);

  const handleTransportSelect = () => {
    if (userResponse === 'skip') {
      setShowWhoops(true)
    } else {
      console.log(cities, selected)
    
      if (cities[selected]) {
        let newResponse: { [key: number]: string; } = {}
        cities[selected].tripTransport = userResponse
        newResponse[selected] = userResponse;
        let tripGuestId = newTrip && newTrip.tripGuests && newTrip.tripGuests.filter((d) => {
          return currentUser && (d.email === currentUser.email)
        })
        if (newTrip) {
          createTrip({
            tripGuestId: tripGuestId && tripGuestId[0] && tripGuestId[0].id,
            tripId: newTrip && newTrip.id,
            transportationLegId: cities[selected].id,
            transportationType: userResponse 
          })
        }
        setTransportationResponse({ ...transportationResponse, ...newResponse });
        setCompleted({ ...completed, [selected]: true });
      }
      console.log(transportationResponse)
      if (Object.keys(transportationResponse).length == cities.length - 1) {
        goForward();
      } else {
        let newSelected = selected + 1;
        setSelected(cities[newSelected] ? newSelected : cities.findIndex((a: any) => !a.tripTransport));
        setActiveIndex(newSelected)
        scrollToTop()
      }
    }
  }
  const createTrip = useCallback(params => {
    if (params) {


      return dispatch({ type: "JOIN_TRIP", payload: { params } })
    }
  },
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data)
  }, [state.api, state]);

  const setTrip = useCallback(
    (trip) => {
      if (trip.trip) {
        tripDispatch({ type: "RSVP_ARRIVAL_DEPARTURE", payload: trip });
      }
    },
    [tripDispatch]
  );
  if (!newTrip) return null;
  if (showWhoops) {
    return (
      <Whoops
        icon={BigGlobeIcon}
        onGoBack={() => setShowWhoops(false)}
        message="We don’t currently support this option, but it’s coming shortly!"
      />
    )
  }
  return (
    <StepContainerStyled>
      <TransportationContainerStyled>
        <CityList
          id = "joinTripTransportationCityListDiv"
        >
          {smallScreen && activeIndex > 0 &&
            <ChevronLeftIcon
              style={{
                position: "absolute",
              top: "43%",
                

                height: "10%",
                width: "10%",
                left: 0,
                cursor: "pointer",
              }}
              onClick={() => {
                if (activeIndex !== 0) {
                  setActiveIndex(activeIndex - 1)
                }
              }} />
          }
          {smallScreen ?
            cities.map((value: any, index: any) => {
              if (index === activeIndex)
                return (<TransportationCard
                  
                  date={value.arrivalDate}
                  origin={value.origin ? value.origin : ""}
                  destination={value.destination}
                  cardSelected={selected === index}
                  cardCompleted={!!completed[index]}
                  onClick={() => handleTransportCardClick(index)}
                  tag={transportationResponse[index] !==
                    undefined ? transportationResponse[index] : ""}
                />)
            })
            : cities.map((value: any, index: any) => {
              return (<TransportationCard
                date={value.arrivalDate}
                origin={value.origin ? value.origin : ""}
                destination={value.destination}
                cardSelected={selected === index}
                cardCompleted={!!completed[index]}
                onClick={() => handleTransportCardClick(index)}
                tag={transportationResponse[index] !==
                  undefined ? transportationResponse[index] : ""}
              />)
            })}
          {smallScreen && activeIndex !== cities.length - 1 &&
            <ChevronLeftIcon style={{
              position: "absolute",
              top: "43%",
              left: " 85%",
              height: "10%",
              width: " 10%",
              cursor: "pointer",
              transform: "rotate(180deg)",
            }}
              onClick={() => {
                if (activeIndex !== cities.length - 1) {
                  setActiveIndex(activeIndex + 1)
                }
              }}
            />
          }
        </CityList>
        <SelectionContainerStyled
        >
          <QuestionStyled>
            How will you be traveling from{' '}
            <CityNameStyled>
              {cities[selected] && cities[selected].origin}
            </CityNameStyled> {' '}to{' '}
            <CityNameStyled>
              {cities.destination}
            </CityNameStyled>?
          </QuestionStyled>
          <BackButtonStyled
          style={smallScreen ? {top: "13%"} : {}}
          onClick={goBack}>
            <ChevronLeftIcon />
          </BackButtonStyled>

          <SelectionBoxContainerStyled
            width="516px"
            wrap="wrap"
        id = "joinTripTransportTypeDiv"

          >
            <SelectionCard
              icon={!smallScreen ? AirplaneIcon : null}
              selectedIcon={!smallScreen ? AirplaneSelectedIcon : null}
              label="Airplane"
              onClick={() => setUserResponse('airplane')}
              selected={userResponse === 'airplane'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? TrainIcon : null}
              selectedIcon={!smallScreen ? TrainSelectedIcon : null}
              label="Train"
              onClick={() => setUserResponse('train')}
              selected={userResponse === 'train'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? CarIcon : null}
              selectedIcon={!smallScreen ? SelectedCarIcon : null}
              label="Car"
              onClick={() => setUserResponse('car')}
              selected={userResponse === 'car'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? GlobeIcon : null}
              selectedIcon={!smallScreen ? GlobeIconSelected : null}
              label="Skip For Now"
              onClick={() => setUserResponse('skip')}
              selected={userResponse === 'skip'}
              margin="24px"
            />
          </SelectionBoxContainerStyled>
          <Button
            glow
            onClick={handleTransportSelect}
            width="184px"
      style={xsScreen ? {width: "80%"} : smallScreen ? {width: "40%"}  : {}}

            // style={smallScreen ? {width: "50%"} : xsScreen ? {border: "2px solid red"} : {} }
            disabled={!userResponse}
          >
            {cities.find((c: any) => !c.tripTransport) ? 'Next' : 'Confirm'}
          </Button>
        </SelectionContainerStyled>
      </TransportationContainerStyled>

    </StepContainerStyled>
  );
};

export default Transportation;
