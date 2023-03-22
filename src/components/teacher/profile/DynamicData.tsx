import {
  Table,
  Thead,
  Tbody,
  Tr,
  Box,
  Th,
  Flex,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import {
  LocationCity,
  LockOpen,
  PersonOutlineOutlined,
  Phone,
} from "@mui/icons-material";
import { BiEnvelope } from "react-icons/bi";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import { useState } from "react";
export const HomeComp = () => {
  return <Box>Home</Box>;
};

export const Information = ({ teacher }: any) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Member Information</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Td textAlign={"left"}>
              {teacher.firstname} {teacher.lastname}
            </Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>Address</Th>
            <Td>{teacher.address ? teacher.address : "N/A"}</Td>
          </Tr>
          <Tr>
            <Th>Gender</Th>
            <Td>{teacher.gender ? teacher.gender : "N/A"}</Td>
          </Tr>
          <Tr>
            <Th>Department</Th>
            <Td>{teacher.department ? teacher.department : "N/A"}</Td>
          </Tr>
          <Tr>
            <Th>Subject</Th>
            <Td>{teacher.subject ? teacher.subject : "N/A"}</Td>
          </Tr>
          <Tr>
            <Th>Last Login</Th>
            <Td>2022-08-02 12:07:18</Td>
          </Tr>
          <Tr>
            <Th>Last Activity</Th>
            <Td>2022-08-02 12:07:18</Td>
          </Tr>
          <Tr>
            <Th>Last Login Attempt</Th>
            <Td>N/A</Td>
          </Tr>
          <Tr>
            <Th>IPAddress</Th>
            <Td>192.168.14.1</Td>
          </Tr>
          <Tr>
            <Th>Login Attempts</Th>
            <Td>2</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const ChangePassword = ({ teacher }: any) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("teacherId");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const updatePassword = async () => {
    if (
      oldPassword === teacher.password &&
      confirmNewPassword === newPassword
    ) {
      const passwords = {
        newPassword,
      };
      try {
        const res = await myAPIClient.put(`/teacher/${id}`, passwords, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setNewPassword("");
        setOldPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("CHeck passwords and try again");
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <form
      style={{
        display: "flex",
        width: "100%",
        height: "max-content",
        gap: "10",
        flexDirection: "column",
        boxShadow: "2p  2px 2px 2px rgba(0,0,0,0.4",
      }}
    >
      <FormLabel>New Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
      </InputGroup>
      <FormLabel>Confirm New Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
      </InputGroup>
      <FormLabel>Old Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LockOpen />}
        />
        <Input
          isRequired
          type="text"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
      </InputGroup>
      <Button colorScheme={primaryColor.name} mt={4} onClick={updatePassword}>
        Change Password
      </Button>
    </form>
  );
};

export const Settings = ({ teacher }: any) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("teacherId");
  const isAdmin = localStorage.getItem("isAdmin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const updateteacher = async () => {
    const updates = {
      username,
      email,
      contact,
      address,
    };
    try {
      const res = await myAPIClient.put(`/teachers/${id}`, updates, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setAddress("");
      setEmail("");
      setContact("");
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex
      boxShadow={"base"}
      w="100%"
      p={10}
      h="max-content"
      direction={"column"}
      gap={2}
    >
      <FormLabel>Username</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<PersonOutlineOutlined />}
        />
        <Input
          isRequired
          type="text"
          placeholder={teacher.username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Email</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<BiEnvelope />}
        />
        <Input
          isRequired
          type="text"
          placeholder={teacher.email ? teacher.email : ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Contact</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<Phone />}
        />
        <Input
          isRequired
          type="text"
          placeholder={teacher.contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Address</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<LocationCity />}
        />
        <Input
          isRequired
          type="text"
          placeholder={teacher.address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </InputGroup>
      {isAdmin && (
        <Button
          disabled={!contact && !username && !address && !email}
          colorScheme={primaryColor.name}
          onClick={updateteacher}
        >
          Update
        </Button>
      )}
    </Flex>
  );
};
