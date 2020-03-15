import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

interface CityNameProps {
  color?: string;
}

const CityNameStyled = styled.div<CityNameProps>`
  color: ${p => p.color ==="blue" ? colors.cerulean : null};
`;

interface RectangleProps {
  height?: string;
}

const RectangleStyled = styled.div<RectangleProps>`
  width: 320px;
  height: ${p => p.height ? p.height : "48px"};
  border-radius: 4px;
  background-color: ${colors.iceBlue};
  font-size: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;

const InputStyled = styled.div`
  width: 320px;
  margin-top: 56px;
  align-items: center;
  display: flex;
  flex-direction: column;

  svg {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  ${RectangleStyled} {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

`;


const VerticalLineStyled = styled.div`
  border-left: 6px dotted green;
  height: 500px;
`;

export {
  CityNameStyled,
  InputStyled,
  RectangleStyled,
  VerticalLineStyled,
};
