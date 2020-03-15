import React, { useState, useCallback, useEffect, useContext } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { RouteComponentProps } from "@reach/router";
import Button from "src/Components/Button";
import {
  TripPlaningMainContainer,
  NewFriendButtonDiv,
  CircleStyled
} from "src/Pages/Dashboard/Dashboard.styled";
import '../../CreateTrip/Step11/scrollbarStyled.css'
import './cityDates.css'
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { formatDate } from "src/shared/utils/misc";
import { useAuth } from "src/Providers/Auth";
import EditCityModal from "./Modals/EditCityModal";
import DeleteCityModal from "./Modals/DeleteCityModal";
import useApi from "src/shared/hooks/useApi";
import AddCityModal from "./Modals/AddCityModal";
import { TableStyled, DeleteButtonStyled, NewLocationButtonStyled } from "./CityDates.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";

let dashboardDetails: object | undefined;

const Summary: React.FC<RouteComponentProps> = (props: any) => {
  const [id, setId] = useState(0);
  //@ts-ignore            
  const { state, dispatch } = useApi("trip/getDashboardData/" + window.location.pathname.slice(11), "get");
  // console.log(props)

  const [editModal, setEditModalToggle] = useState(false);
  const [deleteModal, setDeleteModalToggle] = useState(false);
  const [addModal, setAddModalToggle] = useState(false);

  const [deleteId, setDeleteId] = useState({});
  const [data, setData] = useState();
  const [leg, setLeg] = useState();

  const {
    state: { dashboardOverview },
    dispatch: dashboardDispatch
  } = useDashboardOverview();
  const { isLoading, isError } = state;

  //@ts-ignore              
  const getDashboardData = useCallback(
    () => dispatch({ type: "GET_DASHBOARD" }),
    [dispatch]
  );

  useEffect(() => {
    if (!state.api) return;
    getDashboardData();

    return () => {
      dashboardDispatch({ type: "CLEAR_DASHBOARD" });
    };
  }, [state.api, dashboardDispatch, getDashboardData]);

  useEffect(() => {
    if (dashboardOverview) {
      setData(dashboardOverview);
    }
  }, [dashboardOverview])
  useEffect(() => {
    if (state.data.currentDashboard) {
      setData(state.data.currentDashboard);
      dashboardDispatch({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.currentDashboard
      });
    }
  }, [state.data.currentDashboard, dashboardDispatch]);

  const { currentUser } = useAuth();

  const getDashboardDataProperty = (dotNotation: string, defaultR: any = "") =>
    (dashboardOverview &&
      dotNotation
        .split(".")
        .reduce((object, key) => object && object[key], dashboardOverview)) ||
    defaultR;
  const isAdmin: boolean = !!(
    getDashboardDataProperty("tripGuests", []).find(
      ({ id }: { id: number }) => id == (currentUser && currentUser.id)
    ) || {}
  ).isAdmin;
  const editTripLeg = (trip: object) => {
    setLeg(trip)
    setEditModalToggle(true)
  }

  const deleteTripLeg = (trip: object) => {
    setDeleteId(trip)
    setDeleteModalToggle(true)
  }
  const addTripLeg = () => {
    setAddModalToggle(true)
  }

  const updateDashboard = () => {
    dispatch({ type: "GET_DASHBOARD" })
  }

  const SmallScreen = useMediaQuery('XS')
  let dataArrForCity = data && data.tripLegs ? data.tripLegs : []
  // console.log('dataArrForCity', dataArrForCity, data)
  return (
    <TripPlaningMainContainer>
      <div style={{ display: SmallScreen ? 'flex' : '', justifyContent: SmallScreen ? 'center' : 'flex-end', alignItems: 'center' }}>
        <NewLocationButtonStyled style={{ width: SmallScreen ? '95%' : 'auto', float: SmallScreen ? 'inherit' : 'right', marginBottom: SmallScreen ? '0' : '20px', marginRight: SmallScreen ? 'auto' : '20px' }} onClick={addTripLeg}>
          + New Location
        </NewLocationButtonStyled>

      </div>

      <TableStyled>
        <Table style={{ border: '1px solid #e5e7e9', borderRadius: 4 }}>
          <Thead style={{ borderCollapse: 'collapse !important' }}>
            <Tr style={{ height: 40 }}>
              <Th style={{ background: '#f3f5f6' }}>Location</Th>
              <Th style={{ background: '#f3f5f6' }}>Arrival</Th>
              <Th style={{ background: '#f3f5f6' }}>Departure</Th>
              {isAdmin && !SmallScreen && <Th style={{ background: '#f3f5f6' }}>Actions</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {dataArrForCity.sort((a: any, b: any) => a.legOrder - b.legOrder).map((leg: any, i: number) => (
              <Tr className="cityAndDatesTable" key={leg.id} style={{ borderCollapse: 'collapse !important', textAlign: 'center' }}>
                <Td style={borderBottomStyle}>
                  <strong>{leg.location}</strong>
                </Td>
                <Td style={borderBottomStyle}><span style={{ color: '#0088e4' }}>{formatDate(leg.startDate)}</span></Td>
                <Td style={borderBottomStyle}><span style={{ color: '#0088e4' }}>{formatDate(leg.endDate)}</span></Td>
                {isAdmin && (
                  <Td className="tdRemove" style={{ ...borderBottomStyle, padding: "0px", width: SmallScreen ? "100%" : "auto" }}>
                    <div className="ButtonDiv" style={{ display: !SmallScreen ? 'flex' : "block", alignItems: 'center', flexWrap: 'wrap', justifyContent: "center", textAlign: 'center' }}>
                      <Button variant="secondary" size="small" onClick={() => editTripLeg(leg)} style={{ width: SmallScreen ? '88%' : "96px", fontSize: 14 }}>Edit</Button>
                      <DeleteButtonStyled style={{ fontSize: 14 }} onClick={() => deleteTripLeg(leg)}>Delete</DeleteButtonStyled>
                    </div>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableStyled>
      {editModal ? (
        <EditCityModal
          toggle={() => setEditModalToggle(!editModal)}
          close={() => setEditModalToggle(false)}
          open={editModal}
          leg={leg}

          currentUser={currentUser ? currentUser.id : 0}

        />
      ) : null}
      {deleteModal ? (
        <DeleteCityModal
          toggle={() => setDeleteModalToggle(!deleteModal)}
          close={() => setDeleteModalToggle(false)}
          deleteLeg={deleteId}
          currentUserId={currentUser ? currentUser.id : null}
          open={deleteModal}
          // currentUser={currentUser ? currentUser.id : 0}
          currentUser={window.location.pathname.slice(11)}
        />
      ) : null}
      {addModal ? (
        <AddCityModal
          toggle={() => setAddModalToggle(!addModal)}
          close={() => setAddModalToggle(false)}
          deleteLeg={deleteId}
          open={addModal}
          data={dataArrForCity}
          // currentUser={currentUser ? currentUser.id : 0}
          currentUser={window.location.pathname.slice(11)}
        />
      ) : null}
    </TripPlaningMainContainer>
  );
};


const borderBottomStyle = {
  paddingBottom: 10,
  paddingTop: 10,
  borderBottom: '1px solid #e5e7e9',
}

export default Summary;