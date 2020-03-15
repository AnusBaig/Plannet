import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import SelectionCard from "src/Components/SelectionCard";
import Whoops from "src/Components/Whoops";

import {
  CityNameStyled,
  CityList,
  SelectionContainerStyled,
  TransportationContainerStyled,
} from "./Step2.styled";

import {
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
} from "../createtrip.styled";
import "src/Pages/CreateTrip/Step11/scrollbarStyled.css"
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as CarIcon } from "src/shared/assets/car-big.svg";

// import { ReactComponent as BoatIcon } from "src/shared/assets/boat-big.svg";
import { ReactComponent as GlobeIcon } from "src/shared/assets/globe.svg";

import { ReactComponent as SelectedCarIcon } from "src/shared/assets/selected-car.svg";


import { ReactComponent as TrainIcon } from "src/shared/assets/train-big.svg";
import { ReactComponent as AirplaneIcon } from "src/shared/assets/airplane-big.svg";
import { ReactComponent as AirplaneSelectedIcon } from "src/shared/assets/airplane-selected.svg";
// import { ReactComponent as BoatSelectedIcon } from "src/shared/assets/boat-selected.svg";
import { ReactComponent as TrainSelectedIcon } from "src/shared/assets/train-selected.svg";
import TransportationCard from "src/Components/TransportationCard";
import useApi from "src/shared/hooks/useApi";
import { ReactComponent as BigGlobeIcon } from "src/shared/assets/globe-2.svg";
import { ReactComponent as GlobeIconSelected } from "src/shared/assets/globe-selected.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
;


const Step2: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/specifyTransportationType", "post");
  const [userResponse, setUserResponse] = useState();
  const [selected, setSelected] = useState<number>(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [transportationResponse, setTransportationResponse] = useState<any>({});

  let cities = newTrip && newTrip.transportationLegs ? newTrip.transportationLegs : []
  const dates = ["05/16/20 ", "05/11/20", "05/07/20 "];
  const [showWhoops, setShowWhoops] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const goForward = useCallback(() => {
    handleNext("Step3");
  }, [handleNext]);

  
  const goBack = useCallback(() => {
    handleBack("Step15");
  }, [handleBack]);

  const handleTransportCardClick = (index: number) => {
    setSelected(index);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  const handleTransportSelect = () => {
    if (userResponse === 'skip') {
      setShowWhoops(true)
    }
    else if (cities[selected]) {
      let newResponse: { [key: number]: string; } = {}
      cities[selected].tripTransport = userResponse
      newResponse[selected] = userResponse;
      if (newTrip) {
        createTrip({
          tripGuestId: newTrip.tripGuest.id,
          tripId: newTrip.tripGuest.TripId,
          transportationLegId: cities[selected].id,
          transportationType: userResponse
        })
      }
      setTransportationResponse({ ...transportationResponse, ...newResponse });
      setCompleted({ ...completed, [selected]: true });

      if (cities.filter((c: any) => !c.tripTransport).length == []) {
        goForward()
      }
      if (Object.keys(transportationResponse).length == cities.length) {
        goForward();
      } else {
        let newSelected = selected + 1;
        setSelected(cities[newSelected] ? newSelected : cities.findIndex((a: any) => !a.tripTransport));
        setActiveIndex(newSelected)
        scrollToTop()
      }
    }
  }
  const smallScreen = useMediaQuery('MOBILE');

  const createTrip = useCallback(params => {
    if (params) {

      return dispatch({ type: "CREATE_TRIP", payload: { params } })
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
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
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
          id="createTripTransportationCityListDiv"
        >
          {smallScreen && activeIndex > 0 &&
            <ChevronLeftIcon
              style={{
                position: "absolute",
                top: "43%",

                height: "10%",
                width: "10%",
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
                  date={value.departureDate}
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
                date={value.departureDate}
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
              left: " 86%",
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
        <SelectionContainerStyled>
          <QuestionStyled>
            How will you be traveling from{' '}
            <CityNameStyled>
              {cities[selected] && cities[selected].origin}
            </CityNameStyled> {' '}to{' '}
            <CityNameStyled>
              {cities[selected] && cities[selected].destination}
            </CityNameStyled>?
          </QuestionStyled>
          <BackButtonStyled onClick={goBack}>
            <ChevronLeftIcon />
          </BackButtonStyled>

          <SelectionBoxContainerStyled
            width="516px"
            wrap="wrap"
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
            disabled={!userResponse}
          >
            {cities.find((c: any) => !c.tripTransport) ? cities.filter((c: any) => !c.tripTransport).length == 1 ? 'confirm' : 'Next' : 'Confirm'}
          </Button>
        </SelectionContainerStyled>
      </TransportationContainerStyled>

    </StepContainerStyled>
  );
};

export default Step2;
