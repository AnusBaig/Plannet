import React from "react";

import {
  ContainerStyled,
  TitleStyled,
  MessageStyled,
} from "./Whoops.styled";

import Button from "src/Components/Button";

interface WhoopsProps {
  icon: React.FC,
  message: string,
  onGoBack: () => void,
}

const Whoops: React.FC<WhoopsProps> = ({
  icon: Icon,
  message,
  onGoBack,
}) => {
  return (
    <ContainerStyled>
      <Icon />
      <TitleStyled>
        Whoops!
      </TitleStyled>
      <MessageStyled>
        { message }
      </MessageStyled>
      <Button
        glow
        onClick={onGoBack}
      >
        GO BACK
      </Button>
    </ContainerStyled>
  );
};

export default Whoops;
