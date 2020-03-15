import React from "react";
import { FallbackStyled, SpinnerStyled, Dot1, Dot2 } from "./Fallback.styled";

const Fallback: React.FC = () => {
  return (
    <FallbackStyled>
      <SpinnerStyled>
        <Dot1 />
        <Dot2 />
      </SpinnerStyled>
    </FallbackStyled>
  );
};

export default Fallback;
