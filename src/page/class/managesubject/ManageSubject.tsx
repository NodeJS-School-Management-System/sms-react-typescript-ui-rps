import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Heading,
  Input,
  // useDisclosure,
} from "@chakra-ui/react";
import { Home, SubjectOutlined } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { SubjectList } from "./SubjectList";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const ManageSubject = () => {
  const token = localStorage.getItem("token");
  const [subjectName, setSubjectName] = useState("");
  const [subjectAbbrev, setSubjectAbbrev] = useState("");
  const [subjectTeacher, setSubjectTeacher] = useState("");
  const [subjectlist, setSubjectlist] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [classUpdate, setClassUpdate] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [classlist, setClasslist] = useState([]);

  // Get all teachers****************************************************************
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/teachers", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  // GET SUBJECT BY SUBJECTNAME *******************************************
  const [targetSubject, setTargetSubject] = useState<any>([]);
  useEffect(() => {
    const getSubject = async () => {
      try {
        const res = await myAPIClient.get(`/subject/find/${selectedSubject}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setTargetSubject(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubject();
  }, [selectedSubject]);

  // UPDATE SUBJECT BY ID ***************************************************************
  const updateSubject = async () => {
    try {
      const updatedSubject = {
        subjectName: selectedSubject,
        subjectTeacher,
        className: classUpdate,
      };
      const res = await myAPIClient.put(
        `/subject/${targetSubject.subjectId}`,
        updatedSubject,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setClassTeacher("");
      setClassUpdate("");
      setSelectedSubject("");
    } catch (err) {
      console.log(err);
    }
  };

  // Get all teachers ***************************************************************
  // const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // DELETE SUBJECT *************************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteSubject = async (id: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`/subject/${id}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      setIsDeleting(false);
      console.log(err);
    }
  };

  // Get all subjects **************************************************************************
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subject", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setSubjectlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, [isDeleting]);

  // Add a new classroom
  const addSubject = async () => {
    const newSubject = {
      subjectName,
      subjectAbbrev,
      subjectTeacher,
      // className,
    };
    try {
      await myAPIClient.post("/subject", newSubject, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setSubjectTeacher("");
      setSubjectAbbrev("");
      setSubjectName("");
      // setClassName("");
    } catch (err) {
      console.log(err);
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        h={70}
        p={5}
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 30, lg: 35 }}
            color={primaryColor.color}
          >
            Manage Subjects
          </Heading>
          <Text fontSize={{ base: 12, lg: 16 }}>SMS</Text>
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
          <SubjectOutlined style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Manage Subjects
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          {/* ADD SUBJECT AND ASIGN IT A TEACHER */}
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              pb={4}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={22}
                    fontWeight="bold"
                  >
                    Add Subject
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
                <Flex
                  p={3}
                  w={"100%"}
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
                    Subject Name
                  </Text>
                  <Input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder={"Subject Name"}
                    w={"100%"}
                  />
                </Flex>
                <Flex
                  p={3}
                  w={"100%"}
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
                    Subject Shorthand
                  </Text>
                  <Input
                    type="text"
                    value={subjectAbbrev}
                    onChange={(e) => setSubjectAbbrev(e.target.value)}
                    placeholder={"Subject Shorthand"}
                    w={"100%"}
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={primaryColor.name}
                  onClick={addSubject}
                  disabled={!subjectName || !subjectAbbrev}
                >
                  Add Subject
                </Button>
              </Box>
            </Center>
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              pb={4}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    textAlign="center"
                    fontSize={22}
                    color={"white"}
                    fontWeight="bold"
                  >
                    Assign Subject Teacher
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
                <Flex
                  p={3}
                  w={"100%"}
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
                    value={classUpdate}
                    placeholder={"Select Class"}
                    onChange={(e) => {
                      setClassUpdate(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classlist?.map((c: any) => (
                      <option key={c.classroomId} value={c.className}>
                        {c.className}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  w={"100%"}
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
                    Select Subject
                  </Text>
                  <Select
                    value={selectedSubject}
                    placeholder="Select Subject"
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedSubject(e.target.value);
                      }
                    }}
                  >
                    {subjectlist.map((option: any) => (
                      <option key={option.subjectId} value={option.subjectName}>
                        {option.subjectName}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  w={"100%"}
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
                    Select Teacher
                  </Text>
                  <Select
                    value={classTeacher}
                    placeholder="Select Teacher"
                    onChange={(e) => {
                      if (e.target.value) {
                        setClassTeacher(e.target.value);
                      }
                    }}
                  >
                    {teacher.map((option: any) => (
                      <option key={option.teacherId} value={option.firstname}>
                        {option.firstname}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={primaryColor.name}
                  onClick={updateSubject}
                  disabled={!classUpdate || !classTeacher || !selectedSubject}
                >
                  Assign Teacher
                </Button>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              height="auto"
              w="90%"
              h="100%"
            >
              <SubjectList deleteSubject={deleteSubject} list={subjectlist} />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
