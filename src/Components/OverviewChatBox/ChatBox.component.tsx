import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo
} from "react";
import dayjs from "dayjs";
import { useAuth } from "src/Providers/Auth";
import useApi from "src/shared/hooks/useApi";
import Input from "src/Components/Input";
import Heading from "src/Components/Heading";
import SearchBox from "src/Components/SearchBox";
import RectanguleShadow from "src/Components/RectanguleShadow";
import { useKeyboardEvent } from "src/shared/hooks/useKeyboardEvent";
import { TitleBoxStyled } from "src/Pages/Dashboard/Dashboard.styled";
import { ReactComponent as SendIcon } from "src/shared/assets/send.svg";
import {
  ChatBoxStyledWrapper,
  ChatBoxMessageStyled,
  ChatBoxMessageHeaderStyled,
  ChatBoxTimeStyled,
  ChatBoxMessageWrapperStyled,
  ChatBoxCircleStyled,
  ChatBoxMessage
} from "./ChatBoxStyled";
import { ChatMessage } from "src/Providers/Trips/Trip.reducer";
import { useDashboardOverview } from "src/Providers/DashboardOverview";

interface ChatBoxProps {
  messagesCluster: any;
  style: any;
  tripID: string;
  branchName:
  | "summary"
  | "suggestedDates"
  | "transportation"
  | "accommodation"
  | "itinerary";
}

interface Messages {
  chatMessage: ChatMessage;
  firstName: string;
  lastName: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messagesCluster,
  tripID,
  branchName,
  style
}) => {
  const messagesRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { currentUser } = useAuth();
  const { state, dispatch } = useApi("tripChatMessage/create");
  const [messageText, setMessageText] = useState("");
  const useDashboardOverviewObject = useDashboardOverview();
  const [messages, setMessages] = useState<Messages[]>(
    (messagesCluster.length && messagesCluster) || []
  );
  const [dummyMessages, setDummyMessages] = useState<Messages[]>(
    (messagesCluster.length && messagesCluster) || []
  );
  const { keyPressed, setKeyPressed } = useKeyboardEvent("Enter");

  const handleMessageInput = useCallback(
    ({ target: { value } }) => setMessageText(value),
    []
  );

  const scrollParentToChild = (parent: HTMLElement, child: HTMLElement) => {
    const parentRect = parent.getBoundingClientRect();

    const parentViewableArea = {
      height: parent.clientHeight,
      width: parent.clientWidth
    };

    const childRect = child.getBoundingClientRect();
    const isViewable =
      childRect.top >= parentRect.top &&
      childRect.top <= parentRect.top + parentViewableArea.height;

    if (!isViewable) {
      parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
    }
  };

  const scrollToBottom = () => {
    // @ts-ignore
    scrollParentToChild(messagesContainerRef.current, messagesRef.current);
  };

  useLayoutEffect(scrollToBottom, [messages]);

  const handleSearch = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const filteredMessages = dummyMessages.filter(
        (item: { chatMessage: ChatMessage }) =>
          item.chatMessage.message.includes(value)
      );
      setMessages(filteredMessages);
    },
    [messages]
  );

  const messagesToSet = useMemo(
    () =>
      state.data &&
      state.data.map &&
      state.data.map((chatMessage: ChatMessage) => ({ chatMessage })),
    [state.data]
  );

  const handleSendMessage = useCallback(() => {
    if (!currentUser || !useDashboardOverviewObject.state.dashboardOverview) return null;
    let id;
    if (useDashboardOverviewObject.state.dashboardOverview.tripChat && useDashboardOverviewObject.state.dashboardOverview.tripChat.id) {
      id = useDashboardOverviewObject.state.dashboardOverview.tripChat.id
    } else {
      id = 1
    }
    dispatch({
      type: "SEND_CHAT",
      payload: {
        params: {
          tripChatId: id,
          TripGuestId: currentUser.id,
          message: messageText
        }
      }
    });

    setMessageText("");
  }, [
    currentUser,
    dispatch,
    tripID,
    messageText,
    useDashboardOverviewObject.state.dashboardOverview
  ]);

  useEffect(() => {
    if (!messagesToSet) return;

    setMessages(messagesToSet);

    //DO NOT include useDashboardOverviewObject in dependencies
    // eslint-disable-next-line
  }, [messagesToSet, branchName]);

  useEffect(() => {
    if (!keyPressed || !messageText) return;

    handleSendMessage();
    setKeyPressed(false);
  }, [keyPressed, setKeyPressed, messageText, handleSendMessage]);

  const messagesEmpty = !(messages && messages.length > 0 && messages.map);

  return (
    <RectanguleShadow style={style} column>
      <TitleBoxStyled>
        <Heading as="h3">Chat</Heading>
        <SearchBox placeholder="Search" onChange={handleSearch} />
      </TitleBoxStyled>

      <ChatBoxStyledWrapper ref={messagesContainerRef}>
        {messagesEmpty && (
          <Heading as="h4">
            There are currently no chat messages in this chat!
          </Heading>
        )}
        {!messagesEmpty &&
          messages.map(message => {
            if (!message) return null;
            let msg =
              message && message.chatMessage ? message.chatMessage : message;
            msg = msg as ChatMessage;

            const isSender =
              msg.TripGuestId ==
              (currentUser && currentUser.id) as any;

            let firstName = "";
            let lastName = "";

            if (message.firstName) {
              firstName = message.firstName;
            } else if (msg.firstName) {
              firstName = msg.firstName;
            }

            if (message.lastName) {
              lastName = message.lastName;
            } else if (msg.lastName) {
              lastName = msg.lastName;
            }

            const userInitials = `${firstName.length &&
              firstName[0]}${lastName.length && lastName[0]}`.toUpperCase();
            const fullName = firstName + " " + lastName;

            return (
              <ChatBoxMessageWrapperStyled
                key={msg.id + msg.TripChatId}
                sender={isSender}
              >
                <ChatBoxCircleStyled>{userInitials}</ChatBoxCircleStyled>
                <ChatBoxMessageStyled sender={isSender}>
                  {!isSender && (
                    <ChatBoxMessageHeaderStyled>
                      {fullName}
                    </ChatBoxMessageHeaderStyled>
                  )}
                  <ChatBoxMessage>
                    {msg.message}
                  </ChatBoxMessage>
                  <ChatBoxTimeStyled sender={isSender}>
                    {dayjs(msg.createdAt).format("hh:mm")}
                  </ChatBoxTimeStyled>
                </ChatBoxMessageStyled>
              </ChatBoxMessageWrapperStyled>
            );
          })}
        <div ref={messagesRef} />
      </ChatBoxStyledWrapper>

      <Input
        value={messageText}
        placeholder="Type Message…"
        icon={<SendIcon style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2,
        }} onClick={handleSendMessage} />}
        onChange={handleMessageInput}
      />
    </RectanguleShadow>
  );
};

export default ChatBox;
