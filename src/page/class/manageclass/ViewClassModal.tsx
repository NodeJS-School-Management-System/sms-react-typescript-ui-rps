import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ClassProfile } from "./SingleClass/ClassProfile";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { myAPIClient } from "../../../components/auth/axiosInstance";

const ViewClassModal = ({ onClose, onOpen, isOpen, selectedId }: any) => {
  const token = localStorage.getItem("token");

  const [classroom, setClassroom] = useState<any>({});

  useEffect(() => {
    const getClassroom = async () => {
      try {
        const res = await myAPIClient.get(`/classroom/${selectedId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClassroom(res.data);
        console.log(classroom);
      } catch (err) {
        console.log(err);
      }
    };
    getClassroom();
  }, []);

  return (
    <>
      <Modal
        size={"full"}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Class Profile</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <ClassProfile classroom={classroom} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ViewClassModal);
