import React, { useCallback, useState, useEffect } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import RectanguleShadow from "src/Components/RectanguleShadow";
import Calendar from "src/Components/Calendar";

import {
  ContainerStyled,
  EditStyled,
  ListStyled,
  ListBoxStyled,
  IndexStyled,
  CityNameStyled,
  EditButtonStyled,
  DateStyled,
} from "./Step14.styled";
import {
  QuestionStyled,
  BackButtonStyled,
} from "../createtrip.styled";
import { ReactComponent as ChevronLeftIcon } from "src/shared/assets/chevron-left.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel-blue.svg";

import "react-day-picker/lib/style.css";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { UserDetailWrapper } from "../Step51/Step51.styled";
import useApi from "src/shared/hooks/useApi";
import _ from "lodash"
import moment from "moment";

const Step14: React.FC<StepProps> = data => {
  const { newTrip, dispatch: tripDispatch, handleBack, handleNext } = data;
  const [range, setRange] = useState<{ from: any, to: any }>({
    from: (newTrip && newTrip.startDate) || undefined,
    to: (newTrip && newTrip.endDate) || undefined
  });
  const { state, dispatch } = useApi("tripLeg/edit", "put");
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    scrollToTop()
  }, [])
  const [editObj, setEditObj] = useState()
  let cities = newTrip && newTrip.tripLegs ? newTrip.tripLegs : []
  const [editIndex, setEditIndex] = useState<number>(-1);
  const dates = ["05/07/20 - 05/11/20", "05/07/20 - 05/11/20", "05/07/20 - 05/11/20"];

  // useEffect(() => {
  //   let { from, to } = range
  //   dispatch({
  //     type: "UPDATE_NEW_TRIP",
  //     payload: { startDate: range.from, endDate: range.to }
  //   });
  // }, [dispatch, range]);

  const goForward = useCallback(() => {
    handleNext("Step15");
  }, [handleNext]);

  const goBack = useCallback(() => {
    handleBack("Step13");
  }, [handleBack]);
  const createTrip = useCallback(params => {
    return dispatch({ type: "CREATE_TRIP", payload: { params } })
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
        // goForward();

      }
    },
    [tripDispatch]
  );
  const To_From_Date_Diffrence = (startDate: any, endDate: any) => {
    if (startDate && endDate) {
      console.log({ startDate, endDate })
      return moment.duration(moment(endDate).diff(moment(startDate))).asDays()
    } else {
      console.log({ startDate, endDate })
    }
  }
  const Updated_Date_With_Same_diffrence = (startDate: any, diffrence: any) => {
    var d = new Date(startDate)
    // console.log(moment.duration(moment(diffrence).diff(moment(startDate))).asDays())
    //@ts-ignore
    // var date = moment(d.getTime() + diffrence * 24 * 3600 * 1000).format('YYYY-MM-DD');
    // var date = d.setDate(d.getTime() + diffrence)
    var date = moment(d).add(diffrence, 'days');
    return date
  }
  const onUpdate = () => {
    let obj = cities[editIndex]
    var EndDateDiffrence = To_From_Date_Diffrence(_.cloneDeep(obj.endDate), _.cloneDeep(range.to))
    obj.startDate = range.from
    obj.endDate = range.to
    createTrip({ ...obj, tripLegId: obj.id })
    for (var i = 0; i < cities.length; i++) {
      if (i > editIndex) {

        if (cities[i]) {

          let nextIndex = i

          let Nextobj = cities[nextIndex]
          //@ts-ignore
          Nextobj.startDate = Updated_Date_With_Same_diffrence(_.cloneDeep(cities[i].startDate), EndDateDiffrence);
          //@ts-ignore
          Nextobj.endDate = Updated_Date_With_Same_diffrence(_.cloneDeep(cities[i].endDate), EndDateDiffrence)

          createTrip({ ...Nextobj, tripLegId: Nextobj.id })
        }

      }
    }
    setEditIndex(-1);
  };

  const onEdit = (index: any, obj: any) => {
    setEditIndex(index)
    setEditObj(obj)
    setRange({
      from: obj.startDate,
      to: obj.endDate
    })
  }
  let Rangeobj = {
    from: range && range.from ? new Date(range.from) : new Date(),
    to: range && range.to ? new Date(range.to) : new Date(),
  }
  const smallScreen = useMediaQuery("SM");
  var date: any;
  if (cities[editIndex - 1]) {
    if (cities[editIndex - 1].endDate) {
      // @ts-ignore
      if (cities[editIndex].startDate.getTime) {
        date = cities[editIndex].startDate
        date.setDate(date.getDate());
      } else {
        // @ts-ignore
        date = new Date(cities[editIndex].startDate)
        date.setDate(date.getDate());
      }
    }
  }else{
    date = new Date();
    date.setDate(date.getDate() - 1);
  }
  if (!newTrip) return null;

  return (
    <ContainerStyled>
      <QuestionStyled>
        Let’s confirm your dates!
      </QuestionStyled>
      <BackButtonStyled onClick={goBack}>
        <ChevronLeftIcon />
      </BackButtonStyled>
      <ListBoxStyled isEditing={editIndex >= 0}>
        <RectanguleShadow style={{ boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)' }}>
          {cities.map((value, index) => {
            return index === editIndex ? (
              <>
                <EditStyled key={index} style={{ width: '100%' }}>
                  <RectanguleShadow style={{
                    padding: 0
                  }}>
                    <ListStyled style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <IndexStyled>
                        {editIndex + 1}
                      </IndexStyled>
                      <UserDetailWrapper>

                        <CityNameStyled>
                          {value.location}
                        </CityNameStyled>
                        <DateStyled>
                          {value.startDate && new Date(value.startDate).toLocaleDateString()} - {value.endDate && new Date(value.endDate).toLocaleDateString()}
                        </DateStyled>
                      </UserDetailWrapper>
                      <CancelIcon onClick={() => setEditIndex(-1)} />
                    </ListStyled>
                    <hr />
                    <Calendar
                      range={Rangeobj}
                      setRange={(ev: any) => setRange(ev)}
                      disableDates={date}

                    />
                    <Button style={{
                      width: smallScreen ? `80%` : '160px',
                      padding: smallScreen ? ' 0px 30px' : '10px 30px'
                    }} onClick={onUpdate}> UPDATE</Button>
                  </RectanguleShadow>
                </EditStyled>
                {index + 1 != cities.length
                  ? <hr />
                  : null
                }
              </>
            ) : (
                <>
                  <ListStyled key={index}>
                    <IndexStyled>
                      {index + 1}
                    </IndexStyled>
                    <UserDetailWrapper style={{ marginRight: 14 }}>
                      <CityNameStyled >
                        {value.location}
                      </CityNameStyled>
                      <DateStyled>
                        {value.startDate && new Date(value.startDate).toLocaleDateString()} - {value.endDate && new Date(value.endDate).toLocaleDateString()}
                      </DateStyled>
                    </UserDetailWrapper>
                    <EditButtonStyled
                      onClick={() => onEdit(index, value)}>
                      Edit
                    </EditButtonStyled>
                  </ListStyled>
                  {index + 1 != cities.length
                    ? <hr />
                    : null
                  }
                </>
              );
          })}
        </RectanguleShadow>
      </ListBoxStyled>

      <Button
        glow
        onClick={goForward}
        width="184px"
        disabled={editIndex >= 0}
      >
        CONFIRM
      </Button>
    </ContainerStyled>
  );
};

export default Step14;
