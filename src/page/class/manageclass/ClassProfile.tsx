import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          corrupti? Hic itaque illo, dolor aliquid explicabo, reiciendis velit
          laudantium nostrum placeat, reprehenderit dolores distinctio beatae
          provident quasi accusantium labore quaerat?
          {/* <Profile studentId={id} /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClassProfile;
