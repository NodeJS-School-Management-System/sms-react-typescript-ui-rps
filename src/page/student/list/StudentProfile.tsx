import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Profile } from "./Profile";

const StudentProfile = ({ isOpen, onClose, onOpen, id }: any) => {

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={22}></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Profile studentId={id} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StudentProfile;
