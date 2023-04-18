import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Profile } from "./Profile";

const ClassProfile = ({ isOpen, onClose, onOpen, id, user }: any) => {
  useEffect(() => {
    console.log(id);
  }, []);
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

export default ClassProfile;
