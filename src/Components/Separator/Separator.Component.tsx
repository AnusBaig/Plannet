import React from "react";
import { SeparatorStyled, SeparatorProps } from "./Separator.styled";

const Separator: React.FC<SeparatorProps> = props => {
  return <SeparatorStyled {...props} />;
};

export default Separator;
