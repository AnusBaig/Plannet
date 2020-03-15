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
  TravelDetailExpensionTextDivLink,
  TravelDetailExpensionSmallTextDiv,
  EditButtonPlaces
} from "../Transportation/Transportation.styled";
import { ReactComponent as Check } from "src/shared/assets/completed.svg";
import _ from "lodash"

import { ReactComponent as ArrowDown } from "src/shared/assets/d-1.svg";
import AddPlaceDetailsModal from "./Modals/AddPlaceDetails.modal";
import { RouteComponentProps } from "@reach/router";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { TagStyled } from "src/Components/TransportationCard/TransportationCard.styled";
import { OvalStyled } from "src/Components/AccomodationCard/AccomodationCard.styled";

const MyPlaces: React.FC<RouteComponentProps> = () => {
  const { getTripData } = useDashboardOverview();
  const [ExpensionIndex, setExpensionIndex] = useState();
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [tripLegId, setTripLegId] = useState(0)
 
  const [editObj, setEditObj] = useState({})
  const smallScreen = useMediaQuery("SM");
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  // const dataArr = getTripData("MyPlaces", []);
  const tags: { [key: string]: string } = {
    airbnb: " AIRBNB",
    hotel: " HOTEL",
    Hotel: " HOTEL",
    local: " LOCAL",
  };
  const dataArr = dashboardOverview && dashboardOverview.accommodations ? dashboardOverview.accommodations : []
  console.log('dataArr', dataArr)
  const updateAccommodation = (acc: undefined | Object) => {
    if (acc) {
      let accArr = _.find(dataArr, (o, index) => {
         //@ts-ignore
          if (acc.accommodationId === o.id) {
            //@ts-ignore            
            dataArr[index]['name'] = acc['name']
            //@ts-ignore            
            dataArr[index]['type'] = acc['type']
            //@ts-ignore            
            dataArr[index]['link'] = acc['link']
          }
      })
    }
  } 

  const findArr = (tripLegs: any[], accommodations: any[]) => {
    var arr = tripLegs && tripLegs.map((value: any, i: any) => {
      
      if (accommodations.find(obj => obj.TripLegId == value.id)) {
        return {
          ...value,
          ...accommodations.find((obj: any) => obj.TripLegId == value.id),
          accommodationId: accommodations.find((obj: any) => obj.TripLegId == value.id).id,
          startDate: value.startDate,
          endDate: value.startDate,
          location: value.location
        }
      }
    })
    console.log('accArr',  tripLegs, accommodations, arr)        
    return arr
  }
  const SmallScreen = useMediaQuery('SM');
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
            {/* {getTripData("bookedPlaces", 0)} */}
            {dashboardOverview && findArr(dashboardOverview.tripLegs, dataArr) && findArr(dashboardOverview.tripLegs, dataArr).length && findArr(dashboardOverview.tripLegs, dataArr).filter(obj => obj && obj.type && obj.name && obj.link) && findArr(dashboardOverview.tripLegs, dataArr).filter(obj => obj && obj.type && obj.name && obj.link).length}
          </span>{" "}
          Out Of{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#0088e4"
            }}
          >
            {dashboardOverview && findArr(dashboardOverview.tripLegs, dataArr) && findArr(dashboardOverview.tripLegs, dataArr).length}
          </span>{" "}
          Legs Booked
        </ConatinDiv1TextDiv>
        <ConatinDiv1SmallTextDiv>
          You'r almost there! keeps going before time runs out
        </ConatinDiv1SmallTextDiv>
      </ContainDiv1>
      {dashboardOverview && findArr(dashboardOverview.tripLegs, dataArr) && findArr(dashboardOverview.tripLegs, dataArr).length && findArr(dashboardOverview.tripLegs, dataArr).map((value: any, index: number) => {
        return value && (
          <div
            key={index}
            style={{
              // width: "812px",
              // height: 117px,
              margin: "24px auto"
            }}
          >
            <ContainDiv2 style={{
              height: SmallScreen ? value.name || value.link ? "200px" : "280px" : 'auto',
              // maxHeight: '400px',
            }}>
              <div>
                <ContentDiv2DateDiv>
                  {
                    (value.name || value.link) &&  
                    <Check
                      style={{
                        margin: "-4px",
                        paddingRight: '5px'
                      }}
                      width="24px"
                      height="24px"
                    />
                  }
                  {" "} <span style={{fontSize: SmallScreen ? '18px': '21px'}}>{value.location}</span>
                </ContentDiv2DateDiv>
                {!value.name && !value.link && (
                  <ContainDiv2FlightDetailErrorDiv>
                    <RedInfoIcon>!</RedInfoIcon>{" "}
                    <ContainDiv2FlightDetailErrorTextDiv>
                      Enter booking Details
                    </ContainDiv2FlightDetailErrorTextDiv>
                  </ContainDiv2FlightDetailErrorDiv>
                )}
              </div>
              
              {
                (!value.name && !value.link) && SmallScreen &&
                  <div>
                    <br /> 
                    <br /> 
                  </div>  
              }
              <ContainDiv2OriginDiv
                style={{
                  paddingTop: !value.type ? '20px' : '0px',
                }}>
                <span style={{ fontSize: "10px" }}>ARRIVE</span> <br />
                {value.startDate}
              </ContainDiv2OriginDiv>
              <ContainDiv2DestinationDiv>
                <span style={{ fontSize: "10px" }}>DEPART</span> <br />
                {value.endDate}
              </ContainDiv2DestinationDiv>
              {(value.name || value.link) && (
                <ArrowDown
                  onClick={() => {
                    if (ExpensionIndex === index) {
                      setExpensionIndex("");
                    } else {
                      setExpensionIndex(index);
                    }
                  }}
                  style={{
                    float: "right",
                    padding: "15px",
                    cursor: "pointer",
                    transform:
                      ExpensionIndex === index
                        ? "rotate(270deg)"
                        : "rotate(0deg)",
                    transition: "all 0.5s ease 0s"
                  }}
                />
              )}
              <div>
                {value.name || value.link ? ( tags && tags[value.type] &&
                  <TagStyled style={{
                    marginLeft: 0,
                  }}>
                    <OvalStyled /> {tags[value.type]}
                  </TagStyled>
                ) : (
                    <ContainDiv2AddFlightDetails
                      onClick={() => {
                        setTripLegId(value.id)
                        setEditObj(value)                        
                        setAddModalToggle(true)
                      }}
                    >
                      + Add Booking Details
                  </ContainDiv2AddFlightDetails>
                  )}
                {!value.name && !value.link && (
                  <ContainDiv2SearchFilterButton>
                    Search Hotels
                  </ContainDiv2SearchFilterButton>
                )}
              </div>
            </ContainDiv2>
            {ExpensionIndex === index ? (
              <TravelDetailExpensionDiv>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div>
                    <div style={{
                      display: 'flex',
                      flexDirection: "column"
                    }}>
                      <TravelDetailExpensionSmallTextDiv>
                        ACCOMMODATION NAME
                      </TravelDetailExpensionSmallTextDiv>
                      <TravelDetailExpensionTextDiv>
                        {value.name ? value.name : "name not add"}
                      </TravelDetailExpensionTextDiv>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: "column",
                      marginTop: '15px'
                    }}>
                      <TravelDetailExpensionSmallTextDiv>
                        ACCOMMODATION LINK
                      </TravelDetailExpensionSmallTextDiv>
                      <TravelDetailExpensionTextDivLink>
                        {value.link ? 
                          <a href={"https://" +value.link} target="_blank">{value.link}</a> : "Link not add"}

                      </TravelDetailExpensionTextDivLink>
                    </div>
                  </div>
                  <div>
                    <EditButtonPlaces onClick={() => {
                      setAddModalToggle(true)
                      setEditObj(value)
                    }
                    }>EDIT</EditButtonPlaces>
                  </div>
                </div>  
              </TravelDetailExpensionDiv>
            ) : null}
          </div>
        );
      })}
      {addModalToggle ? (
        <AddPlaceDetailsModal
          toggle={() => setAddModalToggle(!addModalToggle)}
          close={() => {
            setAddModalToggle(false)
            setEditObj({})
          }}
          EditObj={editObj}
          updateAccommodation={updateAccommodation}
          open={addModalToggle}
          tripLegId={tripLegId}
        />
      ) : null}
    </div>
  );
};
export default MyPlaces;
