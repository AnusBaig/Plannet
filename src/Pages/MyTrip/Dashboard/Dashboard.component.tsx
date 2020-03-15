import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { navigate, Link } from "@reach/router";
import { StepProps } from "@dimelo/mytrip";
import AuthProvider, { useAuth } from "src/Providers/Auth";
// import Table from "src/Components/Table";
import Button from "src/Components/Button";
import Heading from "src/Components/Heading";
import Separator from "src/Components/Separator";
import RectanguleShadow from "src/Components/RectanguleShadow";
import RSVPInlineWidget from "src/Components/RSVPInlineWidget";
import { ReactComponent as SortIcon } from "src/shared/assets/sort.svg";
import { ReactComponent as SortAscIcon } from "src/shared/assets/sort-asc.svg";
import { ReactComponent as SortDescIcon } from "src/shared/assets/sort-desc.svg";

import { ReactComponent as DotsIcon } from "src/shared/assets/dots-menu.svg";
import { ReactComponent as RedCircleIcon } from "src/shared/assets/red-circle.svg";
import { ReactComponent as YellowCircleIcon } from "src/shared/assets/yellow-circle.svg";
import { ReactComponent as GreenCircleIcon } from "src/shared/assets/green-circle.svg";
import { ReactComponent as DownArrowleIcon } from "src/shared/assets/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "src/shared/assets/up-arrow.svg";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import "./table.css";
import { CircleStyled } from "src/Pages/Dashboard/Dashboard.styled";
import Collapsible from "react-collapsible";
import useApi from "src/shared/hooks/useApi";
import { colors } from "src/shared/styles/colors";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { getDatesAndTimeDiffInAllUnits } from "src/shared/utils/misc";
import {
  Step1WrapperStyled,
  Step1ButtonsStyled,
  HeadingWrapperStyled,
  NoTripsPlannedWrapperStyled,
  NoTripsPlannedContainerStyled,
  TableWrapperStyled
} from "./Dashboard.styled";
import { useTrip } from "src/Providers/Trips";

