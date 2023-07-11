import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import CreditorDetails from "./CreditorDetails";

const CreditorsModal = ({ isOpen, onClose, user }: any) => {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="xl"
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.suppliername}'s' Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreditorDetails user={user} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreditorsModal;
