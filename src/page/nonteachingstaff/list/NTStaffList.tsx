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
// import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import MemberProfile from "./MemberProfile";
// import TeacherProfile from "./TeacherProfile";
// import StudentProfile from "./StudentProfile";
export const NTStaffList = ({
  list,
  query,
  deleteMember,
  isDeleting,
  isFetching,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedId, setClickedId] = useState("");

  const openModal = (id: any) => {
    setClickedId(id);
    onOpen();
  };

  return (
    <>
      {isDeleting || isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Non Teachingstaff List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12}>Full Name</Th>
                <Th fontSize={12}>Profile Image</Th>
                <Th fontSize={12}>username</Th>
                <Th fontSize={12}>Department</Th>
                <Th fontSize={12}>Role</Th>
                <Th fontSize={12}>Date of Birth</Th>
                <Th fontSize={12}>Contact</Th>
                <Th fontSize={12}>Address</Th>
                <Th fontSize={12} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((user: any) => (
                  <Tr key={user.teacherId}>
                    <Td fontSize={12}>
                      {user.firstname} {user.lastname}
                    </Td>
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
                    <Td fontSize={12}>{user.username}</Td>
                    <Td fontSize={12}>{user.department}</Td>
                    <Td fontSize={12}>{user.role}</Td>
                    <Td fontSize={12}>{user.dateofbirth}</Td>
                    <Td fontSize={12}>{user.contact}</Td>
                    <Td fontSize={12}>{user?.address?.village}</Td>
                    <Td fontSize={12}>
                      <Td fontSize={12} display={"flex"} gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => deleteMember(user._id)}
                          icon={<BiTrashAlt />}
                        />
                        <IconButton
                          colorScheme="blue"
                          onClick={() => openModal(user._id)}
                          aria-label="Edit database"
                          icon={<BsEye />}
                        />
                      </Td>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>

          {/* profile modal */}
          <MemberProfile
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
