import React from "react";
import { RectanguleStyled, RectanguleProps } from "./RectanguleShadow.styled";

const RectanguleShadow: React.FC<RectanguleProps> = props => {
  return <RectanguleStyled {...props} ref={props.ref} />;
};

export default RectanguleShadow;
