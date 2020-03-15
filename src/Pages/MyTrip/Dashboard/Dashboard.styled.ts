import styled from "@emotion/styled/macro";
import { HeadingStyled } from "src/Components/Heading/Heading.styled";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const Step1WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;  
  box-sizing: border-box;
  width: 100%;
  
  .Collapsible {
    border: 1px solid gray;
    margin: 0 auto;
    margin-bottom: 10%;
    width: 80%;
    box-shadow: 2px 2px 2px #CCC;
    background-color: white;
    ${mediaQueries.mobile} {
      width: 100%;
    }


    
  }

`;

const NoTripsPlannedWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: inherit;
  box-sizing: border-box;
  width: 100%;
  padding: 0;

  ${mediaQueries.md} {
    align-items: flex-end;
    padding-right: 60px;
  }
`;

const NoTripsPlannedContainerStyled = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableWrapperStyled = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const Step1ButtonsStyled = styled.div`
  text-align: center;
  margin-top: 5px;
  max-width: 100%;
  width: 300px;
`;

const HeadingWrapperStyled = styled.div`
  display: flex;
  width: 100%;
`;

const WelcomeStyled = styled.div`
  position: absolute;
  left: 80px;
  text-align: center;
  margin-top: 40px;
  color: ${colors.white};
  width: 290px;
  ${HeadingStyled} {
    color: white;
  }
`;

export {
  Step1WrapperStyled,
  Step1ButtonsStyled,
  HeadingWrapperStyled,
  WelcomeStyled,
  NoTripsPlannedContainerStyled,
  NoTripsPlannedWrapperStyled,
  TableWrapperStyled
};
