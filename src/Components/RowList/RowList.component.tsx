import React from "react";
import { RowListStyled } from "./RowList.styled";

import { CircleStyled } from "src/Pages/Dashboard/Dashboard.styled";

interface RowListProps {
  text: string;
}

const RowList: React.FC<RowListProps> = ({ text }) => {
  return (
    <RowListStyled>
      <CircleStyled> </CircleStyled> {text}
    </RowListStyled>
  );
};

export default RowList;
