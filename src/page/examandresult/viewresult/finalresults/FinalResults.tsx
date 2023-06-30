import {
  Table,
  Thead,
  Tbody,
  Tr,
  Box,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

const FinalResults = () => {
  const tableHeaders = ["Item Name", "Item Category", "Amount", "Action"];

  return (
    <Box w="100%">
      <Box
        fontWeight={"bold"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        margin="auto"
        fontSize={13}
      >
        Results
      </Box>
      <Box>
        <TableContainer h={560} overflowY={"auto"}>
          <Table fontSize={12} variant="simple" colorScheme="gray">
            <TableCaption fontSize={13}>Results</TableCaption>
            <Thead>
              <Tr>
                {tableHeaders.map((thd) => (
                  <Th fontSize={12} key={thd}>
                    {thd}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {[1, 2, 3, 4].map((d: any) => (
                <Tr key={d?._id}>
                  <Td fontSize={10}>test</Td>
                  <Td fontSize={12}>test</Td>
                  <Td fontSize={12}>test</Td>
                  <Td margin="auto">
                    <Flex gap={2}>
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        // onClick={() =>}
                        icon={<BiTrashAlt />}
                        size="xs"
                      />
                      <IconButton
                        colorScheme="blue"
                        // onClick={() => openModal(user.studentId)}
                        aria-label="Edit database"
                        icon={<BsEye />}
                        size="xs"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FinalResults;
