import styled from "@emotion/styled/macro";
import { colors } from "src/shared/styles/colors";
import { mediaQueries } from "src/shared/styles/mediaQueries";

const ModalBackdropStyled = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black40};
  opacity: 0;
  transition: all linear 0.25s;
  &.fade-in {
    opacity: 1;
  }
  &.fade-out {
    opacity: 0;
  }
`;

const ModalContainerStyled = styled.div`
  overflow-y: auto;
  background-color: ${colors.white};
  max-height: 90%;
  width: 90%;
  max-width: 800px;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${colors.cerulean};
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  transition: all linear 0.15s;
  &.fade-in {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
  ${mediaQueries.md} {
    margin-bottom: 10%;
  }
`;

const ModalHeaderStyled = styled.div`
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.skyBlue};
  h2 {
    margin: 0;
    color: ${colors.white};
    font-weight: 500;
  }
`;

const ModalBodyStyled = styled.div`
  padding: 30px;
`;

const ModalFooterStyled = styled.div`
  padding: 14px 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.white};
`;

export {
  ModalBackdropStyled,
  ModalContainerStyled,
  ModalHeaderStyled,
  ModalBodyStyled,
  ModalFooterStyled
};
