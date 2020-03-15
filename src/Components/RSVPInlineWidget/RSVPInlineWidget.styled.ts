import styled from "@emotion/styled/macro";
import { RectanguleStyled } from "src/Components/RectanguleShadow/RectanguleShadow.styled";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const RSVPInlineWidgetStyled = styled.div`
  margin-bottom: 20px;
  width: 100%;
  cursor: pointer;

  ${RectanguleStyled} {
    flex-wrap: wrap;
    align-items: center;

    ${mediaQueries.md} {
      flex-wrap: inherit;
    }
  }
`;

const LabelStyled = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.75;
  letter-spacing: 0.13px;
  color: ${colors.cerulean};
`;

const ValueStyled = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  color: ${colors.steel};
`;

const DatesStyled = styled.span`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.19px;
  color: ${colors.steel};
  padding-right: 20px;
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  ${mediaQueries.md} {
    width: auto;
    justify-content: inherit;
  }
`;

export {
  RSVPInlineWidgetStyled,
  LabelStyled,
  ValueStyled,
  DatesStyled,
  ButtonWrapperStyled
};
