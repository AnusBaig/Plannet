import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const TitleStyled = styled.h2`
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -0.6px;
  color: ${colors.cerulean};
`;

const MessageStyled = styled.p`
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: ${colors.darkGrey1};
`;

const ContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 198px;
  }

  Button {
    margin-top: 52px;
  }
`;

export {
  ContainerStyled,
  TitleStyled,
  MessageStyled,
};
