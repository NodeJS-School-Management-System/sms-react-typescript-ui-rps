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
// import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
export const CustomTable = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [clickedId, setClickedId] = useState("");

  // const openModal = (id: any) => {
  //   setClickedId(id);
  //   onOpen();
  // };

  const isFetching = false;

  return (
    <>
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Results List</TableCaption> */}
            <Thead>
              <Tr>
                <Th fontSize={14}>Full Name</Th>
                <Th fontSize={14}>Marks</Th>
                <Th fontSize={14}>Comment</Th>
                <Th fontSize={14}>RE</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((res: any) => (
                <Tr key={res}>
                  <Td>Abeinemukama Vicent</Td>

                  <Td>Test</Td>
                  <Td>Test</Td>
                  <Td>Test</Td>
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
                        // onClick={() => openModal(user.studentId)}
                        aria-label="Edit database"
                        icon={<BsEye />}
                      />
                      {/* <Box>
                          {isOpen ? (
                            <StudentProfile
                              id={clickedId}
                              user={user}
                              onOpen={onOpen}
                              onClose={onClose}
                              isOpen={isOpen}
                            />
                          ) : null}
                        </Box> */}
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
