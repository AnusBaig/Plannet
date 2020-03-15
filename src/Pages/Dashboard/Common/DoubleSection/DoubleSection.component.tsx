import React from "react";
import { DoubleSectionStyled } from "./DoubleSection.styled";

const DoubleSection: React.FC = ({ children }) => {
  return <DoubleSectionStyled>{children}</DoubleSectionStyled>;
};

export default DoubleSection;
