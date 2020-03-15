import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const TripWidgetStyled = styled.div`
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  margin: 0 auto;
  max-width: 100%;

  :hover {
    border: 1px solid ${colors.steel};
  }
`;

const TitleWrapperStyled = styled.span`
  line-height: 1.25;
  letter-spacing: 0.19px;
`;

const TitleStyled = styled.strong`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.cerulean};
`;

const TaglineStyled = styled.div`
  font-size: 20px;
  font-weight: 500;

  color: ${colors.steel};
`;

const DatesStyled = styled.small`
  align-self: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.15px;
  color: ${colors.steel};
`;

export {
  TripWidgetStyled,
  TitleWrapperStyled,
  TitleStyled,
  TaglineStyled,
  DatesStyled
};
