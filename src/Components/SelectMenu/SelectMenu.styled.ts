import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const SelectMenuStyled = styled.div`
  // position: relative;
  width: 100%;
  // z-index: 10;
  padding: 0 5px;
  select {
    outline: none;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: 0.5px solid #B7B9BD;
    font-family: "Quicksand", sans-serif;
    border-radius: 4px;
    box-sizing: border-box;
    color: #292c36;
    font-size: 14px;
    font-weight: 600;
  }
`;

const SelectMenuStyledIT = styled.div`
  position: relative;
  width: 100%;

  select {
    outline: none;
    margin-left: 10px;    
    margin-right: 20px;    
    width: 100%;
    padding: 5px;
    font-size: 18px;
    border: 0.5px solid #B7B9BD;
    font-family: "Quicksand", sans-serif;
    border-radius: 4px;
    box-sizing: border-box;
    color: #292c36;
    font-size: 14px;
    font-weight: 600;

  }
  ${mediaQueries.mobile} {
    top: 10px;
    right: 17px;
  }
`;

export { SelectMenuStyled, SelectMenuStyledIT };
