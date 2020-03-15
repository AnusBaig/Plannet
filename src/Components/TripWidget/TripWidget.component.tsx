import React from "react";
import RectanguleShadow from "../RectanguleShadow";
import {
  TripWidgetStyled,
  TitleStyled,
  TitleWrapperStyled,
  TaglineStyled,
  DatesStyled
} from "./TripWidget.styled";

interface TripWidgetProps {
  width?: string;
  name: string;
  dates: string;
  location?: string;
  style?: React.CSSProperties;
}

const TripWidget: React.FC<TripWidgetProps> = ({
  width = "600px",
  name,
  location,
  dates,
  style
}) => {
  return (
    <TripWidgetStyled style={{ ...style, width: `calc(${width} - 6px)` }}>
      <RectanguleShadow>
        <TitleWrapperStyled>
          <TitleStyled>{name}</TitleStyled>
          {location && <TaglineStyled>{location}</TaglineStyled>}
        </TitleWrapperStyled>
        <DatesStyled>{dates}</DatesStyled>
      </RectanguleShadow>
    </TripWidgetStyled>
  );
};

export default TripWidget;
