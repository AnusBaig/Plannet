import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";


const ProgressBar = styled.div`
  display: flex;
  width: 100%; 
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  ${mediaQueries.mobile} {
    flex-direction: column;
  }
`;

const OverviewProcess = styled.div`
  display: flex; 
  flex-direction: column;
  margin-left: 10px;

  ${mediaQueries.mobile} {
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const ProgressBarProcess = styled.div`
  width: 22px;
  height: 22px;
  background-color: #dadada;
  border-radius: 100%;
  border: 4px solid #dadada;
  margin-right: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  z-index: 1;
  ${mediaQueries.mobile} {
    margin-left: 10px;
    margin-right: 10px;
  }
    
  &.active {
    width: 15px;
    height: 15px;
    border: 8px solid #6bc3ff;
    background-color: #fff;
    z-index: 1;
  }
  
  &.completed {
    background-color: #6bc3ff;
    font-size: 20px;
    color: blue;
    border-color: #6bc3ff;
    z-index: 1;
  }
`;

const ProgressLine = styled.div`
  border: 1px solid #dadada; 
  position: absolute; 
  top: 15px;
  left: 45px;
  right: 45px;
  // width: calc(100% - 75px);
  
  ${mediaQueries.mobile} {
    top: 15px;
    bottom: 20px;
    left: 35px;
    right: unset;  
  }
`;

export {
  ProgressBar,
  OverviewProcess,
  ProgressBarProcess,
  ProgressLine
}