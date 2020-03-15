import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import Button from "src/Components/Button";
import Whoops from "src/Components/Whoops";
import Input from "src/Components/Input";
import AvatarURL from "src/shared/assets/maya.png";
import {
  ContainerStyled,
  InputWrapperStyled,
  CityCardStyled,
} from "./Step11.styled";
import {
  QuestionStyled,
  BackButtonStyled,
  HelpSpeechContainerStyled
} from "../createtrip.styled";
import DragItem from "./DragItem";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as AddIcon } from "src/shared/assets/add-circle.svg";
import { ReactComponent as BigGlobeIcon } from "src/shared/assets/globe-2.svg";
import { useInput } from "src/shared/hooks/useInput";
import useApi from "src/shared/hooks/useApi";
import "./scrollbarStyled.css";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

const Step11: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleNext, handleBack } = data;
  const { state, dispatch } = useApi("trip/addCitiesAndDates", "post");
  const [showWhoops, setShowWhoops] = useState();
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(false)
  const [erorSpeech, setErrorSpeech] = useState(false)
  const [canAdd, setCanAdd] = useState(false);
  const [cities, setCities] = useState<any[]>([]);
  const cityNameInput = useInput();

  const goForward = useCallback(() => {
    handleNext("Step12");
  }, [handleNext]);
  const createTrip = useCallback(
    params => {
      if (params.tripLegs) {
        return dispatch({ type: "CREATE_TRIP", payload: { params } });

      }
    },
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    setTrip(state.data);
  }, [state.api, state]);


  useEffect(() => {
    if (newTrip && newTrip.tripLegs && newTrip.tripLegs.length) {
      setCities(newTrip.tripLegs)
    }
  }, [])
  const setTrip = useCallback(
    trip => {
      if (trip.trip) {
        tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
        goForward();
      }
    },
    [tripDispatch]
  );
  const moveCity = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cities[dragIndex];
      setCities(
        update(cities, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [cities]
  );
  const goBack = useCallback(() => {
    handleBack("Step1");
  }, [handleBack]);
  const smallScreen = useMediaQuery("SM");
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    scrollToTop()
  }, [])

  if (!newTrip) return null;

  if (showWhoops) {
    return (
      <Whoops
        icon={BigGlobeIcon}
        onGoBack={() => setShowWhoops(false)}
        message="We don’t currently support this option, but it’s coming shortly!"
      />
    );
  }
  const onAddCity = () => {
    var sameCity = cities.filter(obj => obj.location === cityName)
    if (!sameCity.length && cityName && canAdd) {
      let obj = {
        id: cities.length + 1,
        startDate: new Date(),
        endDate: new Date(),
        location: cityName
      };
      setError(false)
      setErrorSpeech(false)
      setCanAdd(false)
      setCities([...cities, obj]);
      setCityName("");
    } else if (cityName) {
      setError(true)
    }
    if (sameCity.length) {
      setErrorSpeech(true)
    }
  };

  const onRemoveCity = (value: String) => {
    setCities(
      cities.filter(city => {
        return city !== value;
      })
    );
  };
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  return (
    <DndProvider backend={supportsTouch ? TouchBackend : HTML5Backend}>
      <ContainerStyled>
        <QuestionStyled>
          Great! <br />
          Let’s add your destinations.
        </QuestionStyled>

        <BackButtonStyled onClick={goBack}>
          <ChevronLeftIcon />
        </BackButtonStyled>

        <InputWrapperStyled>
          <Input
            {...cityNameInput}
            label="Enter City"
            value={cityName}
            name={'cityName'}
            style={{
              borderColor: error ? 'red' : '#B7B9BD'
            }}
            onChange={(ev: any) => {
              setCityName(ev.target.value);
              setCanAdd(!!ev.isSelected);
              if (ev.target.value === "") {
                setError(false)

              }
            }}

            type="autocompleteCities"
          />
          {!smallScreen && (
            <>
              <AddIcon
                style={{
                  width: smallScreen ? "20%" : "37px",
                }}
                className={cityName && canAdd && !erorSpeech ? "Colortrue" : ""}
                onClick={() => onAddCity()}
              />
              <AddIcon
                style={{
                  width: smallScreen ? "20%" : "37px",
                  // marginTop: "11px",
                  transform: 'rotate(45deg)',
                  cursor: 'pointer'
                }}
                className={erorSpeech ? "Colortrue2" : "exButon"}
                onClick={() => {
                  setCityName("");
                  setCanAdd(!canAdd);
                  setErrorSpeech(false)
                  setError(false)

                }}

              />
            </>
          )}
        </InputWrapperStyled>
        {smallScreen && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}>
            <Button
              style={{
                width: "40%",
                marginTop: "25px"
              }}
              disabled={!canAdd && !cityName ? true : false}

              onClick={() => onAddCity()}
              variant="secondary">ADD</Button>
            <Button
              style={{
                borderColor: !canAdd && cityName == "" ? "auto" : "#f85353",
                color: !canAdd && cityName == "" ? "auto" : "#f85353",
                width: "40%",
                marginTop: "25px"

              }}
              disabled={!canAdd && !cityName ? true : false}
              onClick={() => {
                setCityName("");
                setCanAdd(!canAdd);
                setErrorSpeech(false)
                setError(false)

              }}
              variant="secondary">CANCEl</Button>
          </div>
        )}
        {error && !canAdd && (
          <HelpSpeechContainerStyled
            width="90%"
            style={{
              overflow: 'hidden',
              transition: "1s",
              // maxHeight: cities.length > 1 ? 500 : 0
            }}
          >
            <img src={AvatarURL} alt="Maya" />
            <p style={{ borderColor: 'red' }}>
              PLease Select correct city
            </p>
          </HelpSpeechContainerStyled>
        )}
        {erorSpeech && (
          <HelpSpeechContainerStyled
            width="90%"
            style={{
              overflow: 'hidden',
              transition: "1s",
              // maxHeight: cities.length > 1 ? 500 : 0
            }}
          >
            <img src={AvatarURL} alt="Maya" />
            <p style={{ borderColor: 'red' }}>
              can't add city more than one time
            </p>
          </HelpSpeechContainerStyled>
        )}
        <CityCardStyled
          className='scroll'
          onDragOver={(event: any) => event.preventDefault()}
        >
          {cities.map((value, index) => (
            <DragItem
              key={index}
              groupName="list-of-cities"
              value={value}
              id={index}
              index={index}
              moveCity={moveCity}
              onRemoveCity={onRemoveCity}
            />
          ))}
        </CityCardStyled>
        {(
          <HelpSpeechContainerStyled
            width="90%"
            style={{
              overflow: 'hidden',
              transition: "max-height 1s",
              maxHeight: cities.length > 1 ? 500 : 0
            }}
          >
            <img src={AvatarURL} alt="Maya" />
            <p>
              Adjust the order of the cities depending on which you are
              traveling to first, etc, etc.
            </p>
          </HelpSpeechContainerStyled>
        )}
        <Button
          glow
          onClick={async () => {
            if (newTrip && newTrip.tripLegs && newTrip.tripLegs.length) {


              if (newTrip && newTrip.tripLegs && newTrip.tripLegs.length !== cities.length) {
                {
                  var tripLegs = newTrip.tripLegs.filter(obj => obj)
                  var newCities = cities.filter((obj,index) => obj !== tripLegs[index])
                  console.log(newCities)
                  await createTrip({
                    tripId: newTrip.tripGuest.TripId,
                    tripStartDate: new Date(),
                    tripEndDate: new Date(),
                    tripLegs: cities
                  });
                }
              } else if (newTrip && newTrip.tripLegs && newTrip.tripLegs.length === cities.length) {
                goForward()
              }
            } else {
              await createTrip({
                tripId: newTrip.tripGuest.TripId,
                tripStartDate: new Date(),
                tripEndDate: new Date(),
                tripLegs: cities
              });
            }

          }
          }
          width={smallScreen ? '80%' : "184px"}
          style={{
            margin: "56px",
            marginBottom: 0
          }}
          disabled={!cities.length}
        >
          Next
        </Button>
      </ContainerStyled>
    </DndProvider>
  );
};

export default Step11;