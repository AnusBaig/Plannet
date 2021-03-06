import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";

const TableWrapperStyled = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const EditFlightDetailsBodyStyled = styled.div`
  // text-align: center;
`;

const EditFlightDetailsDescriptionStyled = styled.p`
  // font-size: 18px;
  margin-bottom: 16px;
 max-width: 329px;
  min-height: 24px;
  font-family: Quicksand;
  font-size: 21px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.5px;
  color: #292c36;
`;
const EditFlightDetailsDescriptionSmallStyled = styled(EditFlightDetailsDescriptionStyled)`
  font-size: 16px;
  font-width: bold;
`;


const EditFlightDetailsFieldStyled = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

const EditFlightDetailsFieldTitleStyled = styled.h2`
  margin-bottom: 10px;
  font-weight: 500;
  flex: 1;

  ${mediaQueries.sm} {
    margin-bottom: 0;
    flex-direction: row;
  }
`;

const EditFlightDetailsFieldInputStyled = styled.div`
  width: 100%;
  flex: 1;
  & >.DayPickerInput {
    width: 100%;
      & > .DayPickerInput-OverlayWrapper{
        &>.DayPickerInput-Overlay{
          z-index:9
        }
        z-index:9
      }

    & > input {
      padding: 20px;
      width: 100%;
      max-width: 360px;
      background-color: ${colors.paleGrey};
      color: ${colors.charcoalGrey};
      font-size: 20px;
      text-align: left;

      ${mediaQueries.sm} {
        max-width: 330px;
      }
    }
  }
`;

const EditFlightsDatePickerStyled = styled.div`
  
`;

const ModalBackdropStyled = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black40};
  opacity: 0;
  transition: all linear 0.25s;
  &.fade-in {
    opacity: 1;
  }
  &.fade-out {
    opacity: 0;
  }
`;

const ModalContainerStyled = styled.div`
  // overflow-y: auto;
  background-color: ${colors.white};
  max-height: 90%;
 max-width: 384px;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #00000028;
  background-color: #ffffff;
  max-width: 800px;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${colors.cerulean};
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  transition: all linear 0.15s;
  &.fade-in {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
`;

const TextDiv = styled.div`
  display: inline-block;
 max-width: 120px;
  min-height: 24px;
  font-family: Quicksand;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  color: #292c36;
`;
const SmallTextDiv = styled.div`
  display: inline-block;
 max-width: 120px;
  min-height: 16px;
  font-family: Quicksand;
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: 0.08px;
  color: #585858;
`;
const SubmitButton = styled.button`
  min-height: 48px;
  border-radius: 4px;
  background-color: #1285d8;
  font-family: Quicksand;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.25px;
  text-align: center;
  color: white;
  margin: 0px auto;
  border: none;
  cursor: pointer;
`;
export {
  TableWrapperStyled,
  EditFlightDetailsBodyStyled,
  EditFlightDetailsDescriptionStyled,
  EditFlightDetailsDescriptionSmallStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldTitleStyled,
  EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled,
  ModalBackdropStyled,
  ModalContainerStyled,
  TextDiv,
  SmallTextDiv,
  SubmitButton
};
