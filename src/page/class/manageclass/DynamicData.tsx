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
  Select,
  CircularProgress,
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

export const Subjects = ({ classroom }: any) => {
  // GET SUBJECTS FOR THE CLASS SELECTED **************************************************************
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get(`/subjects/findall`, {
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
          <Box fontSize={{ base: 10, md: 12, lg: 15 }}>{sub.subjectname}</Box>
          <Box fontSize={{ base: 10, md: 12, lg: 15 }}>
            {sub.subjectteacher || "N/A"}
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export const Students = ({ classroom }: any) => {
  // GET STUDENTS BY CLASSNAME FOR THE CLASS SELECTED **************************************************************
  const [students, setStudents] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getClass = async () => {
      setIsFetching(true);
      try {
        const res = await myAPIClient.get(
          `/users/students/find/${classroom.classnumeral}`,
          {
            headers: {
              token: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudents(res.data);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };
    getClass();
  }, [classroom.classnumeral]);

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
      {isFetching ? (
        <Flex align={"center"} justify="center">
          <CircularProgress isIndeterminate color="teal" size="24px" />
        </Flex>
      ) : (
        students?.map((sub: any) => (
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
        ))
      )}
    </Flex>
  );
};

export const Settings = ({ classroom, setRefetch }: any) => {
  const token = localStorage.getItem("token");

  const [numberofstreams, setNumberofstreams] = useState("");
  const [classnumeral, setClassnumeral] = useState("");
  const [classname, setClassname] = useState("");
  const [updating, setUpdating] = useState(false);
  const updateClass = async () => {
    setUpdating(true);
    try {
      await myAPIClient.put(
        `/classrooms/update/${classroom._id}`,
        {
          number_of_streams: numberofstreams,
          classname: classname || classroom.classname,
          classnumeral: classnumeral || classroom.classnumeral,
        },

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setRefetch(true);
      setUpdating(false);
      setNumberofstreams("");
      setClassname("");
      setClassnumeral("");
      toast.success("Success, class has been updated!");
    } catch (err) {
      console.log(err);
      setUpdating(false);
      toast.error("An error occured while processing your request!");
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
          value={classname}
          placeholder={classroom.classname || "N/A"}
          onChange={(e) => setClassname(e.target.value)}
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
          value={classnumeral}
          placeholder={classroom.classnumeral || "N/A"}
          onChange={(e) => setClassnumeral(e.target.value)}
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
          placeholder={classroom.classteacher || "N/A"}
          disabled
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
          value={numberofstreams}
          onChange={(e) => setNumberofstreams(e.target.value)}
        />
      </InputGroup>
      <Button
        disabled={!numberofstreams && !classname && !classnumeral}
        bgColor={primaryColor.color}
        color="white"
        onClick={updateClass}
      >
        {updating ? "Updating.." : "Update"}
      </Button>
    </Flex>
  );
};

export const Attendence = ({ classroom }: any) => {
  // GET STUDENTS BY CLASSNAME FOR THE CLASS SELECTED **************************************************************
  const [students, setStudents] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const getStudents = async () => {
      setIsFetching(true);
      try {
        const res = await myAPIClient.get(
          `/users/students/find/${classroom?.classnumeral}`,
          {
            headers: {
              token: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsFetching(false);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };
    getStudents();
  }, [classroom?.classnumeral]);

  const {
    theme: { primaryColor },
  } = useTheme();

  // TODAY
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  // DAY OF THE WEEK
  // Create a new Date object
  let currentDate = new Date();

  // Get the day of the week (0-6)
  let dayOfWeek = currentDate.getDay();

  // Define an array with the names of the days
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the name of the day based on the index
  let dayName = daysOfWeek[dayOfWeek];

  // TIME FROM AND TO
  const [timefrom, setTimefrom] = useState("");
  const [timeto, setTimeto] = useState("");
  const [subject, setSubject] = useState("");

  // SUBJECTS
  // Get all subjects **************************************************************************
  const [subjectlist, setSubjectlist] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subjects/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSubjectlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

  // TEACHERS
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  // HANDLE CHANGE ON AN INPUT(CHECKBOX)

  // const [checkedStudents, setCheckedStudents] = useState<any>([]);

  const handleCheckboxChange = async (studentId: any, checked: boolean) => {
    if (checked) {
      // setCheckedStudents((prevCheckedStudents: any) => [
      //   ...prevCheckedStudents,
      //   studentId,
      // ]);
      try {
        const attendanceObject = {
          subject,
          date: formattedDate,
          time: `${timefrom} - ${timeto}`,
          hasAttended: true,
        };

        await myAPIClient.put(
          `/classrooms/students/attendence/${studentId}`,
          attendanceObject,
          {
            headers: {
              token: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(`Attendance for student ${studentId} updated successfully`);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Remove the studentId from the checkedStudents array
      // setCheckedStudents((prevCheckedStudents: any) =>
      //   prevCheckedStudents.filter((id: any) => id !== studentId)
      // );
    }
  };

  // HANDLE SUBMIT ATTEDNENCE
  const [saving, setSaving] = useState(false);
  const handleSubmitAttendence = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Send POST request to backend route
      const response = await myAPIClient.put(
        `/classrooms/attendence/${classroom._id}`,
        {
          timeto,
          timefrom,
          subjectname: subject,
          teachername: teacher,
          date: formattedDate,
          day: dayName,
        }
      );
      // Display success message or handle any other logic
      console.log(response.data.message);
      setSaving(false);
      setSubject("");
      setTimeto("");
      setTimefrom("");
      setTeacher("");
      toast.success(`Success! attendence has been captured!`);
    } catch (error) {
      // Display error message or handle error
      console.error(error);
      setSaving(false);
      toast.error(`Error capturing attendence!`);
    }
  };

  return (
    <Flex flexDir={"column"}>
      <Flex
        w="100%"
        gap={2}
        flexDir={"column"}
        alignItems="center"
        justify={"center"}
      >
        <Box fontSize={13}>
          {dayName}: {formattedDate}
        </Box>
        <Box fontSize={13}>No of Students: {students.length}</Box>

        <Flex gap={2}>
          <Select
            w="50%"
            placeholder="Select Subject"
            value={subject}
            fontSize={13}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectlist?.map((subject: any) => (
              <option
                style={{ fontSize: 13 }}
                key={subject._id}
                value={subject.subjectname}
              >
                {subject.subjectname}
              </option>
            ))}
          </Select>

          <Select
            w="50%"
            placeholder="Select Teacher"
            value={teacher}
            fontSize={13}
            onChange={(e) => setTeacher(e.target.value)}
          >
            {teachers?.map((teacher: any) => (
              <option
                style={{ fontSize: 13 }}
                key={teacher._id}
                value={teacher.fullname}
              >
                {teacher.fullname}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex gap={2}>
          <Flex
            w="50%"
            alignItems={"center"}
            flexDir={{ base: "column", md: "row" }}
          >
            <Box flex={1} fontSize={13}>
              Time From:
            </Box>
            <Input
              flex={1}
              value={timefrom}
              fontSize={13}
              onChange={(e) => setTimefrom(e.target.value)}
              type="time"
            />
          </Flex>
          <Flex
            w="50%"
            alignItems={"center"}
            flexDir={{ base: "column", md: "row" }}
          >
            <Box flex={1} fontSize={13}>
              Time From:
            </Box>
            <Input
              flex={1}
              value={timeto}
              fontSize={13}
              onChange={(e) => setTimeto(e.target.value)}
              type="time"
            />
          </Flex>
        </Flex>
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
        {isFetching ? (
          <Flex align={"center"} justify="center">
            <CircularProgress isIndeterminate color="teal" size="24px" />
          </Flex>
        ) : (
          students.map((student: any) => (
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
                  disabled={!teacher || !timefrom || !timeto || !subject}
                  // checked={checkedStudents.includes(student.studentId)}
                  onChange={(e) =>
                    handleCheckboxChange(student._id, e.target.checked)
                  }
                  type="checkbox"
                />
              </Box>
            </Flex>
          ))
        )}
      </Flex>
      <Button
        onClick={handleSubmitAttendence}
        backgroundColor={primaryColor.color}
        color="white"
        disabled={!teacher || !timefrom || !timeto || !subject}
      >
        {saving ? "Saving.." : "Save"}
      </Button>
    </Flex>
  );
};
