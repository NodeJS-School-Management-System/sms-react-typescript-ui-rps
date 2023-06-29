import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Profile } from "./Profile";

const ClassProfile = ({ isOpen, onClose, id }: any) => {
 
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={22}></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Profile classroomId={id} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClassProfile;
