import React from "react";
import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react";

type Props = {
  title?: string;
  footer?: React.ReactNode;
  showCloseBtn?: boolean;
};

const Modal: React.FC<Props & ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer = null,
  showCloseBtn = false,
  ...rest
}) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {showCloseBtn && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </CModal>
  );
};

export default Modal;
