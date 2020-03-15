import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const ButtonAreaWrapperStyled = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const ButtonAreaStyled = styled.div`
  border: solid 1px #cfcfd1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.15px;
  color: ${colors.charcoalGrey};
  align-items: center;
`;

const UserNameStyled = styled.span`
  display: flex;
`;

const LinkStyled = styled.a`
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.cerulean};
  text-transform: uppercase;
  cursor: pointer;
`;

const ButtonsStyled = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 20px;
    cursor: pointer;
  }
`;

export {
  ButtonAreaWrapperStyled,
  ButtonAreaStyled,
  UserNameStyled,
  LinkStyled,
  ButtonsStyled
};
