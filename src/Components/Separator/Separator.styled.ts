import styled from "@emotion/styled/macro";

export interface SeparatorProps {
  width?: string;
}

const SeparatorStyled = styled.div<SeparatorProps>`
  height: 0;
  margin-bottom: ${p => p.width || "10px"};
`;

export { SeparatorStyled };
