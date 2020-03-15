import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { CircleStyled } from "src/Pages/Dashboard/Dashboard.styled";

interface ChatMessage {
  sender: boolean;
}

const ChatBoxStyledWrapper = styled.ul`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  overflow: auto;
  max-height: 455px;
  min-height: 455px;
`;

const ChatBoxMessageStyled = styled.div<ChatMessage>`
  position: relative;
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: solid 1px ${colors.silver};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.15px;
  color: ${colors.charcoalGrey};
  background: ${p => (p.sender ? colors.iceBlue2 : colors.white)};
  border-color: ${p => (p.sender ? colors.white : colors.silver)};
`;

const ChatBoxMessageHeaderStyled = styled.p`
  font-family: Quicksand;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: 0.15px;
  margin-bottom: 10px;
  // border: solid 1px ${colors.silver};
  color: ${colors.steel};
`;

const ChatBoxMessage = styled.p`
  font-family: Quicksand;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: 0.15px;
  color: #282832;
  // border: 0;
  // outline: none;
  // background-color:#e8f8ff;
`;

const ChatBoxCircleStyled = styled.span`
  // border: 1px solid ${colors.paleGrey2};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: 0.15px;
  background-color: ${colors.skyBlue};
  color: ${colors.white};
`;


const ChatBoxTimeStyled = styled.small<ChatMessage>`
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  left: ${p => (p.sender ? "auto" : 0)};
  right: ${p => (p.sender ? 0 : "auto")};
  bottom: -15px;
`;

const ChatBoxMessageWrapperStyled = styled.li<ChatMessage>`
  max-width: 85%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  align-self: ${p => (p.sender ? "flex-end" : "auto")};
  flex-direction: ${p => (p.sender ? "row-reverse" : "auto")};

  & > ${CircleStyled} {
    ${p => {
    if (p.sender) {
      return `
          margin-left: 12px;
          margin-right: 0;
        `;
    }
  }}
/* TODO: Resolve this ts-styled error */
`;

export {
  ChatBoxStyledWrapper,
  ChatBoxMessageWrapperStyled,
  ChatBoxTimeStyled,
  ChatBoxMessageStyled,
  ChatBoxMessageHeaderStyled,
  ChatBoxMessage,
  ChatBoxCircleStyled
};
