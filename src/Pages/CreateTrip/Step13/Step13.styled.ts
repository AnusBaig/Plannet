import { mediaQueries } from "src/shared/styles/mediaQueries";
import { css } from "@emotion/core";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { sectionStep } from "src/shared/styles/step";
import { StepBodyWrapperStyled, StepBodyStyled } from 'src/Pages/CreateTrip/createtrip.styled';

const Step13WrapperStyled = styled.div`
  ${sectionStep}
  // margin-top: 50px;

  margin-top: 50px;
  height: 806px !important;
  ${mediaQueries.mobile}{
    padding : 0px
  }
  ${StepBodyStyled}{
    ${mediaQueries.mobile}{
      padding : 0px;
      // padding-left : 5px;
    } 
  }
  ${StepBodyWrapperStyled} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

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

const CalendarWrapperStyled = styled.div`
  border: 0.8px solid ${colors.darkGrey3};
  border-radius: 4px;
  // width: 440px;
  width: 100%;
  ${mediaQueries.sm}{
    width: 440px;
  }
    height: 467px;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  align-items:center;
  background-color: ${colors.paleGrey3};
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

const DatePickerWrapperStyled = styled.div`
  text-align: center;
  margin-bottom: 5px;
  height: 339px;
  width: 100%;
`;

const DayControlsWrapperStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
  padding-top: 30px;
  margin: 0 auto;
  flex-direction: row;
  width: 100%;
  align-items: center;

  span{
    background-color: ${colors.white};
    border-radius: 4px;
    border: 0.8px solid ${colors.darkGrey};
    width: 146px;
    ${mediaQueries.mobile}{
      width: 139px;
      max-width: 40%;
    }
  }

  ${mediaQueries.mobile} {
    flex-direction: row;
  }
`;

const Step13ButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  button {
    height: 48px;
    width: 184px;
  }
`;

export {
  Step13WrapperStyled,
  calendarStyles,
  CalendarWrapperStyled,
  DatePickerStyled,
  DatePickerWrapperStyled,
  DayControlsWrapperStyled,
  Step13ButtonsStyled
};
