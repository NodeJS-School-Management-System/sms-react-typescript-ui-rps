import {
  Box,
  Flex,
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
import { toast } from "react-toastify";
import NewPassword from "../../../components/auth/NewPassword";
export const HomeComp = () => {
  return <Box>Home</Box>;
};

export const Information = ({ student }: any) => {
  return (
    <Flex
      boxShadow={{ base: "none", md: "md" }}
      w="100%"
      p={10}
      direction={"column"}
      gap={2}
      h={400}
      overflowY="auto"
    >
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          NAME
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {student.firstname} {student.lastname}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          ADDRESS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{student.address}</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          CLASS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {student.studentclass}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          GENDER
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{student.gender}</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          TRANSPORT
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {student.transport ? student.transport : "N/A"}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          PARENTNAME
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{student.parentname}</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          HOSTEL
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {student.hostel ? student.hostel : "N/A"}
        </Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          LAST LOGIN
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>N/A</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          IP ADDRESS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>N/A</Box>
      </Flex>
    </Flex>
  );
};

export const ChangePassword = ({ student }: any) => {
  const token = localStorage.getItem("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const updatePassword = async () => {
    if (
      oldPassword === student.password &&
      confirmNewPassword === newPassword
    ) {
      const passwords = {
        password: Number(newPassword),
      };

      try {
        const res = await myAPIClient.put(
          `/users/students/${student._id}}`,
          passwords,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setNewPassword("");
        setOldPassword("");
        setConfirmNewPassword("");
        toast.success("Success, password has been updated!");
      } catch (err) {
        console.log(err);
        toast.error("Check passwords and try again!");
      }
    } else {
      toast.error("Check passwords and try again!");
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
          maxLength={4}
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
          value={confirmNewPassword}
          maxLength={4}
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
          maxLength={4}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
      </InputGroup>
      <Button
        mt={3}
        colorScheme={primaryColor.name}
        disabled={!NewPassword || !oldPassword || !confirmNewPassword}
        onClick={updatePassword}
      >
        Change Password
      </Button>
    </form>
  );
};

export const Settings = ({ student }: any) => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const updateStudent = async () => {
    const updates = {
      username: username || student.username,
      email: email || student.email,
      studentcontact: contact || student.studentcontact,
      address: address || student.address,
    };

    try {
      const res = await myAPIClient.put(
        `/users/students/${student._id}`,
        updates,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setAddress("");
      setEmail("");
      setContact("");
      setUsername("");
      toast.success("Success, student has been updated!");
    } catch (err) {
      console.log(err);
      toast.error("An error occured while running your operation!");
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
          placeholder={student.username}
          onChange={(e) => setUsername(e.target.value)}
          // placeholder="Username"
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
          placeholder={student.email ? student.email : "N/A"}
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
          placeholder={student.studentcontact || "N/A"}
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
          value={address}
          placeholder={student.address || "N/A"}
          onChange={(e) => setAddress(e.target.value)}
        />
      </InputGroup>
      <Button
        disabled={!contact && !username && !address && !email}
        colorScheme={primaryColor.name}
        onClick={updateStudent}
      >
        Update
      </Button>
    </Flex>
  );
};
