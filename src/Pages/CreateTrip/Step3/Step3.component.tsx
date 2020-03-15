import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import SelectionCard from "src/Components/SelectionCard";
import {
  CityNameStyled,
  CityList,
  SelectionContainerStyled,
  TransportationContainerStyled,
} from "./Step3.styled";
import {
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as AirbnbIcon } from "src/shared/assets/airbnb.svg";
import { ReactComponent as AirbnbSelectedIcon } from "src/shared/assets/airbnb-selected.svg";
import { ReactComponent as HotelIcon } from "src/shared/assets/hotel.svg";
import { ReactComponent as SelectedHotelIcon } from "src/shared/assets/selected-hotel.svg";
import { ReactComponent as LocalIcon } from "src/shared/assets/local.svg";
import { ReactComponent as SelectedLocalIcon } from "src/shared/assets/selected-local.svg";
import { ReactComponent as IglooIcon } from "src/shared/assets/igloo.svg";
import { ReactComponent as SelectedIglooIcon } from "src/shared/assets/selected-iglo.svg";
import AccomodationCard from "src/Components/AccomodationCard";
import Whoops from "src/Components/Whoops";
import useApi from "src/shared/hooks/useApi";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step3: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/specifyAccommodationType", "post");
  const [userResponse, setUserResponse] = useState();
  const [selected, setSelected] = useState<number>(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [transportationResponse, setTransportationResponse] = useState<any>({});
  const [showWhoops, setShowWhoops] = useState();
  const smallScreen = useMediaQuery('SM');
  const [activeIndex, setActiveIndex] = useState(0);

  let cities = newTrip && newTrip.tripLegs ? newTrip.tripLegs : []

  const dates = ["05/07/20", "05/11/20", "05/16/20 ", "05/16/20 "];
  const createTrip = useCallback(params => {
    // if (params.accommodationType) {

    return dispatch({ type: "CREATE_TRIP", payload: { params } })
    // }
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
  const goForward = useCallback(() => {
    handleNext("Step4");
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step2");
  }, [handleBack]);

  const handleAccommodationCardClick = (index: number) => {
    setSelected(index);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  const handleAccommodationSelect = () => {
    if (userResponse !== 'no') {

      if (cities[selected]) {
        let newResponse: { [key: number]: string; } = {}
        cities[selected].tripTransport = userResponse
        newResponse[selected] = userResponse;
        if (newTrip) {
          createTrip({
            tripId: newTrip.tripGuest.TripId,
            tripLegId: cities[selected].id,
            accommodationType: userResponse,
          })
        }
        setTransportationResponse({ ...transportationResponse, ...newResponse });
        setCompleted({ ...completed, [selected]: true });
        if (!cities.find((c: any) => !c.tripTransport)) {
          goForward()
        }
      }
      if (Object.keys(transportationResponse).length == cities.length) {
        goForward();
      } else {
        let newSelected = selected + 1;
        setSelected(cities[newSelected] ? newSelected : cities.findIndex((a: any) => !a.tripTransport));
        setActiveIndex(newSelected)
        scrollToTop()

      }
    } else {
      setShowWhoops(true)
    }
  };

  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={IglooIcon}
        message="We're not sure what to do next."
        onGoBack={() => setShowWhoops(false)}
      />);
  }

  return (
    <StepContainerStyled>
      <TransportationContainerStyled>
        <CityList>
          {smallScreen && activeIndex > 0 &&
            <ChevronLeftIcon
              style={{
                position: "absolute",
                top: "26%",

                height: "6%",
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
              if (index === activeIndex) {
                return (<AccomodationCard
                  arrivalDate={new Date(value.startDate).toLocaleDateString()}
                  departureDate={new Date(value.endDate).toLocaleDateString()}
                  location={value.location}
                  cardSelected={selected === index}
                  cardCompleted={!!completed[index]}
                  onClick={() => handleAccommodationCardClick(index)}
                  tag={transportationResponse[index] !==
                    undefined ? transportationResponse[index] : ""}
                />)
              }
            }
            )
            : cities.map((value: any, index: any) => {
              return (<AccomodationCard
                arrivalDate={new Date(value.startDate).toLocaleDateString()}
                departureDate={new Date(value.endDate).toLocaleDateString()}
              location={value.location}
                cardSelected={selected === index}
                cardCompleted={!!completed[index]}
                onClick={() => handleAccommodationCardClick(index)}
                tag={transportationResponse[index] !==
                  undefined ? transportationResponse[index] : ""}
              />)
            })}

          {
            smallScreen && activeIndex !== cities.length - 1 &&
            <ChevronLeftIcon style={{
              position: "absolute",
              top: "26%",
              left: " 84%",
              height: "6%",
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
            What type of accommodation will you be using in{' '}
            <CityNameStyled>
              {cities[selected] && cities[selected].location}
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
              icon={!smallScreen ? AirbnbIcon : null}
              selectedIcon={!smallScreen ? AirbnbSelectedIcon : null}
              label="AIRBNB"
              onClick={() => setUserResponse('airbnb')}
              selected={userResponse === 'airbnb'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? HotelIcon : null}
              selectedIcon={!smallScreen ? SelectedHotelIcon : null}
              label="HOTEL"
              onClick={() => setUserResponse('hotel')}
              selected={userResponse === 'hotel'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? LocalIcon : null}
              selectedIcon={!smallScreen ? SelectedLocalIcon : null}
              label="LOCAL"
              onClick={() => setUserResponse('local')}
              selected={userResponse === 'local'}
              margin="24px"
            />
            <SelectionCard
              icon={!smallScreen ? IglooIcon : null}
              selectedIcon={!smallScreen ? SelectedIglooIcon : null}
              label="SKIP FOR NOW"
              onClick={() => setUserResponse('no')}
              selected={userResponse === 'no'}

              margin="24px"
            />
          </SelectionBoxContainerStyled>

          <Button
            glow
            onClick={handleAccommodationSelect}
            width="184px"
            disabled={!userResponse}
          >
            {cities.find((c: any) => !c.tripTransport) ? Object.keys(transportationResponse).length == cities.length - 1 ? 'Confirm' : 'Next' : 'Confirm'}
          </Button>
        </SelectionContainerStyled>
      </TransportationContainerStyled>
    </StepContainerStyled>
  );
};

export default Step3;
