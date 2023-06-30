import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";
export const CustomTable = ({ results }: any) => {
  // FIND INDEX OF SELECTED MARK

  const isFetching = false;
  // const isAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer w="100%" height={450} overflow={"auto"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={14}>Full Name</Th>
                <Th fontSize={14}>Marks</Th>
                <Th fontSize={14}>Grade</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {results?.map((res: any) => (
                <Tr key={res._id}>
                  <Td>{res.studentname}</Td>
                  <Td>{res.marks[0].marks}</Td>
                  <Td>{res.marks[0].grade}</Td>
                  <Td>
                    <Td display={"flex"} gap={2}>
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        isDisabled
                        size="xs"
                        // onClick={() => deleteStudent(user.studentId)}
                        icon={<BiTrashAlt />}
                      />
                      <IconButton
                        colorScheme="blue"
                        size={"xs"}
                        // isDisabled={!isAdmin}
                        isDisabled
                        // onClick={() => openModal(user.studentId)}
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
