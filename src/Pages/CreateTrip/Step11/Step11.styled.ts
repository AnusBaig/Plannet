import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled, { StyledComponent } from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { RectanguleStyled } from 'src/Components/RectanguleShadow/RectanguleShadow.styled';
import { HelpSpeechContainerStyled } from '../createtrip.styled';
import { InputStyled } from 'src/Components/Input/Input.styled';
import { ButtonStyled } from 'src/Components/Button/Button.styled';

const InputWrapperStyled = styled.div`
  width: 364px;
  margin-top: 60px;
  display: flex;
  flex-wrap: row wrap;
  align-items: center;
  ${mediaQueries.mobile}{
    width: 88%;
  };
  .Colortrue{
    path {
      fill: ${colors.cerulean};
    }
  }
  .Colortrue2{
    path {
      fill: red
    }
    :hover {
      cursor: pointer;

      path {
        fill: red;
      }
    }
  }
  .exButon{
    margin-left: 16px !important;

    :hover {
      cursor: pointer;

      path {
        fill: red;
      }
    }
  }
  svg {
    margin-left: 16px;

    :hover {
      cursor: pointer;

      path {
        fill: ${colors.cerulean};
      }
    }
  }
`;

const CityCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
  width: 80%;
  // max-height: 149px;
  // overflow: auto;
  ${mediaQueries.sm}{
    width: 350px;
  }
  svg {
    width: 12px;
    height: 12px;
    cursor: grab;
  }

  ${RectanguleStyled} {
    height: 40px;
    margin-bottom: 8px;

    svg {
      cursor: pointer;
    }
  }
`;

const CityNameStyled = styled.span`
  width: 300px;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const IndexStyled = styled.span`
  margin-left: 10px;
  color: ${colors.cerulean};
`;

const ContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaQueries.mobile}{
    width: 100%;
  }
  ${ButtonStyled} {
    margin-top: 56px;
  }

  // ${HelpSpeechContainerStyled} {
  //   width: 90%;
  //   margin-bottom: 0;
  // }
`;

export {
  ContainerStyled,
  InputWrapperStyled,
  CityCardStyled,
  CityNameStyled,
  IndexStyled,
};
