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
  Box,
} from "@chakra-ui/react";
import { Download, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { myAPIClient } from "../../auth/axiosInstance";
import ViewLib from "./ViewLib";
// import StudentProfile from "./StudentProfile";
export const ViewLibrary = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [clickedId, setClickedId] = useState("");

  // const openModal = (id: any) => {
  //   setClickedId(id);
  //   onOpen();
  // };

  // GET ALL LIB BOOKS **************************************************************************
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await myAPIClient.get("/library", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

  const isFetching = false;

  return (
    <Box>
      <ViewLib />
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Library List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Book Title</Th>
                <Th fontSize={14}>Book Author</Th>
                <Th fontSize={14}>Subject Name</Th>
                <Th fontSize={14}>Class Name</Th>
                {/* <Th fontSize={14}>Publication</Th> */}
                <Th fontSize={14}>Status</Th>
                <Th fontSize={14}>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {books.map((book: any) => (
                <Tr key={book.bookId}>
                  <Td>{book.bookTitle}</Td>
                  <Td>{book.bookAuthor}</Td>
                  <Td>{book.subjectName}</Td>
                  <Td>{book.className}</Td>
                  {/* <Td>{book.}</Td> */}
                  <Td>{book.status}</Td>
                  {/* <Td> */}
                  <Td display={"flex"} gap={2}>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete database"
                      // onClick={() => deleteStudent(user.studentId)}
                      icon={<BiTrashAlt />}
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Edit database"
                      // onClick={() => deleteStudent(user.studentId)}
                      icon={<Edit />}
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Download File"
                      // onClick={() => deleteStudent(user.studentId)}
                      icon={<Download />}
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
                  {/* </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
