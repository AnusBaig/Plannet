import React from "react";

import {
  EditStyled,
  DateStyled,
  OriginCityStyled,
  OriginStyled,
  DestinationCityStyled,
  DestinationStyled,
  CityStyled,
  BoxStyled,
  TagStyled,
  ContainerStyled,
} from "./TransportationCard.styled";

import { ReactComponent as CompleteIcon } from "src/shared/assets/completed.svg";
import { ReactComponent as CarIcon } from "src/shared/assets/car.svg";
import { ReactComponent as BoatIcon } from "src/shared/assets/anchor.svg";
import { ReactComponent as TrainIcon } from "src/shared/assets/train.svg";
import { ReactComponent as AirplaneIcon } from "src/shared/assets/airplane.svg";

interface TransportCardProps {
    date: string;
    origin: string;
    destination: any;
    cardSelected: boolean;
    cardCompleted: boolean;
    onClick: () => void;
    tag?: string;
}

const TransportationCard: React.FC<TransportCardProps> = ({
    date,
    origin,
    destination,
    cardSelected,
    cardCompleted,
    onClick,
    tag,
}) => {
    const tags: { [key: string]: any[] }  = {
      airplane: [" AIRPLANE", <AirplaneIcon />],
      train: [" TRAIN", <TrainIcon />],
      boat: [" BOAT", <BoatIcon />],
      car: [" CAR", <CarIcon />],
    };

    return (
        <ContainerStyled 
          selected={cardSelected}
          completed={cardCompleted}
          onClick={onClick}
        >
          {cardCompleted && <CompleteIcon />}
          <DateStyled selected={cardSelected}>
            {date}
            {cardCompleted && (
              <EditStyled>
                Edit
              </EditStyled>
            )}
          </DateStyled>

          <BoxStyled selected={cardSelected} />

          <CityStyled>
            <OriginStyled>
              ORIGIN
              <OriginCityStyled selected={cardSelected}>
                {origin}
              </OriginCityStyled>
            </OriginStyled>
            <DestinationStyled>
              DESTINATION
              <DestinationCityStyled selected={cardSelected} >
                {destination}
              </DestinationCityStyled>
            </DestinationStyled>
          </CityStyled>
          {cardCompleted && tag && (
            <TagStyled >
              {tags[tag][1]} {tags[tag][0]}
            </TagStyled>
          )}
        </ContainerStyled>
    )
};

export default TransportationCard;