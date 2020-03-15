import React, { useState } from "react";
import Button from "src/Components/Button";
import RectanguleShadow from "src/Components/RectanguleShadow";
import { ReactComponent as EditIcon } from "src/shared/assets/edit.svg";
import {
  DateInlineWidgetStyled,
  LabelStyled,
  ValueStyled,
  ButtonWrapperStyled
} from "./DateInlineWidget.styled";
import { Maybe } from "@dimelo/global";

interface DateInlineWidgetProps {
  type: "start" | "end";
  date: Maybe<string | Date>;
}

const DateInlineWidget: React.FC<DateInlineWidgetProps> = ({
  type,
  date: initialDate
}) => {
  const [date] = useState(initialDate);

  return (
    <DateInlineWidgetStyled>
      <RectanguleShadow width="100%">
        <LabelStyled>
          {type === "start" ? "Start Date" : "End Date"}
        </LabelStyled>
        <ValueStyled>{date}</ValueStyled>
        <ButtonWrapperStyled>
          <Button>
            <EditIcon width="17px" />
            Edit
          </Button>
        </ButtonWrapperStyled>
      </RectanguleShadow>
    </DateInlineWidgetStyled>
  );
};

export default DateInlineWidget;
