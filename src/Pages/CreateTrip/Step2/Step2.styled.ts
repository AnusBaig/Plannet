import styled from "@emotion/styled/macro";
import { QuestionStyled, SelectionBoxContainerStyled } from "../createtrip.styled";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";
import { CityStyled, ContainerStyled } from "src/Components/TransportationCard/TransportationCard.styled";
import TransportationCard from "src/Components/TransportationCard";
import { SelectionBoxStyled, SelectionStyled } from "src/Components/SelectionCard/SelectionCard.styled";

const CityList = styled.div`
  width: 99%;
  height: 100%;
  ${mediaQueries.sm}{
    width: 50%;
  }
  ${mediaQueries.md}{
    width:25%
  }
  &#createTripTransportationCityListDiv {
    ${mediaQueries.mobile} {
    position: relative;
    ${ContainerStyled} {
      margin: auto;
    }
  }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 70%;
  }
  border-radius: 4px;
  border: solid 0.8px rgba(161, 165, 169, 0.75);
`;

const SelectionContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0px;
  ${mediaQueries.sm}{
    margin-left: 82px;
    margin-bottom: 10%;
  }
  ${mediaQueries.mobile}{
    margin-top: 56px;
  }
  ${QuestionStyled} {
  margin-top: 0;
  }
  ${SelectionBoxContainerStyled}{
    ${SelectionBoxStyled}{
      ${mediaQueries.mobile}{
        height: 56px;
        justify-content: flex-end;
        flex-direction: row-reverse;
      }
      ${SelectionStyled}{
        ${mediaQueries.mobile}{
        margin: auto 12px;
        }
      }
    }
  }
`;

const CityNameStyled = styled.span`
  color: ${colors.cerulean};
`;

const TransportationContainerStyled = styled.div`
// margin: 56px 0;
width: 100%;
display: block;
${mediaQueries.sm}{
  display: flex;
  margin-top: 77px;
}
  ${QuestionStyled} {
    // width: 676px;
  }
${CityList}{
  ${mediaQueries.mobile}{
    width: 100%;
  height: 270px;
  display: flex;
  overflow-x: auto;
  }
  ${ContainerStyled}{
    ${mediaQueries.mobile}{
      width: 70%;
      flex-shrink: 0;
      height: 70%;
      margin: 34px 40px;
    }
  }
}
`;

export {
  CityNameStyled,
  CityList,
  SelectionContainerStyled,
  TransportationContainerStyled,
};
