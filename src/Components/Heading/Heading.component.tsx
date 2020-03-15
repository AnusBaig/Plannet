import React from "react";
import { HeadingStyled, HeadingProps } from "./Heading.styled";

const Heading: React.FC<HeadingProps> = props => {
  return <HeadingStyled {...props} />;
};

export default Heading;
