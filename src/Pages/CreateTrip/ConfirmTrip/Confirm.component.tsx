import React, { useCallback, useEffect, useState } from "react";
import { StepProps } from "@dimelo/createtrip";
import Button from "src/Components/Button";
import { useInput } from "src/shared/hooks/useInput";
import dayjs from "dayjs"
import {
  InputStyled, TripDetailStyled, DetailStyled, InviteesStyled, BudgetStyled,
  RsvpStyled, TravelStyled, InviteStyled, AccomodationStyled, DateStyled, CityStyled, OriginStyled, DestinationStyled,
  SpanStyled, EmailStyled, NameStyled, MoneyStyled, TitleStyled, MessageStyled, ProgressStyled,
} from "./Confirm.styled";
import ProgressBar from "src/Components/ProgressBar/ProgressBar.component";

import {
  StepContainerStyled,
  QuestionStyled,
  ProgressBarContainerStyled,
  ProgressBarWrapperStyled,
} from "../createtrip.styled";
import RectanguleShadow from "src/Components/RectanguleShadow";
import { ReactComponent as ArrowRightIcon } from "src/shared/assets/arrow-right.svg";
import { ReactComponent as CoinIcon } from "src/shared/assets/coins.svg";
import { ReactComponent as ArrowDown } from "src/shared/assets/d-1.svg";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
// import { ProgressBar, OverviewProcess, ProgressBarProcess } from "src/Pages/Dashboard/Dashboard.styled";
import BGModal from "src/shared/assets/bg-white-shape.svg";
import { navigate } from "@reach/router";
import { useTrip } from "src/Providers/Trips";
import useApi from "src/shared/hooks/useApi";
import Fallback from "src/Components/Fallback";
import Heading from "src/Components/Heading";

