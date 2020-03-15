import styled from "@emotion/styled/macro";
import { Colors } from "@dimelo/types/styles";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  width?: string;
  color?: keyof Colors;
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
}

const HeadingStyled = styled.h2<HeadingProps>`
  font-size: ${p => {
    let size;
    switch (p.as) {
      case "h2":
        size = "28px";
        break;
      case "h3":
        size = "22px";
        break;
      case "h4":
        size = "18px";
        break;
      default:
        size = "32px";
    }
    return size;
  }};
  font-weight: 500;
  letter-spacing: 0.6px;
  text-align: ${p => (p.align ? p.align : "center")};
  color: ${p => (p.color ? colors[p.color] : colors.black)};

  width: ${p => (p.width ? p.width : "100%")};
  max-width: 100%;
  margin: 0;

  ${mediaQueries.sm} {
    font-size: ${p => {
      let size;
      switch (p.as) {
        case "h2":
          size = "36px";
          break;
        case "h3":
          size = "24px";
          break;
        case "h4":
          size = "20px";
          break;
        default:
          size = "48px";
      }
      return size;
    }};
  }
`;

export { HeadingStyled };