const Dashboard: React.FC<StepProps> = data => {
  const smallScreen = useMediaQuery("SM");
  const {
    state: { newTrip },
    dispatch: tripDispatch
  } = useTrip();
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useApi("trip/tripDashboard", "get");
  const [collapsedOne, setCollapsedOne] = useState(true);
  const [collapsedTwo, setCollapsedTwo] = useState(true);
  const [collapsedThree, setCollapsedThree] = useState(true);

  const [RSVPTrips, setRSVPTrips] = useState([]);
  const [finishedTrips, setFinishedTrips] = useState([]);
  const [confirmedTrips, setConfirmedTrips] = useState([]);

  const [sortBy, setSortBy] = useState({
    type: "assending",
    property: "name"
  });

  const [sortMode, setSortMode] = useState("");
  const [property, setProperty] = useState("");

  const [confirmedTripProperty, setConfirmedTripProperty] = useState("");
  const [confirmedTripSortMode, setConfirmedTripSortMode] = useState("");

  const [RSVPTripProperty, setRSVPTripProperty] = useState("");
  const [RSVPTripSortMode, setRSVPTripSortMode] = useState("");

  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        `/login?redirect=${window.location.pathname}${window.location.search}`
      );
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (state.api) {
      dispatch({ type: "GET_TRIP_DASHBOARD" });
    }
  }, [state.api, dispatch]);
  const borderBottomStyle = {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: "1px solid #e5e7e9"
  };

  const { trips } = data;
  const { currentUser } = useAuth();

  const goToCreateTrip = useCallback(() => {
    tripDispatch({
      type: "CLEAR_TRIPS"
    });
    navigate("/create-trip");
  }, []);

  const goToDashboard = useCallback(
    (id?: string) => () =>
      navigate(`join-trip/${id}/join/${currentUser && currentUser.email}`),
    [currentUser]
  );

  const finishPlaninnig = (trip: any) => {
    let { id } = trip.trip;
    console.log(trip);
    tripDispatch({ type: "UPDATE_NEW_TRIP", payload: trip });
    setTimeout(() => {
      navigate(`/create-trip/${id}`);
    }, 1000);
    // navigate(`/finish-planinnig/${id}`)
  };
  const View_Trip = (trip: any) => {
    let { id } = trip.trip;
    navigate(`/dashboard/${id}`);
  };
  console.log(state);
  if (!trips) return null;

  if (
    (!trips.tripsNeedToBeRSVP || !trips.tripsNeedToBeRSVP.length) &&
    (!trips.tripsRSVPed || !trips.tripsRSVPed.length)
  ) {
    return (
      <NoTripsPlannedWrapperStyled>
        <NoTripsPlannedContainerStyled style={{ margin: "0 auto" }}>
          <Separator width="180px" />
          <Heading as="h2">
            You currently do not have any trips planned.
          </Heading>
          <Separator width="40px" />
          <Button onClick={goToCreateTrip}>+ Add New Trip</Button>
        </NoTripsPlannedContainerStyled>
      </NoTripsPlannedWrapperStyled>
    );
  }
  console.log(state);
  return (
    <>
      <Step1WrapperStyled style={smallScreen ? { padding: "0" } : {}}>
        <HeadingWrapperStyled
          style={
            smallScreen
              ? {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "10% auto",
                  alignItems: "center"
                }
              : { width: "80%", margin: "5% auto", marginBottom: "10%," }
          }
        >
          <Heading as="h1" align={smallScreen ? "center" : "left"}>
            Trip Dashboard
          </Heading>
          <Step1ButtonsStyled>
            <Button
              onClick={goToCreateTrip}
              style={smallScreen ? { width: "100%" } : {}}
            >
              + Add New Trip
            </Button>
          </Step1ButtonsStyled>
        </HeadingWrapperStyled>

        <Collapsible
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                paddingLeft: "16px"
              }}
              onClick={() => setCollapsedOne(!collapsedOne)}
            >
              <div>
                <h3>
                  <span>
                    <RedCircleIcon />
                  </span>{" "}
                  RSVP
                </h3>
                <p>Join These trips before time is up</p>
              </div>
              <div
                style={{
                  alignSelf: "center"
                }}
              >
                {" "}
                {collapsedOne ? <DownArrowleIcon /> : <UpArrowIcon />}{" "}
              </div>
            </div>
          }
        >
          <TableWrapperStyled
            style={{
              overflow: "hidden",
              padding: "15px",
              width: "calc(100% - 30px)",
              backgroundColor: "white"
            }}
          >
            <Table
              style={{
                border: smallScreen ? "" : "1px solid #ccc",
                borderCollapse: "collapse"
              }}
            >
              <Thead style={{ fontFamily: "Quicksand", color: "#292c36" }}>
                <Tr style={{ backgroundColor: "#e5e7e9" }}>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setRSVPTripProperty("name");
                      setRSVPTripSortMode(
                        RSVPTripSortMode === "asending"
                          ? "desending"
                          : RSVPTripSortMode === "desending"
                          ? "asending"
                          : "asending"
                      );
                      console.log(RSVPTripSortMode, RSVPTripProperty);
                    }}
                  >
                    Trip Name  
                    { RSVPTripSortMode === "asending" ? <SortAscIcon /> : RSVPTripSortMode === "desending" ? <SortDescIcon />  :  <SortIcon height="15px" /> }
                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setRSVPTripProperty("host");
                      setRSVPTripSortMode(
                        RSVPTripSortMode === "asending"
                          ? "desending"
                          : RSVPTripSortMode === "desending"
                          ? "asending"
                          : "asending"
                      );

                      console.log(RSVPTripSortMode, RSVPTripProperty);
                    }}
                  >
                    Host 
                    { RSVPTripSortMode === "asending" ? <SortAscIcon /> : RSVPTripSortMode === "desending" ? <SortDescIcon />  :  <SortIcon height="15px" /> }
                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setRSVPTripProperty("time");
                      setRSVPTripSortMode(
                        RSVPTripSortMode === "asending"
                          ? "desending"
                          : RSVPTripSortMode === "desending"
                          ? "asending"
                          : "asending"
                      );

                      console.log(RSVPTripSortMode, RSVPTripProperty);
                    }}
                  >
                    Time remaining 
                    { RSVPTripSortMode === "asending" ? <SortAscIcon /> : RSVPTripSortMode === "desending" ? <SortDescIcon />  :  <SortIcon height="15px" /> }
                    
                  </Th>
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {state.data &&
                  state.data.RSVP &&
                  state.data.RSVP.sort((a: any, b: any) =>
                    RSVPTripProperty === "name"
                      ? RSVPTripSortMode === "asending"
                        ? a.trip[RSVPTripProperty].toLowerCase() >
                          b.trip[RSVPTripProperty].toLowerCase()
                          ? 1
                          : -1
                        : b.trip[RSVPTripProperty].toLowerCase() >
                          a.trip[RSVPTripProperty].toLowerCase()
                        ? 1
                        : -1
                      : RSVPTripProperty === "host"
                      ? RSVPTripSortMode === "asending"
                        ? a.host.firstName.toLowerCase() >
                          b.host.firstName.toLowerCase()
                          ? 1
                          : -1
                        : b.host.firstName.toLowerCase() >
                          a.host.firstName.toLowerCase()
                        ? 1
                        : -1
                      : RSVPTripProperty === "time"
                      ? RSVPTripSortMode === "asending"
                        ? a.trip.startDate > b.trip.startDate
                          ? 1
                          : -1
                        : b.trip.startDate > a.trip.startDate
                        ? 1
                        : -1
                      : 1
                  ).map((data: any, i: number) => (
                    <Tr
                      key={data.trip.id}
                      style={
                        smallScreen
                          ? { margin: "10px 0", padding: "20px 0" }
                          : {}
                      }
                    >
                      <Td
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        <strong>
                          <Link to={`/dashboard/${data.trip.id}`}>
                            {data.trip.name}
                          </Link>
                        </strong>
                      </Td>
                      <Td
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        {currentUser && currentUser.email === data.host.email
                          ? "Me"
                          : data.host.firstName}
                      </Td>
                      <Td
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px",
                          color: getDatesAndTimeDiffInAllUnits(
                            data.trip.startDate
                          ).color
                        }}
                      >
                        {console.log(data.trip.startDate)}
                        {
                          getDatesAndTimeDiffInAllUnits(data.trip.startDate)
                            .text
                        }
                      </Td>
                      <Td
                        className="tdRemove"
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        {getDatesAndTimeDiffInAllUnits(data.trip.startDate)
                          .canDo ? (
                          <Button
                            variant="secondary"
                            size="small"
                            style={{
                              width: smallScreen ? "88%" : "96px",
                              fontSize: 14
                            }}
                          >
                            <Link
                              to={`/join-trip/${
                                data.trip.id
                              }/join/${currentUser && currentUser.email}`}
                            >
                              RSVP
                            </Link>
                          </Button>
                        ) : (
                          <span style={{ color: "red" }}>Date Missed</span>
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableWrapperStyled>
        </Collapsible>

        <Collapsible
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                paddingLeft: "16px"
              }}
              onClick={() => setCollapsedTwo(!collapsedTwo)}
            >
              <div>
                <h3>
                  <span>
                    <YellowCircleIcon />
                  </span>{" "}
                  Finish Planning
                </h3>
                <p>Saved Drafts of trips</p>
              </div>
              <div
                style={{
                  alignSelf: "center"
                }}
              >
                {" "}
                {collapsedTwo ? <DownArrowleIcon /> : <UpArrowIcon />}{" "}
              </div>
            </div>
          }
        >
          <TableWrapperStyled
            style={{
              overflow: "hidden",
              padding: "15px",
              width: "calc(100% - 30px)",
              backgroundColor: "white"
            }}
          >
            <Table
              style={{
                border: smallScreen ? "" : "1px solid #ccc",
                borderCollapse: "collapse"
              }}
            >
              <Thead style={{ fontFamily: "Quicksand", color: "#292c36" }}>
                <Tr style={{ backgroundColor: "#e5e7e9" }}>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setSortMode(
                        sortMode === "desending"
                          ? "assending"
                          : sortMode === "assending"
                          ? "desending"
                          : "assending"
                      );
                      setProperty("name");
                    }}
                  >
                    Trip Name{" "}
                    {!smallScreen &&
                      (sortMode === "assending" ? (
                        <SortDescIcon />
                      ) : sortMode === "desending" ? (
                        <SortAscIcon />
                      ) : (
                        <SortIcon />
                      ))}
                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setSortMode(
                        sortMode === "desending"
                          ? "assending"
                          : sortMode === "assending"
                          ? "desending"
                          : "assending"
                      );
                      setProperty("createdAt");
                    }}
                  >
                    Created At{" "}
                    {!smallScreen &&
                      (sortMode === "assending" ? (
                        <SortDescIcon />
                      ) : sortMode === "desending" ? (
                        <SortAscIcon />
                      ) : (
                        <SortIcon />
                      ))}
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {state.data &&
                  state.data.finishPlanning &&
                  state.data.finishPlanning
                    .sort((a: any, b: any) =>
                      property === "name"
                        ? sortMode === "assending"
                          ? a.trip.name[0].toLowerCase() >
                            b.trip.name[0].toLowerCase()
                            ? 1
                            : -1
                          : sortMode === "desending"
                          ? a.trip.name[0].toLowerCase() <
                            b.trip.name[0].toLowerCase()
                            ? 1
                            : -1
                          : 1
                        : property === "createdAt"
                        ? sortMode === "assending"
                          ? a.trip.createdAt > b.trip.createdAt
                            ? 1
                            : -1
                          : sortMode === "desending"
                          ? a.trip.createdAt < b.trip.createdAt
                            ? 1
                            : -1
                          : 1
                        : 1
                    )
                    .map((data: any, i: number) => (
                      <Tr
                        key={data.trip.id}
                        style={
                          smallScreen
                            ? { margin: "10px 0", padding: "20px 0" }
                            : {}
                        }
                      >
                        <Td
                          style={{
                            borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                            padding: "10px"
                          }}
                        >
                          <strong>
                            <Link to={`/dashboard/${data.trip.id}`}>
                              {data.trip.name}
                            </Link>
                          </strong>
                        </Td>
                        <Td
                          style={{
                            borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                            padding: "10px"
                          }}
                        >
                          {dayjs(data.trip.createdAt).format("MM/DD/YY")}
                        </Td>

                        <Td
                          className="tdRemove"
                          style={{
                            ...borderBottomStyle,
                            padding: "10px",
                            width: smallScreen ? "100%" : "auto"
                          }}
                        >
                          <div
                            className="ButtonDiv"
                            style={{
                              display: !smallScreen ? "flex" : "block",
                              alignItems: "center",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              textAlign: "center"
                            }}
                          >
                            <Button
                              variant="secondary"
                              size="small"
                              style={{
                                width: smallScreen ? "88%" : "96px",
                                fontSize: 14
                              }}
                              onClick={() => {
                                finishPlaninnig(data);
                              }}
                            >
                              Finish Planning
                            </Button>
                            <button
                              style={{
                                backgroundColor: "white",
                                color: "red",
                                padding: "5px 15px",
                                outline: "none",
                                border: "none",
                                width: smallScreen ? "95%" : "auto"
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableWrapperStyled>
        </Collapsible>

        <Collapsible
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                paddingLeft: "16px"
              }}
              onClick={() => setCollapsedThree(!collapsedThree)}
            >
              <div>
                <h3>
                  <span>
                    <GreenCircleIcon />
                  </span>{" "}
                  Confirmed Trips
                </h3>
                <p>Upcoming trips get exited!</p>
              </div>
              <div
                style={{
                  alignSelf: "center"
                }}
              >
                {collapsedThree ? <DownArrowleIcon /> : <UpArrowIcon />}{" "}
              </div>
            </div>
          }
        >
          <TableWrapperStyled
            style={{
              overflow: "hidden",
              padding: "15px",
              width: "calc(100% - 30px)",
              backgroundColor: "white"
            }}
          >
            {/* ////////////////////////////////////////////////// ///////////////////////// */}
            <Table
              style={{
                border: smallScreen ? "" : "1px solid #ccc",
                borderBottom: smallScreen ? "" : "1px solid #ccc",
                borderCollapse: "collapse"
              }}
            >
              <Thead style={{ fontFamily: "Quicksand", color: "#292c36" }}>
                <Tr style={{ backgroundColor: "#e5e7e9" }}>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setConfirmedTripProperty("name");
                      setConfirmedTripSortMode(
                        confirmedTripSortMode === "asending"
                          ? "desending"
                          : confirmedTripSortMode === "desending"
                          ? "asending"
                          : "asending"
                      );
                      console.log(confirmedTripSortMode);
                    }}
                  >
                    Trip Name
                    { confirmedTripSortMode === "asending" ? <SortAscIcon /> : confirmedTripSortMode === "desending" ? <SortDescIcon />  :  <SortIcon height="15px" /> }
                    
                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                    onClick={() => {
                      setConfirmedTripProperty("host");
                      setConfirmedTripSortMode(
                        confirmedTripSortMode === "asending"
                          ? "desending"
                          : confirmedTripSortMode === "desending"
                          ? "asending"
                          : "asending"
                      );
                    }}
                  >

                    Host 
                    { confirmedTripSortMode === "asending" ? <SortAscIcon /> : confirmedTripSortMode === "desending" ? <SortDescIcon />  :  <SortIcon height="15px" /> }

                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                  >
                    {/* Dates <SortIcon height="15px" /> */}
                  </Th>
                  <Th
                    style={{
                      padding: "10px",
                      color: "#292c36",
                      textAlign: "left"
                    }}
                  ></Th>
                </Tr>
              </Thead>

              <Tbody>
                {state.data &&
                  state.data.ConfirmedTrips &&
                  state.data.ConfirmedTrips.sort((a: any, b: any) =>
                    confirmedTripProperty === "name"
                      ? confirmedTripSortMode === "asending"
                        ? a.trip[confirmedTripProperty].toLowerCase() >
                          b.trip[confirmedTripProperty].toLowerCase()
                          ? 1
                          : -1
                        : b.trip[confirmedTripProperty].toLowerCase() >
                          a.trip[confirmedTripProperty].toLowerCase()
                        ? 1
                        : -1
                      : confirmedTripProperty === "host"
                      ? confirmedTripSortMode === "asending"
                        ? a.host.firstName.toLowerCase() >
                          b.host.firstName.toLowerCase()
                          ? 1
                          : -1
                        : b.host.firstName.toLowerCase() >
                          a.host.firstName.toLowerCase()
                        ? 1
                        : -1
                      : 1
                  ).map((data: any, i: number) => (
                    <Tr
                      key={data.trip.id}
                      style={
                        smallScreen
                          ? { margin: "10px 0", padding: "20px 0" }
                          : {}
                      }
                    >
                      <Td
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        <strong>
                          <Link to={`/dashboard/${data.trip.id}`}>
                            {data.trip.name}
                          </Link>
                        </strong>
                      </Td>
                      <Td
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        {currentUser && currentUser.email === data.host.email
                          ? "Me"
                          : data.host.firstName}
                      </Td>

                      <Td
                        className="tdRemove"
                        style={{
                          borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                          padding: "10px"
                        }}
                      >
                        {/* <Button
                          variant="secondary"
                          size="small"
                          style={{
                            borderBottom: "1px solid rgba(204, 204, 204, 0.48)",
                            padding: "10px"
                          }}
                        > */}
                        <Button
                          variant="secondary"
                          size="small"
                          style={{
                            width: smallScreen ? "88%" : "116px",
                            fontSize: 14
                          }}
                          onClick={() => {
                            View_Trip(data);
                            // finishPlaninnig(data)
                          }}
                        >
                          View Trip
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableWrapperStyled>
        </Collapsible>
      </Step1WrapperStyled>
    </>
  );
};

export default Dashboard;