const Confirm: React.FC<StepProps> = data => {
  const { newTrip, handleNext } = data;
  let cities = newTrip && newTrip.tripLegs ? newTrip.tripLegs : []
  const dates = ["05/07/20", "5/11/20", "05/16/20", "5/20/20"];
  const [tripDetail, settripDetail] = useState(false)
  const [TravelDetail, setTravelDetail] = useState(false)
  const [WhoComingDetail, setWhoComingDetail] = useState(false)
  let invitees = newTrip && newTrip.tripGuests ? newTrip.tripGuests : []
  const SmallScreen = useMediaQuery('SM')
  const { state: { dashboardOverview },
    dispatch: dispatchDashboardOverview, getDashboardData } = useDashboardOverview();
  //@ts-ignore
  const { state, dispatch: dataDispatch } = useApi(`trip/getDashboardData/${newTrip !== null ? newTrip.trip ? newTrip.trip.id : 1 : 1}`, "get");

  let phases = ['Cities & Dates', 'Whose coming', 'Transportation', 'Accommodation', 'Itinerary']
  const {

    dispatch
  } = useTrip();

  let completedPhase = phases.indexOf(getDashboardData('phase'))
  const StepFunction = (value: string, index: number) => {
    for (var i = 0; i < phases.length; i++) {
      if (i < completedPhase && value === phases[i]) {
        return 'completed'
      } else if (value === getDashboardData('phase')) {
        return 'active'
      } else {
        return ""
      }
    }
  }

  const goForward = useCallback(() => {
    dispatch({
      type: "SET_STEP",
      payload: "Step0"
    })

    navigate("/my-trips")
  }, [handleNext]);

  useEffect(() => {
    if (newTrip) {
      if (newTrip.trip) {
        console.log('runn')
        dataDispatch({ type: "GET_DASHBOARD" })
      }
    }
  }, [newTrip, dataDispatch])
  useEffect(() => {
    if (state.data.currentDashboard) {
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.currentDashboard
      });
    }
  }, [newTrip, state.data.currentDashboard, dispatchDashboardOverview, state.data]);
  if (!newTrip) return null;
  return (
    state.isLoading ?
      <Fallback />
      :
      <StepContainerStyled style={{
        marginBottom: "0px"
        // alignItems: "unset"
      }}>
        <QuestionStyled>
          You’re done planning your trip!
      </QuestionStyled>
        <TripDetailStyled>
          <DetailStyled>
            Accommodation Details
          {!SmallScreen ?
              <RectanguleShadow style={{ overflowX: 'hidden' }}>
                {cities.map((value, index) => {
                  return (<div>
                    <DateStyled >
                      {value.startDate && new Date(value.startDate).toLocaleDateString()} {' - '} {value.endDate && new Date(value.endDate).toLocaleDateString()}
                    </DateStyled>
                    Location
                  <CityStyled>
                      {value.location}
                    </CityStyled>
                    ACCOMODATION
                  <AccomodationStyled>

                      {
                        //@ts-ignore
                        value.accommodation ? value.accommodation.type : value.tripTransport}
                    </AccomodationStyled>
                    {index !== cities.length - 1 && <hr />}
                  </div>);
                })}
              </RectanguleShadow>
              :
              <>
                <ArrowDown
                  onClick={() => settripDetail(!tripDetail)}
                  style={{
                    float: "right",
                    transform: tripDetail ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.6s",
                  }} />
                {tripDetail ?
                  <RectanguleShadow>
                    {cities.map((value, index) => {
                      return (
                        <div>
                          <DateStyled >
                            {value.startDate && dayjs(value.startDate).format("DD/MM/YY")} {' - '} {value.endDate && dayjs(value.endDate).format("DD/MM/YY")}

                          </DateStyled>
                          Location
                  <CityStyled>
                            {value.location}
                          </CityStyled>
                          ACCOMODATION
                  <AccomodationStyled>
                            {
                              //@ts-ignore
                              value.accommodation ? value.accommodation.type : value.tripTransport}
                          </AccomodationStyled>
                          {index !== cities.length - 2 && <hr />}
                        </div>
                      );
                    })}
                  </RectanguleShadow>
                  : null}
              </>}
          </DetailStyled>
          <TravelStyled>
            Transportation Details
          {!SmallScreen ?

              <RectanguleShadow style={{ overflowX: 'hidden' }}>
                {(newTrip && newTrip.transportationLegs) && newTrip.transportationLegs.map((value: any, index: any) => {
                  if (value && newTrip) return (<div>
                    <SpanStyled>
                      <OriginStyled>
                        ORIGIN
                    <CityStyled>
                          {/* {index === 0 ? newTrip.tripGuest.departureCity : cities[index - 1].location} */}
                          {value.origin}
                        </CityStyled>
                      </OriginStyled>
                      <ArrowRightIcon />
                      <DestinationStyled>
                        DESTINATION
                    <CityStyled>
                          {/* {value.location} */}
                          {value.destination}
                        </CityStyled>
                      </DestinationStyled>
                    </SpanStyled>
                    TRAVEL METHOD
                  <AccomodationStyled>
                      {value.tripTransport}
                    </AccomodationStyled>
                    {index !== newTrip.transportationLegs.length - 1 && <hr />}
                  </div>);
                })}
              </RectanguleShadow>
              :
              <>
                <ArrowDown
                  onClick={() => setTravelDetail(!TravelDetail)}
                  style={{
                    float: "right",
                    transform: TravelDetail ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.6s",
                  }} />
                {TravelDetail ?
                  <RectanguleShadow>
                    {newTrip && newTrip.transportationLegs.map((value: any, index: any) => {
                      if (value && newTrip) return (<div>
                        <SpanStyled>
                          <OriginStyled>
                            ORIGIN
                    <CityStyled>
                              {/* {index === 0 ? newTrip.tripGuest.departureCity : cities[index - 1].location} */}
                              {value.origin}
                            </CityStyled>
                          </OriginStyled>
                          <ArrowRightIcon />
                          <DestinationStyled>
                            DESTINATION
                    <CityStyled>
                              {/* {value.location} */}
                              {value.destination}
                            </CityStyled>
                          </DestinationStyled>
                        </SpanStyled>
                        TRAVEL METHOD
                  <AccomodationStyled>
                          {value.tripTransport}
                        </AccomodationStyled>
                        {index !== newTrip.transportationLegs.length - 1 && <hr />}
                      </div>);
                    })}
                  </RectanguleShadow>
                  : null}
              </>
            }
          </TravelStyled>
          <InviteStyled>
            Who's Coming?
          {!SmallScreen ?

              <InviteesStyled>
                <RectanguleShadow>
                  {invitees.length ?
                    invitees.map((value: any, index: any) => (<>
                      <NameStyled>
                        {value.firstName + " " + value.lastName}
                      </NameStyled>
                      <EmailStyled>
                        {value.email}
                      </EmailStyled>
                      {index !== invitees.length - 1 && <hr />}
                    </>)

                    )
                    : <Heading as="h3">SOLO</Heading>}
                </RectanguleShadow>
              </InviteesStyled>
              :
              <><ArrowDown
                onClick={() => setWhoComingDetail(!WhoComingDetail)}
                style={{
                  float: "right",
                  transform: WhoComingDetail ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.6s",
                }} />
                {WhoComingDetail ?
                  <InviteesStyled>
                    <RectanguleShadow>
                      {invitees.length ?
                        invitees.map((value: any, index: any) => (<>
                          <NameStyled>
                            {value.firstName + " " + value.lastName}
                          </NameStyled>
                          <EmailStyled>
                            {value.email}
                          </EmailStyled>
                          {index !== invitees.length - 1 && <hr />}
                        </>)
                        )
                        : <Heading as="h3">SOLO</Heading>}
                    </RectanguleShadow>
                  </InviteesStyled>
                  : null}
              </>}
            {!SmallScreen ?
              <BudgetStyled>
                Your Budget
            <RectanguleShadow>
                  <CoinIcon />
                  <MoneyStyled>
                    {newTrip ? newTrip.tripGuest ? newTrip.tripGuest.budget ? `$ ${newTrip.tripGuest.budget}` : "No Budget!" : "" : ""}
                  </MoneyStyled>
                </RectanguleShadow>
              </BudgetStyled>
              : null}
          </InviteStyled>
          {SmallScreen ?
            <BudgetStyled style={{
              border: "solid 1px #dadada",
              padding: "24px 15px",
              fontWeight: 600,
              color: "black"
            }}>
              Your Budget
            <RectanguleShadow style={{
                border: "none"

              }}>
                <CoinIcon />
                <MoneyStyled>
                {newTrip ? newTrip.tripGuest ? newTrip.tripGuest.budget ? `$ ${newTrip.tripGuest.budget}` : "No Budget!" : "" : ""}
                </MoneyStyled>
              </RectanguleShadow>
            </BudgetStyled>
            : null}
        </TripDetailStyled>
        <RsvpStyled>
          <RectanguleShadow>
            <TitleStyled>
              Your invites have been sent out!
          </TitleStyled>
            <MessageStyled>
              Your guests have 6 days 23 hours 59 minutes to RSVP before we move on to the Transportation phase.
          </MessageStyled>
            <ProgressStyled>
              {/* <ProgressBar>
              {phases.map((item, index) => {
                return (
                  <OverviewProcess key={index}>
                    <ProgressBarProcess
                      className={'active'}
                      style={{
                        width: "5px",
                        height: "5px"
                      }}
                    // className={StepFunction(item, index)}
                    >{StepFunction(item, index) === 'completed' ? <span style={{ display: 'flex', justifyContent: 'center', position: 'relative', bottom: 3, color: 'white' }}>&#10003;</span> : null}</ProgressBarProcess>
                    <p>{item}</p>
                  </OverviewProcess>
                )
              })}
            </ProgressBar> */}
              <ProgressBar getDashboardData={getDashboardData} />

            </ProgressStyled>
          </RectanguleShadow>
        </RsvpStyled>
        <Button
          glow
          onClick={goForward}
          width="184px"
          style={{
            marginTop: "56px"
          }}
        >
          Next
      </Button>
      </StepContainerStyled>
  );
};

export default Confirm;
