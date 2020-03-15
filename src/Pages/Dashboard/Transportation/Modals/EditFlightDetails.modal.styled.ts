import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";

const TableWrapperStyled = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const EditFlightDetailsBodyStyled = styled.div`
  text-align: center;
`;

const EditFlightDetailsDescriptionStyled = styled.p`
  font-size: 18px;
  margin-bottom: 50px;
`;

const EditFlightDetailsFieldStyled = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  max-width: 400px;
  flex: 1;
`;

const EditFlightsDatePickerStyled = styled.div`
  .DayPickerInput {
    width: 100%;

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

export {
  TableWrapperStyled,
  EditFlightDetailsBodyStyled,
  EditFlightDetailsDescriptionStyled,
  EditFlightDetailsFieldStyled,
  EditFlightDetailsFieldTitleStyled,
  EditFlightDetailsFieldInputStyled,
  EditFlightsDatePickerStyled
};
