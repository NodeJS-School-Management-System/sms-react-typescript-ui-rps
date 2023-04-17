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
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import ClassProfile from "./ClassProfile";
export const ClassList = ({ list, query, isLoading, deleteClass }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedId, setClickedId] = useState("");

  const openModal = (id: any) => {
    setClickedId(id);
    onOpen();
  };

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Class List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Class Name</Th>
                <Th fontSize={14}>Class Numeral</Th>
                <Th fontSize={14}>Class Teacher</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((clas: any) => (
                  <Tr key={clas.classId}>
                    <Td>{clas.className}</Td>
                    <Td>{clas.classNumeral}</Td>
                    <Td>{clas.classNumeral}</Td>
                    <Td>
                      <Td display={"flex"} gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => deleteClass(clas.classroomId)}
                          icon={<BiTrashAlt />}
                        />
                        <IconButton
                          colorScheme="blue"
                          onClick={() => openModal(clas.classroomId)}
                          aria-label="Edit database"
                          icon={<BsEye />}
                        />
                        <Box>
                          {isOpen ? (
                            <ClassProfile
                              id={clickedId}
                              classroom={clas}
                              onOpen={onOpen}
                              onClose={onClose}
                              isOpen={isOpen}
                            />
                          ) : null}
                        </Box>
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
