import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  WrapItem,
  Select,
  Input,
} from "@chakra-ui/react";
import { Diversity3, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdClass } from "react-icons/md";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { StudentList } from "./StudentList";
import useTheme from "../../../theme/useTheme";

export const Students = () => {
  const token = localStorage.getItem("token");

  // DELETE STUDENT FROM STORE **********************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteStudent = async (studentId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`students/${studentId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };

  const [studentlist, setStudentlist] = useState([]);
  const [clas, setClas] = useState("");
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // UPDATE LIST DISPLAYED BY PAGINATION NUMBER
  // const [listNum, setListNum] = useState<any>(undefined);
  // Filter students to display here

  // GET ALL STUDENTS******************************************************************************
  useEffect(() => {
    const getStudents = async () => {
      setIsFetching(true);
      try {
        const res = await myAPIClient.get("/users/students/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStudentlist(res.data);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };

    getStudents();
  }, [clas, isDeleting]);

  //*******************************************************************************************/

  // GET ALL CLASSES
  const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // Filter students by classname************************************************************
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(`/users/students/find/${clas}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        clas && setStudentlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    clas && getStudents();
  }, [clas]);

  const {
    theme: { primaryColor },
  } = useTheme();

  // Filter students with search
  const keys = [
    "firstname",
    "lastname",
    "studentclass",
    "gender",
    "dateofbirth",
    "contact",
    "address",
    "parentname",
    "parentcontact",
  ];

  // FILTER STUDENTS
  const filterStudents = (students: any) => {
    return students?.filter((student: any) => {
      return keys?.some(
        (key: any) =>
          typeof student[key] === "string" &&
          student[key].toLowerCase().includes(query)
      );
    });
  };

  return (
    <>
      <Box>
        <Flex
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justify="space-between"
          h={70}
          p={5}
          my={3}
        >
          <Box display={"flex"}>
            <Heading as={"h5"} color={primaryColor.color}>
              Students
            </Heading>
            <Text>SMS</Text>
          </Box>
          <Box display={"flex"} alignItems="center" gap={2}>
            <Box
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              gap={3}
            >
              <Home style={{ fontSize: 16 }} />
              <Link to="/">
                <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
                  Home
                </Text>
              </Link>
              <FaAngleRight />
            </Box>
            <Diversity3 style={{ fontSize: 16 }} />
            <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
              Student List
            </Text>
          </Box>
        </Flex>

        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            borderRadius={4}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"purple"}
                color={"white"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FaPlay size={"3em"} />
              </Flex>
              <Flex
                p={3}
                w={"70%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Running Session
                </Text>
                <Select placeholder="(2023 - 2024)" size={"lg"}></Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"#465565"}
                color="white"
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size="3em" />
              </Flex>
              <Flex
                p={3}
                w={"70%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Select Class
                </Text>
                <Select
                  placeholder="Select Class"
                  value={clas}
                  onChange={(e) => e.target.value && setClas(e.target.value)}
                  size={"lg"}
                >
                  {classlist.map((c: any) => (
                    <option key={c._id} value={c.classnumeral}>
                      {c.classnumeral}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"base"}
            borderRadius={4}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"row"}
              borderRadius={4}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"#2e5984"}
                color="white"
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size={"3em"} />
              </Flex>
              <Flex
                p={3}
                w={"70%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Select Stream
                </Text>
                <Select placeholder="Select Stream" size={"lg"}>
                  {/* <option value="option1">A</option> */}
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImUsers size={"3em"} color="white" />
              </Flex>
              <Flex
                p={3}
                w={"70%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={20} fontWeight="bold" color={"gray"} mb={3}>
                  Total Students
                </Text>
                <Heading as="h2">{studentlist.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>
      </Box>

      <Flex>
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="flex-end"
          h={70}
          p={5}
          pl={0}
          my={3}
        >
          <Box
            display="flex"
            alignItems={"center"}
            gap={2}
            justifyContent={"flex-end"}
          >
            <Text>Search:</Text>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students.."
            />
          </Box>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <StudentList
            deleteStudent={deleteStudent}
            isFetching={isFetching}
            list={query ? filterStudents(studentlist) : studentlist}
            query={query}
          />
        </Flex>
      </Box>
    </>
  );
};
