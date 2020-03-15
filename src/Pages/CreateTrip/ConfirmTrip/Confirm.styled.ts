import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { RectanguleStyled } from "src/Components/RectanguleShadow/RectanguleShadow.styled";

const InputStyled = styled.div`
  width: 320px;
  margin: 56px
`;

const MoneyStyled = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-left: 16px;
  colors: ${colors.darkGrey1};
`;

const BudgetStyled = styled.div`
  margin-top: 40px;
  font-size: 21px;
  color: ${colors.cerulean};
  width: 100%;
  margin-left: 0px;
  ${mediaQueries.sm}{
    width : 100%;
    // margin-left: 46px;
  }
  ${RectanguleStyled} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 104px;
    margin-top: 16px;
  }
`;

const InviteesStyled = styled.div`
  ${RectanguleStyled} {
    max-height: 264px;
  }
`;

const NameStyled = styled.div`
  color: ${colors.darkGrey1};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const EmailStyled = styled.div`
  font-size: 14px;
  color: ${colors.darkGrey1};
 
`;

const InviteStyled = styled.div`
  font-size: 21px;
  color: ${colors.cerulean};
  font-weight: 600;
  width: calc(100% - 30px);
  margin: 16px 0px;
  margin-left: 0px;
  min-height: 30px;
  border-radius: 4px;
  border: solid 1px #dadada;
  background-color: #ffffff;
  padding : 24px 15px;
  ${mediaQueries.sm}{
    padding : 0px;
    width : 30%;
    margin: 0px 0px;
    margin-left: 46px;
    height: auto;
    border-radius: 0px;
    border: solid 0px #dadada;
    background-color: none;
  }
  ${RectanguleStyled} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    color: ${colors.darkGrey1};
    margin-top: 16px;
    font-weight: normal;
    overflow: auto;
    ${mediaQueries.mobile}{
      border : none;
      padding : 0px
    }
    hr {
      width: 312px;
      height: 1px;
      background-color: ${colors.paleBlue};
      border: 0;
      margin: 16px 0;
    }
  }
`;

const CityStyled = styled.div`
  font-size: 14px;
  margin-top: 2px;
  margin-bottom: 15px;
  color: ${colors.darkGrey1};
`;

const OriginStyled = styled.div`
  ${CityStyled} {
    font-size: 16px;
    font-weight: 600;
  }
`;

const DestinationStyled = styled.div`
  ${CityStyled} {
    font-weight: 600;
    font-size: 16px;
  }
`;

const TravelStyled = styled.div`
  font-size: 21px;
  color: ${colors.cerulean};
  font-weight: 600;
  width: calc(100% - 30px);
  margin-left: 0px;
  min-height: 30px;
  border-radius: 4px;
  margin: 16px 0px;
  border: solid 1px #dadada;
  background-color: #ffffff;
  padding : 24px 15px;
  ${mediaQueries.sm}{
    padding : 0px;
    width : 33%;
    margin: 0px 0px;
    margin-left: 46px;
    height: auto;
    border-radius: 0px;
    border: solid 0px #dadada;
    background-color: none;
  }
  ${RectanguleStyled} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-height: 448px;
    font-size: 10px;
    margin-top: 16px;
    color: ${colors.darkGrey1};
    font-weight: normal;
    overflow: auto;
    ${mediaQueries.mobile}{
      border : none;
      padding : 0px

    }
    hr {
      width: 312px;
      height: 1px;
      background-color: ${colors.paleBlue};
      border: 0;
      margin: 16px 0;
    }
`;

const DateStyled = styled.div`
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 16px;
  color: ${colors.darkGrey1};
`;

const AccomodationStyled = styled.div`
  font-size: 14px;
`;

const SpanStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  svg {
    margin: 19px 8px;
    path{
      fill: ${colors.cerulean};
    }
  }
`;

const DetailStyled = styled.div`
  font-size: 21px;
  color: ${colors.cerulean};
  font-weight: 600;
  
  width: calc(100% - 30px);
  margin-left: 0px;

  min-height: 30px;
  border-radius: 4px;
  border: solid 1px #dadada;
  margin: 16px 0px;
  background-color: #ffffff;
  padding : 24px 15px;
  ${mediaQueries.sm}{
    padding : 0px;
    width : 33%;
    margin: 0px 0px;
    margin-left: 46px;
    height: auto;
    border-radius: 0px;
    border: solid 0px #dadada;
    background-color: none;
  }
  ${RectanguleStyled} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-height: 448px;
    font-size: 10px;
    color: ${colors.darkGrey1};
    margin-top: 16px;
    font-weight: normal;
    overflow: auto;
    ${mediaQueries.mobile}{
      border : none;
      padding : 0px
    }
    hr {
      width: 324px;
      height: 1px;
      background-color: ${colors.paleBlue};
      border: 0;
      margin: 16px 0;
    }
  }
`;
const TripDetailStyled = styled.div`
  display: flex;
  margin-top: 76px;
  width: 100%;
  flex-wrap: wrap;
  overflow: auto;
  ${mediaQueries.sm}{
    flex-wrap: nowrap;
  }
`;

const TitleStyled = styled.div`
  font-size: 21px;
  font-weight: 500;
  color: ${colors.cerulean};
`;

const MessageStyled = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ProgressStyled = styled.div`
width: 74%;
    margin-left: auto;
    margin-right: auto;
`;

const RsvpStyled = styled.div`
  margin-top: 40px;
  width: 97%;
  margin-left: 44px;
  align-self: end;
  ${RectanguleStyled} {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 31px;
    height: 244px;
    ${mediaQueries.mobile}{
      height: 100%;
      justify-content: space-between;
    }
    & > ${ProgressStyled}{
      ${mediaQueries.mobile}{
        width: auto; 
        margin-left: -21px;
       margin-right: 0px;
      }
    } 
  }
  ${mediaQueries.mobile}{
    height: 481px;
  width: 100%;
    margin-left: 0px;
  }
`;

export {
  MoneyStyled,
  BudgetStyled,
  InviteesStyled,
  NameStyled,
  EmailStyled,
  InviteStyled,
  TravelStyled,
  DateStyled,
  CityStyled,
  AccomodationStyled,
  OriginStyled,
  DestinationStyled,
  SpanStyled,
  DetailStyled,
  TripDetailStyled,
  TitleStyled,
  MessageStyled,
  ProgressStyled,
  RsvpStyled,
  InputStyled,
};
