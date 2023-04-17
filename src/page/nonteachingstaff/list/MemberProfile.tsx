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
//   import { Profile } from "./Profile";

const MemberProfile = ({ isOpen, onClose, onOpen, id, user }: any) => {
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={22}></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         
          <Profile nonteachingstaffId={id} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberProfile;
