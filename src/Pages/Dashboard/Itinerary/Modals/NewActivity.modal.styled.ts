import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const AddAccommodationModalFieldStyled = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;
const AddAccommodationModalFieldTitleStyled = styled.h2`
  margin-bottom: 10px;
  font-weight: 500;
  flex: 1;

  ${mediaQueries.sm} {
    margin-bottom: 0;
    flex-direction: row;
  }
`;

const AddAccommodationModalFieldInputStyled = styled.div`
  width: 100%;
  max-width: 400px;
  flex: 1;
  display: flex;
  align-items: center;
`;

export {
  AddAccommodationModalFieldStyled,
  AddAccommodationModalFieldTitleStyled,
  AddAccommodationModalFieldInputStyled
};
