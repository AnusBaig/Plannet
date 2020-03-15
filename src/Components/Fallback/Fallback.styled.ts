import styled from "@emotion/styled/macro";
import { keyframes, css } from "@emotion/core";
import { colors } from "src/shared/styles/colors";

const FallbackStyled = styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: fixed !important;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const skrotate = keyframes`
  100% { transform: rotate(360deg); }
`;
const skbounce = keyframes`
  0%, 100% { transform: scale(0.0); } 
  50% { transform: scale(1.0); }
`;

const SpinnerStyled = styled.div`
  margin: 50px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  animation: ${skrotate} 2s infinite linear;
`;

const dot = css`
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: ${colors.cerulean};
  border-radius: 100%;
  animation: ${skbounce} 2s infinite ease-in-out;
`;

const Dot1 = styled.div`
  ${dot}
`;

const Dot2 = styled.div`
  ${dot}
  top: auto;
  bottom: 0;
  animation-delay: -1s;
`;

export { FallbackStyled, SpinnerStyled, Dot1, Dot2 };
