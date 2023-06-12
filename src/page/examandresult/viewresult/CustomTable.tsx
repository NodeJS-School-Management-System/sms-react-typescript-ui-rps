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
  const isFetching = false;
  // const isAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer w="100%">
          <Table variant="simple">
            {/* <TableCaption>Results List</TableCaption> */}
            <Thead>
              <Tr>
                <Th fontSize={14}>First Name</Th>
                <Th fontSize={14}>Last Name</Th>
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
                  <Td>{res.lastname}</Td>
                  <Td>{res.examresults[0].marks[0].marks}</Td>
                  <Td>{res.examresults[0].marks[0].grade}</Td>
                  <Td>
                    <Td display={"flex"} gap={2}>
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        // onClick={() => deleteStudent(user.studentId)}
                        icon={<BiTrashAlt />}
                      />
                      <IconButton
                        colorScheme="blue"
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
