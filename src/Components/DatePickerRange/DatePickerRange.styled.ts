import css from "@emotion/css";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const calendarStyles = css`
  .InputFromTo
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
    
  }
  .DayPickerInput-Overlay {
    position: absolute;
    left: 0;
    z-index: 5 !important;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
  .InputFromTo .DayPicker-Day {
    z-index : 800 !important
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .DayPickerInput {
    & > input {
      background: transparent;
      border: none;
      width: 100px;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.25;
      letter-spacing: 0.19px;
      color: ${colors.charcoalGrey};
      outline: none;
      text-align: right;
    }
  }

  .InputFromTo.InputFromTo-to .DayPickerInput input {
    z-index : 800 !important
    text-align: left;
  }
`;

const DatePickerRangeStyled = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dfdfe5;
  // border-radius: 4px;
  color: ${colors.charcoalGrey};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.19px;
  line-height: 1.25;
  margin-right: 30px;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const DatesWrapperStyled = styled.div`
  flex: 1;
`;

export { DatePickerRangeStyled, DatesWrapperStyled, calendarStyles };
