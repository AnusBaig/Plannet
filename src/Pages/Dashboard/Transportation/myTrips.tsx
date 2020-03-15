import React, { useState, useEffect } from "react";
import {
  ContainDiv1,
  ConatinDiv1TextDiv,
  ConatinDiv1SmallTextDiv,
  ContainDiv2,
  ContentDiv2DateDiv,
  ContainDiv2OriginDiv,
  ContainDiv2DestinationDiv,
  ContainDiv2FlightDetailDiv,
  ContainDiv2AddFlightDetails,
  ContainDiv2SearchFilterButton,
  ContainDiv2FlightDetailErrorDiv,
  ContainDiv2FlightDetailErrorTextDiv,
  YellowInfoIcon,
  RedInfoIcon,
  TravelDetailExpensionDiv,
  TravelDetailExpensionTextDiv,
  TravelDetailExpensionSmallTextDiv,
  EditButton,
  ContainDiv2Container
} from "./Transportation.styled";
import _ from "lodash"

import { ReactComponent as Check } from "src/shared/assets/check-circle.svg";
import { ReactComponent as ArrowDown } from "src/shared/assets/d-1.svg";
import AddflightDetailsModal from "./AddFlightDetailModal/AddFlightDetails.modal";
import { RouteComponentProps } from "@reach/router";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { ReactComponent as CompleteIcon } from "src/shared/assets/completed.svg";
import { ReactComponent as CarIcon } from "src/shared/assets/car.svg";
import { ReactComponent as BoatIcon } from "src/shared/assets/anchor.svg";
import { ReactComponent as TrainIcon } from "src/shared/assets/train.svg";
import { ReactComponent as AirplaneIcon } from "src/shared/assets/airplane.svg";
import { TagStyled } from "src/Components/TransportationCard/TransportationCard.styled";
import EditFlightDetailsModal from "./Modals/EditFlightDetails.modal";
const MyTrips: React.FC<RouteComponentProps> = () => {
  const { getTripData } = useDashboardOverview();
  const [ExpensionIndex, setExpensionIndex] = useState();
  const [addToggle, setAddToggle] = useState(false)
  const [addSubToggle, setAddSubToggle] = useState(false)
  const [flightLegForTripGuests, setflightLegForTripGuests] = useState({});
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [tripLegId, setTripLegId] = useState(0)
  const [tripId, setTripId] = useState(0)
  const [tripGuestId, setTripGuestId] = useState(0)
  const [tripType, setTripType] = useState('')
  const [dpDate, setDpDate] = useState('')
  const [arDate, setArDate] = useState('')
  const [EditModalToggle, setEditModalToggle] = useState(false);
  const [changeDep, setChangeDep] = useState(false)
  const [changeArr, setChangeArr] = useState(false)

  const dataArr = getTripData("MyTrips", []);
  const dataArrPlaces = getTripData("MyPlaces", []);
  const tags: { [key: string]: any[] } = {
    airplane: [" AIRPLANE", <AirplaneIcon />],
    Plane: [" AIRPLANE", <AirplaneIcon />],
    Airoplain: [" AIRPLANE", <AirplaneIcon />],
    train: [" TRAIN", <TrainIcon />],
    boat: [" BOAT", <BoatIcon />],
    car: [" CAR", <CarIcon />],
  };
  useEffect(() => {
    if (ExpensionIndex) {
      setflightLegForTripGuests({
        id: dataArr[ExpensionIndex].id,
        type: dataArr[ExpensionIndex].flightDetails,
        flightNumber: dataArr[ExpensionIndex].flightNumber ? dataArr[ExpensionIndex].flightNumber : "",
        location: dataArr[ExpensionIndex].location,
        origin: dataArr[ExpensionIndex].origin,
        destination: dataArr[ExpensionIndex].destination,
        departureDate: new Date(dataArr[ExpensionIndex].startDate),
        arrivalDate: new Date(dataArr[ExpensionIndex].endDate),
      })
    }
  }, [EditModalToggle, ExpensionIndex])
  const addingMode = () => {
    setAddToggle(false)                  
  }
  const handleDepChange = (value: boolean) => {
    setChangeDep(value)                  
  } 
  const handleArrChange = (value: boolean) => {
    setChangeArr(value)                  
  }
  const updateTransportation = (acc: undefined | Object) => {
    if (acc) {
      let accArr = _.find(dataArr, (o, index) => {
         //@ts-ignore
          if (acc.transportationLegId === o.id) {
            //@ts-ignore            
            dataArr[index]['flightNumber'] = acc['flightNumber']
            //@ts-ignore            
            dataArr[index]['origin'] = acc['origin']
            //@ts-ignore            
            dataArr[index]['departureTime'] = acc['departureTime']
            //@ts-ignore            
            dataArr[index]['arrivalTime'] = acc['arrivalTime']
            //@ts-ignore            
            dataArr[index]['destination'] = acc['destination']
          }
      })
    }
  } 
  console.log('dateArr', dataArr)
  const SmallScreen = useMediaQuery('SM');
  let flightCount = 0
  //@ts-ignore              
  dataArr && dataArr.map((d) => {
    //@ts-ignore                
    if (d.flightNumber) {
      flightCount += 1
    }
  })
  return (
    <div style={{
      maxWidth: '812px',
      margin: "auto"
    }}>
      <ContainDiv1>
        <ConatinDiv1TextDiv>
          <YellowInfoIcon>!</YellowInfoIcon>{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#0088e4"
            }}
          >
            {/* {getTripData("bookedLegs", 0)} */}
            {flightCount}
          </span>{" "}
          Out Of{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#0088e4"
            }}
          >
            {getTripData("totalLegs", 0)}
          </span>{" "}
          Legs Booked
        </ConatinDiv1TextDiv>
        <ConatinDiv1SmallTextDiv>
          You'r almost there! keeps going before time runs out
        </ConatinDiv1SmallTextDiv>
      </ContainDiv1>
      {dataArr.map((value: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              // width: "812px",
              margin: "24px auto"
            }}
          >
            <ContainDiv2 >
              <div style={{display: SmallScreen ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <ContentDiv2DateDiv>
                  <div  style={{display: 'flex', alignItems: 'center'}}>
                    {value.flightNumber && <CompleteIcon style={{paddingRight: '15px'}}/>} <span >{value.departureDate}</span>
                  </div>  
                </ContentDiv2DateDiv>
                {!value.flightNumber && (
                  <ContainDiv2FlightDetailErrorDiv>
                    <RedInfoIcon>!</RedInfoIcon>{" "}
                    <ContainDiv2FlightDetailErrorTextDiv>
                      Enter Flight Details
                    </ContainDiv2FlightDetailErrorTextDiv>
                  </ContainDiv2FlightDetailErrorDiv>
                )}
              </div>
              {
                !value.flightNumber && SmallScreen &&
                  <div>
                    <br /> 
                    <br /> 
                  </div>  
              }
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: SmallScreen ? 'flex-start' : 'center'}}>
                <div style={{display: SmallScreen ? 'block' : 'flex', alignItems: 'center'}}>
                  <ContainDiv2OriginDiv style={{
                    paddingTop: !value.type ? '20px' : '0px',
                  }}>
                    <span style={{ fontSize: "10px" }}>ORIGIN</span> <br />
                    <span style={{fontFamily: 'Quicksand'}}>{value.origin}</span>
                  </ContainDiv2OriginDiv>
                  <ContainDiv2DestinationDiv>
                    <span style={{ fontSize: "10px" }}>DESTINATION</span> <br />
                    <span style={{fontFamily: 'Quicksand'}}>{value.destination}</span>
                  </ContainDiv2DestinationDiv>
                </div>  
                  {value.flightNumber && (
                    <ArrowDown
                      onClick={() => {
                        setAddToggle(false)   
                        setAddSubToggle(false)               
                        if (ExpensionIndex === index) {
                          setExpensionIndex("");
                        } else {
                          setExpensionIndex(index);
                        }
                      }}
                      style={{
                        // float: "right",
                        // padding: "15px",
                        cursor: "pointer",
                        transform:
                          ExpensionIndex === index
                            ? "rotate(270deg)"
                            : "rotate(0deg)",
                        transition: "all 0.5s ease 0s"
                      }}
                    />
                  )}
              </div>  
              <ContainDiv2Container>
                {value.flightNumber ? ( tags && tags[value.type] &&
                  <TagStyled style={{
                    marginLeft: "0px"
                  }}>
                    {tags && tags[value.type] && tags[value.type][1]} {tags && tags[value.type] && tags[value.type][0]}
                  </TagStyled>
                ) : (
                    <ContainDiv2AddFlightDetails
                      onClick={() => {
                        setTripLegId(value.id)
                        setEditModalToggle(true)
                        setAddModalToggle(!addModalToggle)
                        setTripId(value.TripId)
                        setDpDate(value.departureDate)
                        setArDate(value.arrivalDate)
                        setTripType(value.type)
                        setExpensionIndex(index)
                        setAddToggle(true)
                        setAddSubToggle(true)
                        handleArrChange(false)
                        handleDepChange(false)
                      }}
                    >
                      + Add Flight Details
                  </ContainDiv2AddFlightDetails>
                  )}
                {!value.flightNumber && (
                  <ContainDiv2SearchFilterButton>
                    Search Filter
                  </ContainDiv2SearchFilterButton>
                )}
              </ContainDiv2Container>
            </ContainDiv2>
            {ExpensionIndex === index  && !addSubToggle? (
              <TravelDetailExpensionDiv >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                  <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '50%', flexDirection: 'column' }}>
                    <div style={{ display: SmallScreen ? 'block' : 'flex', justifyContent: 'space-between'}}>
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                        <TravelDetailExpensionSmallTextDiv>
                          Flight NO.
                        </TravelDetailExpensionSmallTextDiv>
                        <TravelDetailExpensionTextDiv>
                          {value.flightNumber}
                        </TravelDetailExpensionTextDiv>
                      </div>
                      <div style={{ display: 'flex', width: '71%', justifyContent: 'space-between' }}>
                        <div style={{paddingRight: SmallScreen ? '8px' : '40px'}}>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                            <TravelDetailExpensionSmallTextDiv>
                              Origin
                          </TravelDetailExpensionSmallTextDiv>
                            <TravelDetailExpensionTextDiv>
                              {value.origin}
                            </TravelDetailExpensionTextDiv>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                            <TravelDetailExpensionSmallTextDiv>
                              Destination
                          </TravelDetailExpensionSmallTextDiv>
                            <TravelDetailExpensionTextDiv>
                              {value.destination}
                            </TravelDetailExpensionTextDiv>
                          </div>
                        </div>
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                            <TravelDetailExpensionSmallTextDiv>
                              Departure Time
                            </TravelDetailExpensionSmallTextDiv>
                            <TravelDetailExpensionTextDiv>
                              {value.departureTime}
                            </TravelDetailExpensionTextDiv>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                            <TravelDetailExpensionSmallTextDiv>
                              Arrival Time
                            </TravelDetailExpensionSmallTextDiv>
                            <TravelDetailExpensionTextDiv>
                              {value.arrivalTime}
                            </TravelDetailExpensionTextDiv>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>
                  <EditButton onClick={() => {
                    setTripLegId(value.id)
                    setEditModalToggle(!EditModalToggle)
                    setAddModalToggle(!addModalToggle)
                    setTripId(value.TripId)
                    setDpDate(value.departureDate)
                    setArDate(value.arrivalDate)
                    setTripType(value.type)
                    setAddToggle(false)
                    setAddSubToggle(false)
                    handleArrChange(true)
                    handleDepChange(true)
                  }} style={{ alignSelf: "flex-start" }}>EDIT</EditButton>
                </div>  
              </TravelDetailExpensionDiv>
            ) : null}
          </div>
        );
      })}
      {addModalToggle ? (
        <AddflightDetailsModal
          toggle={() => {
            setAddModalToggle(!addModalToggle)
            setEditModalToggle(!EditModalToggle)
          }}
          close={() => {
            setAddModalToggle(false)
            setEditModalToggle(!EditModalToggle)
          }}
          open={addModalToggle}
          Edit={EditModalToggle}
          tripId={tripId}
          tripLegId={tripLegId}
          updateTransportation={updateTransportation}
          tripGuestId={tripGuestId}
          tripType={tripType}
          EditObj={EditModalToggle ? dataArr[ExpensionIndex] : {}}
          dpDate={dpDate}
          arDate={arDate}
          addToggle={addToggle}
          handleDepChange={handleDepChange}
          handleArrChange={handleArrChange}
          changeDep={changeDep}
          changeArr={changeArr}
          addingMode={addingMode}
        />
      ) : null}
      {/* {EditModalToggle ?
        //@ts-ignore
        <EditFlightDetailsModal
          modalEditFlightDetailsData={
            {
              //@ts-ignore

              flightLeg: flightLegForTripGuests,
              flightTrip: ""
            }
          }
          open={EditModalToggle}
          toggle={() => setEditModalToggle(!EditModalToggle)}
          onCancel={() => setEditModalToggle(!EditModalToggle)}
        />
        : null} */}
    </div>
  );
};
export default MyTrips;
