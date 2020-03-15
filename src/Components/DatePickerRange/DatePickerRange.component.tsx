import React, { useCallback } from "react";
import dayjs from "dayjs";
import { Global } from "@emotion/core";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DATE_FORMAT } from "src/constants";
import {
  DatePickerRangeStyled,
  DatesWrapperStyled,
  calendarStyles
} from "./DatePickerRange.styled";

import "react-day-picker/lib/style.css";

interface DatePickerRangeProps {
  date1?: Date;
  date2?: Date;
  handleDate1: (day: Date) => void | any;
  handleDate2: (day: Date) => void | any;
  icon?: JSX.Element;
}
const DatePickerRange: React.FC<DatePickerRangeProps> = ({ date1, date2, handleDate1, handleDate2, icon }) => {
  const from = dayjs(date1).toDate() || new Date();
  const to = dayjs(date2).toDate() || new Date();
  const toRef = React.createRef<HTMLInputElement>();
  const date1Format = date1 ? dayjs(date1).format(DATE_FORMAT) : "";
  const date2Format = date2 ? dayjs(date2).format(DATE_FORMAT) : "";

  const modifiers = { start: from, end: to };

  const handleClickDate1 = useCallback(() => {
    if (toRef.current) {
      toRef.current.focus();
    }
  }, [toRef]);

  const InputRef = (props: any) => <input {...props} ref={toRef} readOnly />;
  const Icon = icon;

  return (
    <>
      <Global styles={calendarStyles} />
      <DatePickerRangeStyled>
        <DatesWrapperStyled>
          <span className="InputFromTo">
            <DayPickerInput
              value={date1Format}
              placeholder="From"
              format={DATE_FORMAT}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                // disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 1,
                onDayClick: handleClickDate1
              }}
              onDayChange={handleDate1}
              component={(props: any) => <input {...props} readOnly />}
            />
          </span>
          {" - "}
          <span className="InputFromTo InputFromTo-to">
            <DayPickerInput
              value={date2Format}
              placeholder="To"
              format={DATE_FORMAT}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 1
              }}
              onDayChange={handleDate2}
              component={InputRef}
            />
          </span>
        </DatesWrapperStyled>
        {Icon ? Icon : null}
      </DatePickerRangeStyled>
    </>
  );
};

export default DatePickerRange;
