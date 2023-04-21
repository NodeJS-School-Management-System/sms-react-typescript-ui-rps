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
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
//   import ClassProfile from "./ClassProfile";
export const FeesList = ({ list, query, isLoading, deleteClass }: any) => {
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
        <TableContainer h={950} overflowY="auto">
          <Table variant="simple">
            <TableCaption>Fees List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Student Name</Th>
                <Th fontSize={14}>Class Name</Th>
                <Th fontSize={14}>Term Name</Th>
                <Th fontSize={14}>Amount Paid</Th>
                <Th fontSize={14}>Amount Remaining</Th>
                <Th fontSize={14}>Sponsorship Scheme</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {[1, 2, 3, 4, 5, 6].map((clas: any) => (
                <Tr key={clas}>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>
                    <Td
                      display={"flex"}
                      justifyContent="center"
                      m="auto"
                      textAlign={"center"}
                      gap={2}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        //   onClick={() => deleteClass(clas.classroomId)}
                        icon={<BiTrashAlt />}
                      />
                      <IconButton
                        colorScheme="blue"
                        //   onClick={() => openModal(clas.classroomId)}
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
