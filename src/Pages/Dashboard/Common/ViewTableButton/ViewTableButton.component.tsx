import React, { useState, useCallback } from "react";
import {
  ButtonAreaWrapperStyled,
  ButtonAreaStyled,
  UserNameStyled,
  LinkStyled,
  ButtonsStyled
} from "./ViewTableButton.styled";
import { CircleStyled } from "src/Pages/Dashboard/Dashboard.styled";
import { ReactComponent as LikeIcon } from "src/shared/assets/like.svg";
import { ReactComponent as DislikeIcon } from "src/shared/assets/dislike.svg";
import { ButtonsDetailsStyled } from "src/Pages/Dashboard/Common/Common.styled";

interface ViewTableButtonProps {
  user: string;
}

const ViewTableButton: React.FC<ViewTableButtonProps> = ({
  user,
  children
}) => {
  const [showArea, setShowArea] = useState(false);

  const handleViewDetails = useCallback(() => {
    setShowArea(prevShowArea => !prevShowArea);
  }, []);

  return (
    <ButtonAreaWrapperStyled>
      <ButtonAreaStyled>
        <UserNameStyled>
          <CircleStyled> </CircleStyled> {user}
        </UserNameStyled>
        <ButtonsStyled>
          <ButtonsDetailsStyled>
            <LikeIcon />
            <DislikeIcon />
            <LinkStyled onClick={handleViewDetails}>View Details</LinkStyled>
          </ButtonsDetailsStyled>
        </ButtonsStyled>
      </ButtonAreaStyled>
      {showArea && children}
    </ButtonAreaWrapperStyled>
  );
};

export default ViewTableButton;
