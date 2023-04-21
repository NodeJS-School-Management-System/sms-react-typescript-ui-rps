import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Spinner,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";

export const SubjectList = ({ list, deleteSubject }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedId, setClickedId] = useState("");

  const openModal = (id: any) => {
    setClickedId(id);
    onOpen();
  };

  useEffect(() => {
    openModal("weer");
    console.log(isOpen, clickedId, onClose);
  }, []);

  const isLoading = false;

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Subject List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Subject Name</Th>
                <Th fontSize={14}>Class</Th>
                <Th fontSize={14}>Subject Teacher</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((subj: any) => (
                  <Tr key={subj.subjectId}>
                    <Td>{subj.subjectName}</Td>
                    <Td>{subj.className || "N/A"}</Td>
                    <Td>{subj.subjectTeacher || "N/A"}</Td>
                    <Td>
                      <Td display={"flex"} gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => deleteSubject(subj.subjectId)}
                          icon={<BiTrashAlt />}
                        />
                        <IconButton
                          colorScheme="blue"
                          // onClick={() => openModal(subj.classroomId)}
                          aria-label="Edit database"
                          icon={<Edit />}
                        />
                      </Td>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
