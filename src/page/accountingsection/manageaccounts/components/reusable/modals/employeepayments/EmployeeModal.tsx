import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import EmployeeDetails from "./EmployeeDetails";

const EmployeeModal = ({ isOpen, onClose, user }: any) => {
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
          <ModalHeader>
            {user.firstname} {user.lastname}'s' Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmployeeDetails user={user} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeModal;
