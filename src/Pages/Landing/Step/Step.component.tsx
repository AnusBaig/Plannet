import React from "react";
import { StepStyled, StepTitleStyled } from "./Step.styled";

interface StepProps {
  title?: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Step: React.FC<StepProps> = ({ title, Icon, children }) => {
  return (
    <StepStyled>
      <Icon />
      <StepTitleStyled>
        {title}
      </StepTitleStyled>
      {children}
    </StepStyled>
  );
};

export default Step;
