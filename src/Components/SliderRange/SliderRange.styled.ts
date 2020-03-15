import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

interface SliderProps {
  isDragged?: boolean;
}

const SliderRangeStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin: 0 auto;
`;

const ThumbStyled = styled.div<SliderProps>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #ffffff;
    border: 1px solid ${colors.skyBlue};
`;

const TrackWrapperStyled = styled.div`
  height: 36px;
  display: flex;
  width: 100%;
  &>.helpline{
    width: 90%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 5%;
    right: 5%;
    & > span {
      width: 2px;
    height: 32px;
    border-radius: 1px;
    display: inline-block;
  
    background-color: #e5e7e9;
    }
  }
  &>.helpline2{
    width: 88%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 100%;
    right: 5%;
    left: 3%;
    & > .text {
      width: 1px;
      height: 13px;
   font-family: Quicksand;
   font-size: 10px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: normal;
   letter-spacing: normal;
   text-align: center;
   color: #585858;
   display: inline-block;
   }
  }
`;

const TrackStyled = styled.div`
  height: 5px;
  width: 100%;
  border-radius: 4px;
  align-self: center;
  position: relative;
`;

const ThumbWrapperStyled = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: #1ea4ff;
    display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
`;

const ValuesStyled = styled.div`
  margin-top: 50px;
`;

const ValueStyled = styled.span`
  border-radius: 4px;
  font-size: 24px;
    font-weight: 500;
  letter-spacing: 0.15px;
  color: ${colors.cerulean};
  padding: 5px 15px;
`;

export {
  SliderRangeStyled,
  ThumbStyled,
  TrackWrapperStyled,
  TrackStyled,
  ThumbWrapperStyled,
  ValuesStyled,
  ValueStyled
};
