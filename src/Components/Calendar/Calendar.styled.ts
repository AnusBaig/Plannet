import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const calendarStyles = css`
  .DayPicker-wrapper {
    outline: none;
  }

  .Selectable
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }

  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
    outline: none;
  }

  .Selectable .DayPicker-Day--start,
  .Selectable .DayPicker-Day--end {
    border-radius: 50% !important;
  }
`;

const DatePickerStyled = styled.div`
  background-color: ${colors.white};
  border-radius: 10.2px;
  border: solid 1px ${colors.darkGrey3};
  box-shadow: 0 6px 10px 0 ${colors.black18};
  display: inline-block;
  outline: none;
  height: 100%;
  width: 100%;
  
  .DayPicker {
    height: 100%;
    width: 100%;

    .DayPicker-Month {
      height: 228px;
      width: 280px;
      margin:32px;

      .DayPicker-Caption {
        text-align: center;
        margin-bottom: 24px;
      }

      .DayPicker-Day {
        padding: 0;
        height: 32px;
        width: 32px;
      }
    }
  }
`;


const DatePickerStyledWithoutBorder = styled.div`
  // background-color: ${colors.white};
  // border-radius: 10.2px;
  // border: solid 1px ${colors.darkGrey3};
  // box-shadow: 0 6px 10px 0 ${colors.black18};
  display: inline-block;
  outline: none;
  height: 100%;
  width: 100%;
  
  .DayPicker {
    height: 100%;
    width: 100%;

    .DayPicker-Month {
      height: 228px;
      width: 280px;
      margin:32px;

      .DayPicker-Caption {
        text-align: center;
        margin-bottom: 24px;
      }

      .DayPicker-Day {
        padding: 0;
        height: 32px;
        width: 32px;
      }
    }
  }
`;

const DatePickerWrapperStyled = styled.div`
  text-align: center;
  margin-bottom: 5px;
  height: 339px;
  width: 100%;
    margin-left: auto;
  margin-right: auto;
  ${mediaQueries.sm}{
  width: 88%;
  };
  ${calendarStyles}
  & > .DayPicker-Body{
    max-width: 100%;
  }
`;

export {
  DatePickerStyled,
  DatePickerStyledWithoutBorder,
  DatePickerWrapperStyled,
}
