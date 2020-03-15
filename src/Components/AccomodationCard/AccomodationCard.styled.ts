import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const EditStyled = styled.div`
  color: ${colors.cerulean};
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 14px;

  .editing {
    font-weight: bold;
  }
`;

interface DateProps {
  selected: boolean;
};

const DateStyled = styled.div<DateProps>`
  font-size: 21px;
  color: ${p => p.selected ? colors.cerulean : colors.darkGrey2};
  margin-left: 48px;
  padding-top: 16px;
  font-weight: ${p => p.selected ? "bold" : null};
`;

interface BoxProps {
  selected: boolean;
};

const BoxStyled = styled.div<BoxProps>`
  width: 24px;
  height: 19px;
  position: absolute;
  top: 64px;
  left: 16px;
  border: ${p => p.selected ? "solid 1px " + colors.skyBlue : "solid 1px " + colors.darkGrey4};
  border-right: 0;
`;

interface LocationCityProps {
  selected: boolean;
};

const LocationCityStyled = styled.span<LocationCityProps>`
  color: ${p => p.selected ? colors.cerulean : null};
`;


const LocationStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;

  span {
    font-size: 14px;
    margin-top: 3px;
  }
`;

const CityStyled = styled.div`
  margin-left: 48px;
  margin-top: 16px;
`;

const OvalStyled = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${colors.darkGrey1};
  margin-right: 2px;
  border-radius: 50%;
`;

const TagStyled = styled.div`
  width: fit-content;
  height: 20px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  background-color: RGBA(167, 229, 255, 0.4);
  justify-content: center;
  align-items: center;
  margin-left: 48px;
  margin-top: 16px;
  padding: 0 8px;

  svg {
    margin-right: 2px;
  }
`;

interface ContainerProps {
  selected: boolean;
  completed: boolean;
};

const ContainerStyled = styled.div<ContainerProps>`
  width: 90%;
  height: ${p => p.completed ? "143px" : "143px"};
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  border: ${p => p.selected ? "solid 0.5px " + colors.cerulean : "solid 0.5px " + colors.darkGrey4};
  margin: 16px;
  position: relative;
  background-color:${p => p.selected ? colors.paleGrey : null};


  & > svg {
    position: absolute;
    top: 16px;
    left: 16px;
  }
  // border: 2px solid black;
  

  // ${mediaQueries.md} {
  //   border: 2px solid black;
  // }
`;

export {
  EditStyled,
  DateStyled,
  LocationStyled,
  LocationCityStyled,
  CityStyled,
  OvalStyled,
  BoxStyled,
  TagStyled,
  ContainerStyled,
};