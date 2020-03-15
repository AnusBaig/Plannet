import { css } from "@emotion/core";
import { colors } from "src/shared/styles/colors";

const globalStyles = css`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Quicksand", sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
  #root {
    display: flex;
    flex-direction: column;

    & > div {
      min-height: calc(100% - 60px);
      position: relative;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  a {
    color: ${colors.cerulean};
    font-weight: bold;
    text-decoration: none;
  }
  *{
    scroll-behavior: smooth;
  }
`;

export { globalStyles };
