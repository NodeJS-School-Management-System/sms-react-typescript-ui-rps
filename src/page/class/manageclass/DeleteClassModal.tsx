import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const DeleteClassModal = ({ onClose, onOpen, isOpen }: any) => {
  const token = localStorage.getItem("token");

  const deleteClass = async () => {
    try {
      const res = await myAPIClient.delete(
        "/classroom/14472ffe564c4925b29f4c5255384f96",
        {
          headers: {
            token: `Bearer: ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontWeight={"bold"}>
              Are you sure you want to delete this class?
            </Box>
            <Box pt={4} pb={2}>
              <Button onClick={onClose} colorScheme={"#0ff"} bg={"#f00"} mr={5}>
                Cancel
              </Button>
              <Button colorScheme={"whatsapp"} onClick={deleteClass}>
                Confirm
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
