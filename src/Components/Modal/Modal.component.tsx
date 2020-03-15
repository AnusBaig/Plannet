import React, { useEffect, useRef } from "react";
import useLockBodyScroll from "src/shared/hooks/useLockBodyScroll";
import Button from "src/Components/Button";
import {
  ModalBackdropStyled,
  ModalContainerStyled,
  ModalHeaderStyled,
  ModalBodyStyled,
  ModalFooterStyled
} from "./Modal.styled";

interface ModalProps {
  title?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  clickOutsideDisabled?: boolean;
  isConfirmButtonDisabled?: boolean;
  toggle: () => void;
  onConfirm?: (data?: object) => void;
  onCancel?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  cancelButtonText,
  confirmButtonText,
  toggle,
  onConfirm,
  onCancel,
  clickOutsideDisabled,
  isConfirmButtonDisabled
}) => {
  const modalBackdropRef = useRef(null);
  const modalContainerRef = useRef(null);

  useLockBodyScroll();

  function dismiss() {
    //@ts-ignore
    modalBackdropRef.current.classList.remove("fade-in");
    //@ts-ignore
    modalContainerRef.current.classList.remove("fade-in");

    setTimeout(() => {
      toggle();
    }, 200);
  }

  const handleCancel = () => {
    onCancel && onCancel();
    dismiss();
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    dismiss();
  };

  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };

  const handleClickOutside = () => {
    if (!clickOutsideDisabled) {
      handleCancel();
    }
  };

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      //@ts-ignore
      modalBackdropRef.current.classList.add("fade-in");
      //@ts-ignore
      modalContainerRef.current.classList.add("fade-in");
    }, 100);

    return () => clearTimeout(fadeInTimeout);
  }, []);

  return (
    <ModalBackdropStyled ref={modalBackdropRef} onClick={handleClickOutside}>
      <ModalContainerStyled
        ref={modalContainerRef}
        onClick={handleContainerClick}
      >
        <ModalHeaderStyled>
          <h2>{title || ""}</h2>
        </ModalHeaderStyled>

        <ModalBodyStyled>{children}</ModalBodyStyled>

        <ModalFooterStyled>
          <Button onClick={handleCancel}>{cancelButtonText || "CANCEL"}</Button>

          <Button
            onClick={handleConfirm}
            disabled={isConfirmButtonDisabled}
            active
          >
            {confirmButtonText || "OK"}
          </Button>
        </ModalFooterStyled>
      </ModalContainerStyled>
    </ModalBackdropStyled>
  );
};

export default Modal;
