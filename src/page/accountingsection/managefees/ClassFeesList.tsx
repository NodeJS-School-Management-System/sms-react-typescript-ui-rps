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
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";
export const ClassFeesList = ({ list }: any) => {
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
            <TableCaption>Fees List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Class Name</Th>
                <Th fontSize={14}>Amount</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list?.map((fee: any) => (
                <Tr key={fee?.classfeeId}>
                  <Td>{fee?.class}</Td>
                  <Td>{fee?.amount}</Td>
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
