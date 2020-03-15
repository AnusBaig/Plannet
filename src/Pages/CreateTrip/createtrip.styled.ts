import { SelectionBoxStyled } from 'src/Components/SelectionCard/SelectionCard.styled';
import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";

const StepWrapperStyled = styled.div`
  ${sectionMargin};
  max-width: 100% !important;
  display: flex;
  flex-direction: column;
  min-height: 98%;  
  ${mediaQueries.mobile}{
    border-top: 1px solid #dadada;
    margin-top: 72px;
  }
`;

interface HelpSpeechProps {
  width?: string;
  height?: string;
  marginBottom?: string;
}

const HelpSpeechContainerStyled = styled.div<HelpSpeechProps>`
  width: ${p => p.width ? null : "332px"};
  height: ${p => p.height ? p.height : null};  
  margin-bottom: ${p => p.marginBottom ? p.marginBottom : "56px"};  
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  & > img {
    width: 32px;
  }
  & > p {
    max-width: 100%;
    font-size: 16px;
    margin-left: 16px;
    display: inline;
    color: 1px solid ${colors.darkGrey1};
    background: ${colors.iceBlue};
    border-radius: 70px 70px 70px 20px;
    padding: 19px;
    margin-top: 10%;
    ${mediaQueries.md} {
      max-width: 100%;
    }
  }
  ${mediaQueries.md} {
    margin-bottom: 5%;
  }
`;

const StepContainerStyled = styled.div`
  ${sectionMargin};  
  height: 100%;
  width: 96%;
  ${mediaQueries.sm}{
    margin-bottom: 20px;
  }
  margin-left : auto;
  margin-right:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  & > button {
    margin-bottom: 56px;
    text-transform: uppercase;
  }
  ${mediaQueries.mobile} {
    margin-bottom: 20%;
  }
 
`;

const ProgressBarContainerStyled = styled.div`
  // width: 75%;
  width: 61.5%;
  // display: flex;
  // justify-content: center;
  padding-top: 10px;
  // ${mediaQueries.mobile} {
  //   position: relative;
  // }
`;

const ProgressBarWrapperStyled = styled.div`
width: 50%;
overflow : hidden;
  & ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 98px;
    ${mediaQueries.mobile} {
      margin-top: 64px;
    }
    & li {
      display: inline-block;
      border: 1px solid ${colors.darkGrey4};
      width: 12px;
      height: 12px;
      border-radius: 50px;
      background: ${colors.darkGrey4};
      z-index: 1;
      &.completed {
        border: 5px solid ${colors.miamiGreen};
        background: ${colors.miamiGreen};
        width: 5px;
        height: 5px;
      }
      &.active {
        border: 5px solid ${colors.skyBlue};
        width: 6px;
        height: 6px;
        background: ${colors.white};
      }
      :last-of-type:after {
        display: none;
      }
      :after {
        content: '';
        width: 130px;
        border-bottom: 2px solid ${colors.darkGrey4};
        margin-left: 10px;
        position: absolute;
        top: 45%;
        z-index: 0;
      }
    }
  }
  // ${mediaQueries.xs} {
  //   width: 236px;
  // }
  // ${mediaQueries.md} {
  //   width: 236px;
  // }
`;

const ProgressBarProcess = styled.div`
  // position: 'relative';
  width: 12px;
  height: 12px;
  background-color: #dadada;
  border-radius: 100%;
  border: 4px solid #dadada;
  margin-right: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  z-index: 1;
  ${mediaQueries.mobile} {
    margin-left: auto;
    margin-right: auto;
  }
    
  &.active {
    width: 12px;
    height: 12px;
    border: 5px solid ${colors.skyBlue};
    background: ${colors.white};
    z-index: 1;
  }
  
  &.completed {
    background-color: ${colors.skyBlue};
    font-size: 20px;
    // color: blue;
    border-color: ${colors.skyBlue};
    z-index: 1;
  }
`;

const ProgressLine = styled.div`
  border: 1px solid #dadada; 
  z-index: -1;
  position: absolute;
  top: 120px;
  left: 20%;
  right: 20%;  
  // left: 15%;
  // right: 15%;  
  ${mediaQueries.sm} {
    position: absolute; 
    // left: 120px;
    // right: 16%;
    // left: 14%;
    right: 22.5%;
    left: 21%;
  }
`;

const StepActiveAreaStyled = styled.div`
  height: 100%;
  min-height: -webkit-fill-available;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StepHeaderStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  & > span {
    position: relative;
    top: 5px;
    left: 0;
  }
`;

const StepBodyStyled = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const StepBodyWrapperStyled = styled.div`
  margin: auto;
  width: 100%;
`;

const StepFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NameStyled = styled.span`
  border-radius: 4px;
  border: solid 1px ${colors.cerulean};
  color: ${colors.cerulean};
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 1.56;
  padding: 4px 16px;
  text-align: center;
  text-transform: uppercase;
`;

const QuestionStyled = styled.h2`
width: 80%;
font-size: 26px;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: -0.45px;
  text-align: center;
  color: ${colors.darkGrey1};
  margin-top: 80px;
`;


const BackButtonStyled = styled.div`
  position: absolute;
    left: 5%;
    top: 12%;
    cursor: pointer;
    & > svg {
      width: 40px;
    }
    ${mediaQueries.mobile}{
    top: 1%;
    }
    ${mediaQueries.md} {
      left: 2%;
    }
    `;

interface SelectionBoxProps {
  height?: string;
  width?: string;
  justify?: string;
  wrap?: string;
}

const SelectionBoxContainerStyled = styled.div<SelectionBoxProps>`
 height: ${p => p.height ? p.height : null};
  max-width: ${p => p.width ? p.width : "450px"};
  width: 100%;
  flex-wrap: ${p => p.wrap ? p.wrap : null};
  justify-content: ${p => p.justify ? p.justify : "space-around"};
  margin: 56px 0 56px 0;
  display : block;
  ${mediaQueries.sm}{
    display: flex;
  }
  &#joinTripBudgetDiv {
    ${SelectionBoxStyled} {
        ${mediaQueries.mobile} {
          height: 51px;
          width: 50%;
      display: flex;
       flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
          & > div {
            margin: 0 20px;
          }
        }
      ${mediaQueries.smallMobile} {
        width: 80%;
        
      }
    }
  }
`;

const TickStyled = styled.span`
  // display: flex;
  // justify-content: center;
  // position: relative;
  // bottom: 3px;
  // color: blue;
  // -ms-transform: scaleX(-1) rotate(-35deg);
  // -webkit-transform: scaleX(-1) rotate(-35deg);
  position: absolute;
  transform: scaleX(-1) rotate(-35deg);
  color: blue;
  margin-left: 2px;
  margin-top: -4px;
  font-size: 15px;
`

export {
  TickStyled,
  StepWrapperStyled,
  StepActiveAreaStyled,
  ProgressBarContainerStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled,
  StepContainerStyled,
  ProgressBarProcess,
  QuestionStyled,
  HelpSpeechContainerStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled,
  ProgressBarWrapperStyled,
  ProgressLine
};