import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";

const TableStyled = styled.table`
  border-spacing: 0;
  color: ${colors.steel};
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.38;
  letter-spacing: 0.15px;
  position: relative;
  width: 100%;

  ${mediaQueries.md} {
    font-size: 16px;
  }

  ${mediaQueries.mobile} {
    display: block;
    margin-top: 7%;
    * {
      display: bloack;
    }
  }

  caption {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: solid 1px ${colors.paleGrey2};
    border-bottom: 0;
    box-sizing: border-box;
    color: ${colors.charcoalGrey};
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 1.38;
    padding: 20px;
    text-align: left;
    width: calc(100% - 1px);

    & + thead th {
      &:first-of-type,
      &:last-of-type {
        border-radius: 0;
      }
    }
  }

  thead {
    background: ${colors.duckEggBlue};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.15px;
    color: ${colors.charcoalGrey};

    th {
      padding: 20px;

      &:first-of-type {
        border-top-left-radius: 4px;
      }
      &:last-of-type {
        border-top-right-radius: 4px;
      }

      svg {
        vertical-align: middle;
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 15px;
        padding-right: 0;
        border-bottom: solid 1px ${colors.paleGrey2};

        &:first-of-type {
          border-left: solid 1px ${colors.paleGrey2};
        }
        &:last-of-type {
          border-right: solid 1px ${colors.paleGrey2};
        }

        strong {
          color: ${colors.charcoalGrey};
        }
      }
      &:last-of-type {
        td {
        }
      }
    }
  }
`;

export { TableStyled };
