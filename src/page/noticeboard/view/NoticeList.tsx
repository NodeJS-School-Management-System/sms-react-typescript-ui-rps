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
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
export const NoticeList = ({ list, query, isLoading, deleteClass }: any) => {
 

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer h={500} overflowY='auto'>
          <Table variant="simple">
            <TableCaption>Notice Board</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Title</Th>
                <Th fontSize={14}>Message</Th>
                <Th fontSize={14}>Posted By</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((clas: any) => (
                <Tr key={clas}>
                  <Td>test</Td>
                  <Td>test</Td>
                  <Td>test</Td>

                  <Td
                    m="auto"
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent="center"
                    gap={2}
                  >
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete database"
                      // onClick={() => deleteClass(clas.classroomId)}
                      icon={<BiTrashAlt />}
                    />
                    <IconButton
                      colorScheme="blue"
                      // onClick={() => openModal(clas.classroomId)}
                      aria-label="Edit database"
                      icon={<BsEye />}
                    />
                    {/* <Box>
                        {isOpen ? (
                          <ClassProfile
                            id={clickedId}
                            classroom={clas}
                            onOpen={onOpen}
                            onClose={onClose}
                            isOpen={isOpen}
                          />
                        ) : null}
                      </Box> */}
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
