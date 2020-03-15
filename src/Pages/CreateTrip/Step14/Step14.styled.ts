import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { RectanguleStyled } from 'src/Components/RectanguleShadow/RectanguleShadow.styled';
import { StepContainerStyled } from '../createtrip.styled';
import { ButtonStyled } from 'src/Components/Button/Button.styled';
import { css } from "@emotion/core";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import RectanguleShadow from "src/Components/RectanguleShadow";

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
  width: 100%;
  ${ButtonStyled} {
    margin-top: 52px;
  }
`;

const EditStyled = styled.div`


  ${RectanguleStyled} {
    // width: 376px;
    width: 100%;
    border: none !important;
    padding: 0px;
    display: flex;
    flex-direction: column;
    background: #f1f9fe;
    // background: ${colors.paleGrey};
    align-items: center;

    div {
      // margin-top: 0;
      // width: 376px;
    }

    hr {
      width: 80%;
      border: 1px solid #0088e3;
    }

    & > button {
      width: 160px;
      height: 40px;
      font-size: 16px;
      border-radius: 4px;
      border: solid 1px ${colors.cerulean};
      background-color: #ffffff;
      color: ${colors.cerulean};
    }
  }
`;

const ListStyled = styled.div`
  position: relative;
  width: 100%;
  // display: block;
  display: flex;
  justify-content: space-around;
  
  svg {
    position: absolute;
    right: 0;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
  ${mediaQueries.sm}{
    display: flex;
    justify-content: space-between;
    padding : 6px
  }
`;

const IndexStyled = styled.span`
  height: 24px;
  width: 24px;
  color: ${colors.skyBlue};
`;

const CityNameStyled = styled.div`
  font-weight: 600;
  // margin-left: 16px;
`;

const EditButtonStyled = styled.span`
  position: relative;
  right: 0;
  cursor: pointer;
  color: ${colors.skyBlue};
  // left: 87%;
  :hover {
    color: ${colors.cerulean};
  }
  ${mediaQueries.sm}{
    left: -13px;
    }
`;

const DateStyled = styled.span`
  position: relative;
  color: ${colors.darkGrey2};
  // margin: 20px;
  display: block;
  margin-top: 7px;
    ${mediaQueries.sm}{
    // right: 67px;
    margin: 0px;
    margin-left: 14px;
    display: inline-block;

  }
  `;

interface ListBoxProps {
  isEditing?: boolean;
}

const ListBoxStyled = styled.div<ListBoxProps>`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-around;
  margin-top: 56px;
  padding: 0;
  width: 100%;
      ${mediaQueries.sm}{
    width: 488px;
  }
  & > ${RectanguleStyled} {
    // padding: ${({ isEditing }) => isEditing ? '0' : '16px'};
    padding-bottom:16px;
    // width: 81%;
        // height: ${({ isEditing }) => isEditing ? '720px' : '176px'};
    display: flex;
    flex-direction: column;
    align-items: center;

    hr {
      width: 98%;
            }

    & > ${ListStyled} {
      & > ${IndexStyled} {
        margin-left: ${({ isEditing }) => isEditing ? '16px' : '0'};
        margin-top: ${({ isEditing }) => isEditing ? '16px' : '0'};
      }

      & > div {
        margin-top: ${({ isEditing }) => isEditing ? '16px' : '0'};
      }

      & > ${EditButtonStyled} {
        top: ${({ isEditing }) => isEditing ? '16px' : '0'};
        right: ${({ isEditing }) => isEditing ? '16px' : '0'};
      }

      & > ${DateStyled} {
        top: ${({ isEditing }) => isEditing ? '16px' : '0'};
      }
    }
  }
`;

export {
  ContainerStyled,
  EditStyled,
  ListStyled,
  ListBoxStyled,
  IndexStyled,
  CityNameStyled,
  EditButtonStyled,
  DateStyled,
};
