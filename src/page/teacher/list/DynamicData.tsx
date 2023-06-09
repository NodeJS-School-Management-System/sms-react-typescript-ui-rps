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
export const HomeComp = () => {
  return <Box>Home</Box>;
};

export const Information = ({ teacher }: any) => {
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
          {teacher?.firstname} {teacher?.lastname}
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
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {teacher?.address?.district}
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
          CLASS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>P.6</Box>
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
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{teacher?.gender}</Box>
      </Flex>
      <Flex
        py={2}
        borderBottom={"1px solid #aaa"}
        justify={"space-between"}
        w="100%"
        gap={10}
      >
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          MARITAL STATUS
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {teacher?.maritalstatus ? teacher?.maritalstatus : "N/A"}
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
          STREAM
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
          CONTACT
        </Box>
        <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
          {teacher?.contact ? teacher?.contact : "N/A"}
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

export const ChangePassword = ({ teacher }: any) => {
  const token = localStorage.getItem("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const updatePassword = async () => {
    if (confirmNewPassword === newPassword) {
      const passwords = {
        newPassword,
      };
      try {
        const res = await myAPIClient.put(
          `/users/teachers/update/${teacher._id}`,
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
        toast.success("Success, your password has been updated!");
      } catch (err) {
        console.log(err);
        toast.error("Error updating your password!");
      }
    } else {
      toast.error("Check passwords and try again");
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
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
      </InputGroup>
      <Button
        colorScheme={primaryColor.name}
        disabled={!oldPassword || !newPassword || !confirmNewPassword}
        mt={4}
        onClick={updatePassword}
      >
        Change Password
      </Button>
    </form>
  );
};

export const Settings = ({ teacher }: any) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const updateteacher = async () => {
    const updates = {
      username: username || teacher.username,
      email: email || teacher.email,
      contact: contact || teacher.contact,
      dateofbirth: address || teacher.dateofbirth,
    };
    try {
      const res = await myAPIClient.put(
        `/users/teachers/update/${teacher._id}`,
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
      toast.success("Success, teacher has been updated!");
    } catch (err) {
      console.log(err);
      toast.error("Error updating teacher's details!");
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
          value={username}
          placeholder={teacher?.username}
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
          value={email}
          placeholder={teacher?.email ? teacher?.email : ""}
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
          value={contact}
          placeholder={teacher?.contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Date of Birth</FormLabel>
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
          value={address}
          type="date"
          placeholder={teacher?.dateofbirth}
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
