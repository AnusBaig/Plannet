import { mediaQueries } from "src/shared/styles/mediaQueries";
import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";

const DoubleSectionStyled = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.md} {
    flex-direction: row;
  }

  section {
    flex: 1;
    box-sizing: border-box;
    padding: 0 25px;

    &:first-of-type {
      border-right: 0;

      ${mediaQueries.md} {
        border-right: 2px solid ${colors.paleGrey6};
      }
    }
  }
`;

export { DoubleSectionStyled };
