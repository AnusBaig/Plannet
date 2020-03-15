import React from "react";

import {
  EditStyled,
  DateStyled,
  LocationCityStyled,
  LocationStyled,
  CityStyled,
  OvalStyled,
  BoxStyled,
  TagStyled,
  ContainerStyled,
} from "./AccomodationCard.styled";

import { ReactComponent as CompleteIcon } from "src/shared/assets/completed.svg";

interface AccomodationCardProps {
    arrivalDate: any;
    departureDate: any;
    location: string;
    cardSelected: boolean;
    cardCompleted: boolean;
    onClick: () => void;
    tag?: string;
}

const AccomodationCard: React.FC<AccomodationCardProps> = ({
    arrivalDate,
    departureDate,
    location,
    cardSelected,
    cardCompleted,
    onClick,
    tag,
}) => {
    const tags: { [key: string]: string }  = {
      airbnb: " AIRBNB",
      hotel: " HOTEL",
      local: " LOCAL",
    };

    return (
        <ContainerStyled 
          selected={cardSelected}
          completed={cardCompleted}
          onClick={onClick}
        >
          {cardCompleted && <CompleteIcon />}
          <DateStyled selected={cardSelected}>
            {arrivalDate} {' - '} {departureDate}
            {cardCompleted && (
              <EditStyled>
                Edit
              </EditStyled>
            )}
          </DateStyled>

          <BoxStyled selected={cardSelected} />

          <CityStyled>
            <LocationStyled>
              Location
              <LocationCityStyled selected={cardSelected}>
                {location}
              </LocationCityStyled>
            </LocationStyled>
          </CityStyled>
          {cardCompleted && tag && (
            <TagStyled >
              <OvalStyled /> {tags[tag]}
            </TagStyled>
          )}
        </ContainerStyled>
    )
};

export default AccomodationCard;