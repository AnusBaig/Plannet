import React, { useCallback, useState, useEffect } from "react";
import SelectMenu from "src/Components/SelectMenu";
import './transportation.css'
import useApi from "src/shared/hooks/useApi";
import {
  TravelersContainDiv1,
  ConatinDiv1TextDiv,
  ConatinDiv1SmallTextDiv,
  TravelerContainDiv2,
  ContainDiv2OriginDiv,
  ContainDiv2DestinationDiv,
  ContentDiv2DateDiv,
  ContainDiv2Container
} from "./Transportation.styled";
import { ReactComponent as ArrowDown } from "src/shared/assets/d-1.svg";
import { ReactComponent as Sort } from "src/shared/assets/sort.svg";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { RouteComponentProps } from "@reach/router";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { StatusRejectedTd, StatusJoinedTd, StatusPendingTd } from "../Dashboard.styled";
import '../../CreateTrip/Step11/scrollbarStyled.css'

const Traveleres: React.FC<RouteComponentProps<{ isAccommodation: boolean }>> = (props) => {
    //@ts-ignore
  const { state, dispatch } = useApi(`trip/getTransporationDashboardData/${props.id}/`, "get");
  const [data, setData] = useState({})
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  const { isLoading, isError } = state;

  const getDashboardData = useCallback(
    () => dispatch({ type: "GET_DASHBOARD" }),
    [dispatch]
  );

  useEffect(() => {
    if (!state.api) return;
    getDashboardData();

    return () => {
      dispatchDashboardOverview({ type: "CLEAR_DASHBOARD" });
    };
  }, [state.api, dispatchDashboardOverview, getDashboardData]);

  useEffect(() => {
    if (state.data.currentDashboard) {
      setData(state.data.currentDashboard)
      console.log('setData', state.data.currentDashboard)
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.currentDashboard
      });
    }
  }, [state.data.currentDashboard, dispatchDashboardOverview]);

  const tdStyle = {
    padding: '1em'
  }
  const [sortBy, setSortBy] = useState({
    type: 'assending',
    property: "guestName"
  })
  const [ExpensionIndex, setExpensionIndex] = useState();
  const dataArr = [
    {
      date: "05/07/20",
      origin: "New York NY",
      Destination: "CaraCas , Ve",
      FlightDetails: "Airoplane"
    },
    {
      date: "05/07/20",
      origin: "New York NY",
      Destination: "CaraCas , Ve",
      FlightDetails: "Airoplane",
      searchFlight: true
    },
    {
      date: "05/07/20",
      origin: "New York NY",
      Destination: "CaraCas , Ve",
      FlightDetails: "Airoplane"
    },
    {
      date: "05/07/20",
      origin: "New York NY",
      Destination: "CaraCas , Ve",
      FlightDetails: "Airoplane",
      searchFlight: true
    }
  ];

  const GuestArr = [
    { guestName: "Ghori", status: "Booked" , departure: "CDC(Paris)", arrival: "CCS(Vargas)", flight: "UA248"},
    { guestName: "jerry", status: "true" , departure: "", arrival: "", flight: ""},
    { guestName: "fd", status: "pending", departure: "", arrival: "", flight: "" },
    { guestName: "Tom", status: "pending" , departure: "", arrival: "", flight: ""},
    { guestName: "Uzzi", status: "pending" , departure: "", arrival: "", flight: ""}
  ];
  const SmallScreen = useMediaQuery('SM');
  const sortIt = (array: any, sortby: any) => {

    if (!sortby.property) return array;
    return array.sort((a: any, b: any) => {
      var x = a[sortby.property].slice(0, 1).toLowerCase();
      var y = b[sortby.property].slice(0, 1).toLowerCase();
      if (sortby.type == 'assending') {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x < y ? 1 : x > y ? -1 : 0;        
      }
    })
  }
  const tabs = [
    { value: "", label: "SortBy" },
    { value: "guestName", label: "Name A-Z" },
    { value: "guestName", label: "Name Z-A" },
    { value: "status", label: "Status A-Z" },
    { value: "status", label: "Status Z-A" },
  ];
  const handleSelectTab = (tab: any) => {
    setSortBy({
      type: sortBy.type === "assending" ? "desending" : "assending",
      property: tab
    })
  }

  return (
    <>
      <TravelersContainDiv1>
        <ConatinDiv1TextDiv>
          See who has booked their travel!
        </ConatinDiv1TextDiv>
        <ConatinDiv1SmallTextDiv>
          An extra line in case we need it.
        </ConatinDiv1SmallTextDiv>
      </TravelersContainDiv1>
      {
        //@ts-ignore        
        data && data.allTransportationLegs && data.allTransportationLegs.map((value, index) => {
        return (
          <div key={index} style={{ margin: "24px auto" }}>
            <TravelerContainDiv2>
              <div>
                <ContentDiv2DateDiv>Leg {index}</ContentDiv2DateDiv>
              </div>
              <ContainDiv2Container>
                <div style={{display: SmallScreen ? 'block' : 'flex', alignItems: 'center'}}>
                  <ContainDiv2OriginDiv style={{
                    paddingTop: SmallScreen ? "0px" : "0px"
                  }}>
                    <span style={{ fontSize: "10px" }}>DATE</span> <br />
                    {value.departureDate}
                  </ContainDiv2OriginDiv>
                  <ContainDiv2DestinationDiv>
                    <span style={{ fontSize: "10px" }}>DESTINATION</span> <br />
                    {value.destination}
                  </ContainDiv2DestinationDiv>
                </div>  
                {value.flightNumber && (
                  <ArrowDown
                    onClick={() => {
                      if (ExpensionIndex === index) {
                        setExpensionIndex("");
                      } else {
                        setExpensionIndex(index);
                      }
                    }}
                    style={{
                      padding: SmallScreen ? '0px' : "15px",
                      cursor: "pointer",
                      transform:
                        ExpensionIndex === index
                          ? "rotate(270deg)"
                          : "rotate(0deg)",
                      transition: "all 0.5s ease 0s"
                    }}
                  />
                )}
              </ContainDiv2Container>
              {ExpensionIndex === index ? (
                <>
                  {SmallScreen ?
                    <div style={{
                      padding: '10px 5px'
                    }}>

                      <SelectMenu options={tabs} onChange={handleSelectTab} />
                    </div>
                    : null}
                  <Table
                    cellPadding="10"
                    style={{
                      borderCollapse: "collapse",
                      borderRadius: '4px',
                      border: SmallScreen ? '' : 'solid 1px #e5e7e9',
                      width: SmallScreen ? '100%':"96%",
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      boxShadow: SmallScreen ? '' : ' 0px 0px 0px 1px #e5e7e9',
                      marginTop: "35px"
                    }}>
                    <Thead
                      style={{
                        backgroundColor: SmallScreen ? '' : "#f3f5f6",
                        height: "40px",
                        // opacity: 0.5,
                      }}
                    >
                      <Tr style={{
                        height: "50px"
                      }}>
                        <Th style={{
                          cursor: "pointer",
                          textAlign: "left",
                          paddingLeft: '14px',
                          backgroundColor: SmallScreen ? '#f3f5f6' : "none"
                        }}
                          onClick={() => setSortBy({
                            type: sortBy.type === 'assending' ? 'desending' : 'assending',
                            property: 'guestName'
                          })}
                        >Name {!SmallScreen && <Sort />}</Th>
                        <Th style={{
                          cursor: "pointer",
                          textAlign: "left",
                          paddingLeft: '14px',
                          backgroundColor: SmallScreen ? '#f3f5f6' : "none"
                        }}
                          onClick={() => setSortBy({
                            type: sortBy.type === 'assending' ? 'desending' : 'assending',
                            property: 'status'
                          })}
                        >Status {!SmallScreen && <Sort />}</Th> 
                        <Th style={{
                          cursor: "pointer",
                          textAlign: "left",
                          paddingLeft: '14px',
                          backgroundColor: SmallScreen ? '#f3f5f6' : "none"
                        }}
                          onClick={() => setSortBy({
                            type: sortBy.type === 'assending' ? 'desending' : 'assending',
                            property: 'status'
                          })}
                        >Departure {!SmallScreen && <Sort />}</Th>
                        <Th style={{
                          cursor: "pointer",
                          textAlign: "left",
                          paddingLeft: '14px',
                          backgroundColor: SmallScreen ? '#f3f5f6' : "none"
                        }}
                          onClick={() => setSortBy({
                            type: sortBy.type === 'assending' ? 'desending' : 'assending',
                            property: 'status'
                          })}
                        >Arrival {!SmallScreen && <Sort />}</Th>
                        <Th style={{
                          cursor: "pointer",
                          textAlign: "left",
                          paddingLeft: '14px',
                          backgroundColor: SmallScreen ? '#f3f5f6' : "none"
                        }}
                          onClick={() => setSortBy({
                            type: sortBy.type === 'assending' ? 'desending' : 'assending',
                            property: 'status'
                          })}
                        >Flight {!SmallScreen && <Sort />}</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                      //@ts-ignore                                
                        data && data.transportationLegsForUser && data.transportationLegsForUser.map(
                        (d: any, index: any) => {
                          let name = ''
                          //@ts-ignore                                                          
                          let nameArr = data && data.tripGuests && data.tripGuests.filter((o) => o.id === d.TripGuestId)
                          if (d.destination === value.destination) {
                            return (
                              <>
                                <Tr
                                  key={index}
                                  style={{
                                    color: "#292c36",
                                    // borderBottom: "1px solid #e5e7e9",
  
                                  }}
                                >
                                  <Td style={{ ...tdStyle, fontWeight: 'bold'}}>
                                    {
                                      nameArr && nameArr[0] && nameArr[0].firstName
                                    }
                                  </Td>
                                  <Td style={tdStyle}>
                                    {value.status == "false" ? (
                                      <StatusRejectedTd>Rejected</StatusRejectedTd>
                                    ) : value.status == "true" ? (
                                      <StatusJoinedTd>Joined</StatusJoinedTd>
                                    ) : value.status == "Booked" ? (
                                      <StatusJoinedTd>Booked</StatusJoinedTd>
                                    ) : (
                                          <StatusPendingTd>
                                            Pending
                                          </StatusPendingTd>
                                        )}
                                  </Td>
                                  <Td style={tdStyle}>
                                    {
                                    //@ts-ignore                                                                                                
                                      data && data.departureCity}
                                  </Td>
                                  <Td style={tdStyle}>
                                    {
                                    //@ts-ignore                                                                                                
                                      data && data.arrivalCity}
                                  </Td>
                                  <Td style={{ ...tdStyle, fontWeight: 'bold'}}>
                                    {d.flightNumber}
                                  </Td>
                                </Tr>
                                {
                                  !SmallScreen ?
                                    <tr style={{
                                      // color: "#292c36",
  
                                    }}>
                                      <td style={{
                                        padding: "0px 12px"
                                      }} colSpan={6}>
  
                                        <hr style={{
                                          borderTop: index === GuestArr.length - 1 ? "1px solid transparent" : "1px solid #e5e7e9",
                                          visibility: index === GuestArr.length - 1 ? "hidden" : "initial",
                                        }} />
  
                                      </td>
  
                                    </tr>
                                    : null
                                }
                              </>
                            );
                          }
                        }
                      )}
                    </Tbody>
                  </Table>
                </>
              ) : null}
            </TravelerContainDiv2>
          </div>
        );
      })}
    </>
  );
};
export default Traveleres;
