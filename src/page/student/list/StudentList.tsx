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
  Image,
  Spinner,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import StudentProfile from "./StudentProfile";
export const StudentList = ({
  list,
  query,
  isFetching,
  deleteStudent,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedId, setClickedId] = useState("");

  const isAdmin = localStorage.getItem("isAdmin");

  console.log(isAdmin);

  const openModal = (id: any) => {
    setClickedId(id);
    onOpen();
  };

  return (
    <>
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer overflowY={"auto"} w="100%">
          <Table variant="simple">
            <TableCaption>Student's List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12}>Full Name</Th>
                <Th fontSize={12}>Username</Th>
                <Th fontSize={12}>Profile Image</Th>
                <Th fontSize={12}>Passcode</Th>
                <Th fontSize={12}>Class</Th>
                <Th fontSize={12}>Address</Th>
                <Th fontSize={12}>Parent Name</Th>
                <Th fontSize={12}>Parent Contact</Th>
                <Th fontSize={12} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((user: any) => (
                  <Tr key={user.studentId}>
                    <Td fontSize={12}>
                      {user.firstname} {user.lastname}
                    </Td>
                    <Td fontSize={12}>{user.username}</Td>
                    <Td fontSize={12} textAlign={"center"} margin="auto" p={0}>
                      <Image
                        w={45}
                        margin="auto"
                        h={45}
                        objectFit="cover"
                        borderRadius={"50%"}
                        src={user.profileimage}
                      />
                    </Td>
                    <Td fontSize={12}>{user.password}</Td>
                    <Td fontSize={12}>{user.studentclass}</Td>
                    <Td fontSize={12}>{user.address}</Td>
                    {/* <Td fontSize={12}>{user.dateofbirth}</Td> */}
                    <Td fontSize={12}>{user.parentname}</Td>
                    <Td fontSize={12}>{user.parentcontact}</Td>
                    {/* <Td fontSize={12}>{user.address}</Td> */}
                    <Td fontSize={12}>
                      <Td fontSize={12} display={"flex"} gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          disabled={isAdmin === null || isAdmin !== "true"}
                          onClick={() => deleteStudent(user._id)}
                          icon={<BiTrashAlt />}
                          size="sm"
                        />
                        <IconButton
                          colorScheme="blue"
                          onClick={() => openModal(user._id)}
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

          {/* Profile modal */}
          <StudentProfile
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
