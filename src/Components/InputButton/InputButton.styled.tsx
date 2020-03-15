import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const WrapperStyled = styled.div`
  height: 80px;
  border-radius: 4px;
  background-color: ${colors.paleBlue};
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const InputStyled = styled.input`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.19px;
  color: ${colors.steel};
  flex: 1;
  margin-right: 15px;
  outline: none;
  border: none;
  background: transparent;

  ${mediaQueries.md} {
    font-size: 20px;
  }
`;

const ButtonStyled = styled.button`
  height: 50px;
  border-radius: 4px;
  background-color: ${colors.cerulean};
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: ${colors.white};

  ${mediaQueries.md} {
    font-size: 20px;
  }
`;

export { WrapperStyled, InputStyled, ButtonStyled };
