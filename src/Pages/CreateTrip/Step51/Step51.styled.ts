import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled, { StyledComponent } from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { RectanguleStyled } from 'src/Components/RectanguleShadow/RectanguleShadow.styled';
import { HelpSpeechContainerStyled } from '../createtrip.styled';
import { InputStyled, LabelStyled } from 'src/Components/Input/Input.styled';
import { ButtonStyled } from 'src/Components/Button/Button.styled';

const InputWrapperStyled = styled.div`
  ${mediaQueries.mobile} {
    width: 100%
  }

  margin-top: 56px;
  display: block;
  ${mediaQueries.sm}{
    display: flex;
    width: 63%;
  }
  ${mediaQueries.mobile} {
    // width: 64%;
    // border: 2px solid black;
    width: 100%;

  }
  align-items: center;
  // height: 48px;

  & > div {
    width: 248px;
    margin-right: 16px;
    margin-top: 10px;
    ${mediaQueries.mobile} {
    width: 100%;
      
    }
    ${mediaQueries.sm}{
      margin-top: 0px;
    }
    height: 100%;

    ${InputStyled} {
      font-size: 14px;

      :focus + label {
        font-size: 10px;
      }
    }

    ${LabelStyled} {
      font-size: 14px;
    }
  }
  .Colortrue{
    path {
      fill: ${colors.cerulean};
    }
  }
  .exButon{
    :hover {
      cursor: pointer;

      path {
        fill: red;
      }
    }
  }
  svg {
    width: 75px;

    :hover {
      cursor: pointer;

      path {
        fill: ${colors.cerulean};
      }
    }
  
  }
`;

const CityCardStyled = styled.div`
margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 55%;
  ${mediaQueries.mobile} {
    width: 100%;
  }
  svg {
    width: 33px;
    height: 12px;
    cursor: grab;
  }

  ${RectanguleStyled} {
    ${mediaQueries.mobile}{
      height: 70px;
    }
    height: 40px;
    margin-top: 8px;

    svg {
      cursor: pointer;
    }
  }
`;
const UserDetailWrapper = styled.div`
    display: flex;
    width: 81%;
    flex-direction: row;
    ${mediaQueries.mobile}{
      flex-direction: column;
    }
`

const NameStyled = styled.div`
  width: 214px;
  margin-left: 8px;
  display: flex;
  font-weight: 500;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  // display : inline-block
  ${mediaQueries.mobile}{
    color : #292c36
  }
`;

const EmailStyled = styled.div`
  width: 283px;
  margin-left: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${ButtonStyled} {
    margin-top: 56px;
  }
  ${mediaQueries.mobile} {
    width: 80%;
  }

  ${HelpSpeechContainerStyled} {
    width: 480px;
    margin-bottom: 5%;
    ${mediaQueries.mobile} {
      width: 100%;
    }

  }
  ${mediaQueries.md} {
    margin-bottom: 10%;
  }
`;

export {
  ContainerStyled,
  InputWrapperStyled,
  CityCardStyled,
  NameStyled,
  EmailStyled,
  UserDetailWrapper
};
