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
        <TableContainer overflowX={{ base: "auto" }}>
          <Table variant="simple">
            <TableCaption>Class List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12}>Class Name</Th>
                <Th fontSize={12}>Class Numeral</Th>
                <Th fontSize={12}>Class Teacher</Th>
                <Th fontSize={12} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((clas: any) => (
                  <Tr key={clas._id}>
                    <Td fontSize={12}>{clas.classname}</Td>
                    <Td fontSize={12}>{clas.classnumeral}</Td>
                    <Td fontSize={12}>{clas.classteacher || "N/A"}</Td>
                    <Td fontSize={12}>
                      <Td
                        fontSize={12}
                        display={"flex"}
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                      >
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => deleteClass(clas._id)}
                          icon={<BiTrashAlt />}
                          size="sm"
                        />
                        <IconButton
                          colorScheme="blue"
                          onClick={() => openModal(clas._id)}
                          aria-label="Edit database"
                          icon={<BsEye />}
                          size="sm"
                        />
                      </Td>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>

          {/* Class profile modal */}
          <ClassProfile
            id={clickedId}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
          />
        </TableContainer>
      )}
    </>
  );
};
