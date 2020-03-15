import { SelectionBoxStyled } from 'src/Components/SelectionCard/SelectionCard.styled';
import styled from "@emotion/styled/macro";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { colors } from "src/shared/styles/colors";
import { sectionMargin } from "src/shared/styles/spacing";
import BGStep from "src/shared/assets/bg-horizon.png";
import BGStep2 from "src/shared/assets/group-4.svg";

const StepWrapperStyled = styled.div`
  // ${sectionMargin};
  box-sizing: border-box;
  height: 100%;
  min-height: -webkit-fill-available;
  padding: 20px;
  background: ${colors.paleGrey3} url(${BGStep2}) no-repeat top left;
  background-size: contain;
  overflow: auto;
  background-position: bottom;
  ${mediaQueries.sm} {
    padding: 80px;
  }
`;

// const StepContainerStyled = styled.div`
//   ${sectionMargin};
//   height: 100%;
//   min-height: -webkit-fill-available;
//   // display: flex;
//   // justify-content: center;
//   // align-items: center;
// `;

const StepActiveAreaStyled = styled.div`
  height: 100%;
  min-height: -webkit-fill-available;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StepHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StepBodyStyled = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
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
  padding: 6px 16px;
  text-align: center;
  text-transform: uppercase;
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
  // display: flex;
  // align-items: flex-end;
  // justify-content: space-between;

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
      // ${mediaQueries.mobile}{
      //   position: relative;
      //   top: -43px;
      // }
    }
    ${mediaQueries.mobile}{
    top: 18%;
    
    }
    ${mediaQueries.md} {
      left: 17%;
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
     &#joinTripTransportTypeDiv {
      ${SelectionBoxStyled} {
        ${mediaQueries.mobile} {
          width: 50%
  
        }
        ${mediaQueries.smallMobile} {
          width: 80%
        }
      }
    }
     ${mediaQueries.sm}{
       display: flex;
      }
   `;

export {
  HelpSpeechContainerStyled,
  StepWrapperStyled,
  StepActiveAreaStyled,
  StepHeaderStyled,
  StepBodyStyled,
  StepBodyWrapperStyled,
  StepFooterStyled,
  NameStyled,
  StepContainerStyled,
  QuestionStyled,
  BackButtonStyled,
  SelectionBoxContainerStyled
};
