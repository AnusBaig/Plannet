import React from "react";
import RectanguleShadow from "src/Components/RectanguleShadow";
import { LegTripSuggestionWrapper } from "./LegTripSuggestion.styled";

interface LegTripSuggestionProps {
  location: string;
  dates: string | Date;
}

const LegTripSuggestion: React.FC<LegTripSuggestionProps> = ({
  location,
  dates
}) => {
  return (
    <LegTripSuggestionWrapper>
      <RectanguleShadow>
        <strong>{location}</strong>
        <span>{dates}</span>
      </RectanguleShadow>
    </LegTripSuggestionWrapper>
  );
};

export default LegTripSuggestion;
