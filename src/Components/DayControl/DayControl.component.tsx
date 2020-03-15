import React from "react";
import { FieldDate } from "@dimelo/createtrip";
import { ReactComponent as LeftIcon } from "src/shared/assets/calendar-arrow-left.svg";
import { ReactComponent as RightIcon } from "src/shared/assets/calendar-arrow-right.svg";
import {
  DayControlStyled,
  ArrowsStyled,
  ArrowStyled
} from "./DayControl.styled";

export type Operation = "add" | "subtract";

interface DayControlProps {
  handleArrow: (field: FieldDate, operation: Operation) => void;
  field: FieldDate;
}

const DayControl: React.FC<DayControlProps> = ({
  field,
  handleArrow,
  children
}) => {
  return (
    <DayControlStyled>
      {children}
      <ArrowsStyled>
        <ArrowStyled onClick={() => handleArrow(field, "subtract")}>
          <LeftIcon />
        </ArrowStyled>{" "}
        <ArrowStyled onClick={() => handleArrow(field, "add")}>
          <RightIcon />
        </ArrowStyled>
      </ArrowsStyled>
    </DayControlStyled>
  );
};

export default DayControl;
