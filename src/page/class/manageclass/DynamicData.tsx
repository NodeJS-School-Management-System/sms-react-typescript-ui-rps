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
  PersonOutlineOutlined,
  Phone,
} from "@mui/icons-material";
import { BiEnvelope } from "react-icons/bi";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../components/auth/axiosInstance";
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

export const Subjects = ({ className }: any) => {
  // GET SUBJECTS FOR THE CLASS SELECTED **************************************************************
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get(`/subject/find/class/Primary Three`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

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
          SUBJECT
        </Box>
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          SUBJECT TEACHER
        </Box>
      </Flex>
      {subjects?.map((sub: any) => (
        <Flex
          py={2}
          borderBottom={"1px solid #aaa"}
          justify={"space-between"}
          w="100%"
          gap={10}
        >
          <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{sub.subjectName}</Box>
          <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
            {sub.subjectTeacher || "N/A"}
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export const Students = ({ className }: any) => {
  // GET STUDENTS BY CLASSNAME FOR THE CLASS SELECTED **************************************************************
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getClass = async () => {
      try {
        const res = await myAPIClient.get(`/students/find/${className}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClass();
  }, [className]);

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
          STUDENT
        </Box>
        <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
          DATE OF BIRTH
        </Box>
      </Flex>
      {students?.map((sub: any) => (
        <Flex
          py={2}
          borderBottom={"1px solid #aaa"}
          justify={"space-between"}
          w="100%"
          gap={10}
        >
          <Box fontSize={{ base: 12, md: 14, lg: 16 }}>
            {sub.firstname} {sub.lastname}
          </Box>
          <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
            {sub.dateofbirth || "N/A"}
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export const Settings = ({ teacher }: any) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("teacherId");
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
      <Button
        disabled={!contact && !username && !address && !email}
        colorScheme={primaryColor.name}
        onClick={updateteacher}
      >
        Update
      </Button>
    </Flex>
  );
};
