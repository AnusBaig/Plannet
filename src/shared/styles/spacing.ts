import { css } from "@emotion/core";
import { BREAKPOINTS } from "src/constants";
import { mediaQueries } from "./mediaQueries";

const sectionMargin = css`
 ${mediaQueries.lg} {
   max-width: ${BREAKPOINTS.LG}px; 
   margin: 0 auto;
 }
`;

const sectionPadding = css`
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;

  ${mediaQueries.md} {
    padding-left: 30px;
    padding-right: 30px;
  }

  ${mediaQueries.lg} {
    padding-right: 0;
    padding-left: 0;
  }
`;

export { sectionPadding, sectionMargin };
