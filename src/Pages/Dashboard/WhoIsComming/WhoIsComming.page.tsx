import React, { useState, useCallback, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import Table from "src/Components/Table";
import Button from "src/Components/Button";
import {
  TripPlaningMainContainer,
  NewFriendButtonDiv,
  StatusRejectedTd,
  StatusJoinedTd,
  StatusPendingTd
} from "src/Pages/Dashboard/Dashboard.styled";
import './whoIsComing.css'
import { useAuth } from "src/Providers/Auth";
import SelectMenu from "src/Components/SelectMenu";
import AddNewInviteModal from './Modals/NewInviteModal'
import useApi from "src/shared/hooks/useApi";
import { ReactComponent as Sort } from "src/shared/assets/sort.svg";
import ResendModal from "./Modals/ResendModal";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { TableStyled } from "../CityDates/CityDates.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import '../../CreateTrip/Step11/scrollbarStyled.css'

let dataForDashboard: object | undefined;
const Summary: React.FC<RouteComponentProps> = (props) => {
  const tdStyle = {
    padding: '1em'
  }
  const [openModal, setOpenModal] = useState(false)
  const [addModal, setAddModalToggle] = useState(false);
  const SmallScreen = useMediaQuery('XS')
  const { currentUser } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [resendModal, setResendModalToggle] = useState(false)
  const {
    state: resendInviteState,
    dispatch: resendInviteDispatch
  } = useApi(
    `/tripGuest/resendInvite`,
    "post"
  );
  //@ts-ignore
  const { state, dispatch } = useApi(`trip/getDashboardData/${props.id}/`, "get");
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
  //@ts-ignore
  const settingData = (data) => {
  //@ts-ignore    
    setData(data)
  }

  useEffect(() => {
    if (state.data.currentDashboard) {
      setData(state.data.currentDashboard)
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.currentDashboard
      });
    }
  }, [state.data.currentDashboard, dispatchDashboardOverview]);

  const [sortBy, setSortBy] = useState({
    type: 'assending',
    property: ""
  })

  const getDashboardDataProperty = (dotNotation: string, defaultR: any = "") =>
    //@ts-ignore                  
    (data &&
      //@ts-ignore                      
      dotNotation
        //@ts-ignore                      
        .split(".")
        //@ts-ignore                      
        .reduce((object, key) => object && object[key], data)) ||
    defaultR;

  const sortIt = (array: any, sortby: any) => {

    if (!sortby.property) return array;
    return array.sort((a: any, b: any) => {
      let A = a[sortby.property].slice(0, 2).toLowerCase();
      let B = b[sortby.property].slice(0, 2).toLowerCase();
      if (A > B) {
        return sortby.type == 'assending' ? -1 : 1;
      }
      if (B > A) {
        return sortby.type == 'desending' ? 1 : -1;
      }
      return 0;
    })
  }
  useEffect(() => {
    if (dashboardOverview) {
      //@ts-ignore
      setData(dashboardOverview);
    }
  }, [dashboardOverview])
  const tabs = [
    { value: "", label: "SortBy" },
    { value: "firstName", label: "Name" },
    { value: "email", label: "Email" },
    { value: "attendingStatus", label: "Status" },
  ];
  const handleSelectTab = (tab: any) => {
    setSortBy({
      type: sortBy.type === "assending" ? "desending" : "assending",
      property: tab
    })
  }
  useEffect(() => {
    if (!resendInviteState.isLoading && openModal && resendInviteState.data && resendInviteState.data.id) {
      setResendModalToggle(true)
      setOpenModal(false)
    }
  })
  return (
    <TripPlaningMainContainer>
      <NewFriendButtonDiv>
        <Button
          onClick={() => setAddModalToggle(true)}
          style={{
            width: SmallScreen ? '95%' : "auto"
          }}
        >
          + New Invite
        </Button>
      </NewFriendButtonDiv>
      {/* <div
        style={{
          padding: "25px"
        }}
      > */}
      {SmallScreen ?
        <div style={{
          padding: '15px 15px 10px 5px'
        }}>

          <SelectMenu options={tabs} onChange={handleSelectTab} />
        </div>
        : null}

      <TableStyled>
        <Table
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            borderRadius: '4px',
            border: 'solid 1px #e5e7e9',
            width: "96%",
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: ' 0px 0px 0px 1px #e5e7e9'
          }}>
          <Thead
            style={{
              backgroundColor: "#f3f5f6",
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
                  property: 'firstName'
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
                  property: 'email'
                })}
              >Email {!SmallScreen && <Sort />}</Th>
              <Th style={{
                cursor: "pointer",
                textAlign: "left",
                paddingLeft: '14px',
                backgroundColor: SmallScreen ? '#f3f5f6' : "none"
              }}
                onClick={() => setSortBy({
                  type: sortBy.type === 'assending' ? 'desending' : 'assending',
                  property: 'attendingStatus'
                })}
              >Status {!SmallScreen && <Sort />}</Th>
              <Th style={{
                textAlign: "left",
                paddingLeft: '14px',
                backgroundColor: SmallScreen ? '#f3f5f6' : "none"
              }}>Action </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortIt(getDashboardDataProperty("tripGuests", []), sortBy).map(
              (value: any, index: any) => {
                return (
                  <>
                    <Tr
                      key={index}
                      style={{
                        color: "#292c36",
                        // borderBottom: "1px solid #e5e7e9",

                      }}
                    >
                      <Td style={tdStyle}>
                        {value.firstName} {value.lastName}
                      </Td>
                      <Td style={tdStyle}>{value.email}</Td>
                      <Td style={tdStyle}>
                        {value.attendingStatus == "false" ? (
                          <StatusRejectedTd>Rejected</StatusRejectedTd>
                        ) : value.attendingStatus == "Yes" ? (
                          <StatusJoinedTd>Joined</StatusJoinedTd>
                        ) : (
                              <StatusPendingTd>
                                Pending
                              </StatusPendingTd>
                            )}
                      </Td>
                      {["false", "Yes"].indexOf(value.attendingStatus) == -1 ? (
                        <Td style={{ color: "#1285d8", cursor: "pointer", ...tdStyle }}
                          onClick={() => {
                            setOpenModal(true)
                            let payload = {
                              "email": value.email,
                              "tripId": value.TripId,
                              "tripGuestId": value.id
                            }
                            resendInviteDispatch({ type: "RESEND_INVITE", payload: { params: payload } })
                          }}
                        >
                          Resend Invite
                      </Td>
                      ) : (
                          <Td></Td>
                        )}
                    </Tr>
                    {
                      !SmallScreen ?
                        <tr style={{
                          // color: "#292c36",

                        }}>
                          <td style={{
                            padding: "0px 12px"
                          }} colSpan={4}>

                            <hr style={{
                              borderTop: index === getDashboardDataProperty("tripGuests", []).length - 1 ? "1px solid transparent" : "1px solid #e5e7e9",
                              visibility: index === getDashboardDataProperty("tripGuests", []).length - 1 ? "hidden" : "initial",
                            }} />

                          </td>

                        </tr>
                        : null
                    }
                  </>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableStyled>
      {resendModal ? (
        <ResendModal
          toggle={() => setResendModalToggle(!resendModal)}
          close={() => setResendModalToggle(false)}
          open={resendModal}
        />
      ) : null}
      {/* </div> */}
      {addModal ? (
        <AddNewInviteModal
          toggle={() => setAddModalToggle(!addModal)}
          close={() => setAddModalToggle(false)}
          open={addModal}
          settingData={settingData}
          data={getDashboardDataProperty("tripGuests", []) ? getDashboardDataProperty("tripGuests", []) : []}
          currentUser={currentUser ? currentUser.id : 0}
        />
      ) : null}
    </TripPlaningMainContainer >
  );
};

export default Summary;
