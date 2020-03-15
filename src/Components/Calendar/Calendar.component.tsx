import React, { useCallback, CSSProperties, ComponentState, Dispatch, SetStateAction } from "react";
import {
  DatePickerStyled,
  DatePickerWrapperStyled,
} from "./Calendar.styled";

import DayControl, { Operation } from "../DayControl/DayControl.component";
import dayjs from "dayjs";
import DayPicker, { LocaleUtils } from "react-day-picker";
import { DayControlsWrapperStyled } from "src/Pages/CreateTrip/Step13/Step13.styled";

import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/calendar-arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "src/shared/assets/calendar-arrow-right.svg";
import { FieldDate } from "@dimelo/createtrip";

interface CalendarProps {
  range: ComponentState,
  setRange: (value: Object) => void,
  setDisabled?: Dispatch<SetStateAction<boolean>>,
  disableDates?: any,
  disableCalenderDates?: any,
}


const Calendar: React.FC<CalendarProps> = ({
  range,
  setRange,
  setDisabled,
  disableDates,
  disableCalenderDates,
}) => {

  const { from, to } = range;

  const modifiers = {
    start: from,
    end: to,
    disabled: {
      before: disableDates ? disableDates : new Date(),
      // after: disableCalenderDates ? new Date() : false
    }
  };
  const date1 = from ? dayjs(from).format("MM/DD/YY") : "from";
  const date2 = to ? dayjs(to).format("MM/DD/YY") : "to";
  const handleArrow = useCallback(
    (field: FieldDate, operation: Operation) => {
      const date = dayjs(range[field]);
      if (field === "from" && new Date(date1).getTime() > modifiers.disabled.before.getTime()) {
        setRange({ ...range, [field]: date[operation](1, "day").toDate() });
      }
      else if (field === "from" && operation === "add") {
        setRange({ ...range, [field]: date[operation](1, "day").toDate() });
      }
      if (field === "to" && new Date(date2).getTime() > new Date(date1).getTime()) {
        setRange({ ...range, [field]: date[operation](1, "day").toDate() });
      } else if (field === "to" && operation === "add") {
        setRange({ ...range, [field]: date[operation](1, "day").toDate() });
      }
    },
    [range]
  );

  const handleDayClick = useCallback(
    (day: Date) => {
      const past =
        day <=
        dayjs(modifiers.disabled.before)
          .subtract(1, "d")
          .toDate();

      if (past) return null;

      // @ts-ignore
      setRange(DayPicker.DateUtils.addDayToRange(day, range));
    },
    [range]
  );

  interface NavbarProps {
    onPreviousClick: () => void,
    onNextClick: () => void,
    className: string,
    localeUtils: LocaleUtils,
  }

  const Navbar: React.FC<NavbarProps> = ({
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
  }) => {
    const months = localeUtils.getMonths();
    const styleLeft: CSSProperties = {
      position: 'absolute',
      top: '32px',
      left: '32px',
    };
    const styleRight: CSSProperties = {
      position: 'absolute',
      top: '32px',
      right: '32px',
    };
    return (
      <div className={className}>
        <ArrowLeftIcon style={styleLeft} onClick={() => onPreviousClick()} />
        <ArrowRightIcon style={styleRight} onClick={() => onNextClick()} />
      </div>
    );
  }

  interface WeekdayProps {
    weekday: number,
    className: string,
    localeUtils: LocaleUtils,
    locale: string,
  }

  const Weekday: React.FC<WeekdayProps> = ({
    weekday,
    className,
    localeUtils,
    locale,
  }) => {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
    return (
      <div className={className} title={weekdayName}>
        {weekdayName.slice(0, 1)}
      </div>
    );
  }

  if (date1 != "from" && date2 != "to") {
    setDisabled && setDisabled(false);
  } else {
    setDisabled && setDisabled(true);
  }

  return (<>
    <DayControlsWrapperStyled>
      <DayControl handleArrow={handleArrow} field="from">
        {date1}
      </DayControl>
      <DayControl handleArrow={handleArrow} field="to">
        {date2}
      </DayControl>
    </DayControlsWrapperStyled>
    <DatePickerWrapperStyled>
      <DatePickerStyled>
        <DayPicker
          className="Selectable"
          numberOfMonths={1}
          //@ts-ignore
          month={modifiers.disabled.before}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={handleDayClick}
          showOutsideDays
          navbarElement={Navbar}
          weekdayElement={Weekday}
        />
      </DatePickerStyled>
    </DatePickerWrapperStyled>
  </>);
};

export default Calendar;