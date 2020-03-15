import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const LegTripStyled = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  border: solid 1px ${colors.paleGrey2};
  box-shadow: 0 4px 7px 0 ${colors.black18};
  box-sizing: border-box;
  min-height: 70px;
  max-width: 420px;
  padding: 12px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  & > div {
    margin: 10px;

    &:first-of-type {
      margin: 0;
      margin-bottom: 10px;

      ${mediaQueries.md} {
        margin-bottom: 0;
      }
    }

    ${mediaQueries.md} {
      max-width: 50%;
    }
  }

  ${mediaQueries.md} {
    max-width: 960px;
    flex-direction: row;
  }
`;

export { LegTripStyled };
