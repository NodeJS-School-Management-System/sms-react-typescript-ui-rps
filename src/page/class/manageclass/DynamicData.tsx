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
import { Class, LocationCity } from "@mui/icons-material";
import { BiUser } from "react-icons/bi";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const Settings = ({ className }: any) => {
  // const token = localStorage.getItem("token");

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
      <FormLabel>Class Name</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<Class />}
        />
        <Input
          isRequired
          type="text"
          placeholder={"Class Name"}
          // onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Class Numeral</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<Class />}
        />
        <Input
          isRequired
          type="text"
          placeholder={"Class Numeral"}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Class Teacher</FormLabel>
      <InputGroup>
        <InputLeftElement
          cursor={"pointer"}
          pointerEvents="none"
          color="gray.400"
          width="2.5rem"
          children={<BiUser />}
        />
        <Input
          isRequired
          type="text"
          placeholder={"Class Teacher"}
          // onChange={(e) => setContact(e.target.value)}
        />
      </InputGroup>
      <FormLabel>Number of Streams</FormLabel>
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
          placeholder={"Number of streams"}
          // onChange={(e) => setAddress(e.target.value)}
        />
      </InputGroup>
      <Button
        // disabled={!contact && !username && !address && !email}
        bgColor={primaryColor.color}
        color="white"
        // onClick={updateteacher}
      >
        Update
      </Button>
    </Flex>
  );
};

export const Attendence = ({ className }: any) => {
  // GET STUDENTS BY CLASSNAME FOR THE CLASS SELECTED **************************************************************
  const [students, setStudents] = useState<any>([]);

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
  const {
    theme: { primaryColor },
  } = useTheme();

  // const handleAttendanceChange = (studentId: any, isChecked: any) => {
  //   setStudents((prevStudents: any) => {
  //     return prevStudents.map((student: any) => {
  //       if (student.studentId === studentId) {
  //         return { ...student, attendance: isChecked };
  //       }
  //       return student;
  //     });
  //   });
  // };

  const handleAttendanceChange = (index: any, e: any) => {
    const updatedStudents = students.map((student: any, i: any) => {
      if (i === index) {
        return {
          ...student,
          attendance: e.target.checked,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const handleSaveAttendance = async () => {
    // Make API call to update attendance for all students
    try {
      const res = await myAPIClient.put(
        "/students/update/studentsinaclass/update-attendance",
        students
      );
      console.log(res.data);
      toast.success(`Success! Students have been updated!`);
    } catch (err) {
      console.error("Error updating attendance:", err);
      toast.error(`Error updating students!`);
    }
  };

  // TODAY
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <Flex flexDir={"column"}>
      <Flex flexDir={"column"} alignItems="center" justify={"center"}>
        <Box>Today: {formattedDate}</Box>
        <Box>No of Students: {students.length}</Box>
      </Flex>
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
            STUDENT NAME
          </Box>
          <Box fontWeight={"bold"} fontSize={{ base: 10, md: 12, lg: 15 }}>
            STATUS
          </Box>
        </Flex>
        {students.map((student: any) => (
          <Flex
            py={2}
            borderBottom={"1px solid #aaa"}
            justify={"space-between"}
            w="100%"
            gap={10}
            key={student.studentId}
          >
            <Box fontSize={{ base: 12, md: 14, lg: 16 }}>
              {student.firstname} {student.lastname}
            </Box>
            <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
              <input
                checked={student.attendance}
                onChange={(e) =>
                  handleAttendanceChange(student.studentId, e.target.checked)
                }
                type="checkbox"
              />
            </Box>
          </Flex>
        ))}
      </Flex>
      <Button
        onClick={handleSaveAttendance}
        backgroundColor={primaryColor.color}
        color="white"
      >
        Save
      </Button>
    </Flex>
  );
};
