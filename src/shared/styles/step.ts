import { css } from "@emotion/core";
import { mediaQueries } from "./mediaQueries";

const sectionStep = css`
  background: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  position: relative;
  padding: 10px;

  ${mediaQueries.md} {
    padding: 20px;
  }
`;

const stepSectionButtonsStyled = css`
  display: flex;
`;

export { sectionStep, stepSectionButtonsStyled };
