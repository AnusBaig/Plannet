import React from "react";
import RectanguleShadow from "src/Components/RectanguleShadow";
import { ReactComponent as ArrowCircle } from "src/shared/assets/arrow-right-circle.svg";
import {
  RSVPInlineWidgetStyled,
  LabelStyled,
  ValueStyled,
  DatesStyled,
  ButtonWrapperStyled
} from "./RSVPInlineWidget.styled";

interface RSVPInlineWidgetProps {
  name: string;
  location: string;
  dates: string;
  onClick(): void;
}

const RSVPInlineWidget: React.FC<RSVPInlineWidgetProps> = ({
  name,
  location,
  dates,
  onClick
}) => {
  return (
    <RSVPInlineWidgetStyled onClick={onClick}>
      <RectanguleShadow width="100%">
        <LabelStyled>{name}</LabelStyled>
        <ValueStyled>{location}</ValueStyled>
        <ButtonWrapperStyled>
          <DatesStyled>{dates}</DatesStyled>
          <ArrowCircle width="28px" />
        </ButtonWrapperStyled>
      </RectanguleShadow>
    </RSVPInlineWidgetStyled>
  );
};

export default RSVPInlineWidget;
