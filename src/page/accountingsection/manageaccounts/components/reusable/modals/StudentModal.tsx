import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../../auth/axiosInstance";
import StudentDetails from "./StudentDetails";

const StudentModal = ({ isOpen, onClose, id }: any) => {
  const [student, setStudent] = useState<any>({});
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await myAPIClient.get(`/users/students/${id}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudent();
  }, [id]);

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
            {student.firstname} {student.lastname}'s' Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StudentDetails student={student} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentModal;
