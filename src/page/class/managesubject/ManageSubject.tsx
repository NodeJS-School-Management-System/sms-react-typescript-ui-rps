import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Heading,
  Input,
  // useDisclosure,
} from "@chakra-ui/react";
import { Home, SubjectOutlined } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { SubjectList } from "./SubjectList";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const ManageSubject = () => {
  const token = localStorage.getItem("token");
  const [subjectName, setSubjectName] = useState("");
  const [subjectAbbrev, setSubjectAbbrev] = useState("");
  // const [subjectTeacher, setSubjectTeacher] = useState("");
  const [subjectlist, setSubjectlist] = useState([]);
  // const [teacher, setTeacher] = useState([]);
  // const [classUpdate, setClassUpdate] = useState("");
  // const [classTeacher, setClassTeacher] = useState("");
  // const [selectedSubject, setSelectedSubject] = useState("");
  // const [classlist, setClasslist] = useState([]);
  const [refetching, setRefetching] = useState(false);

  // Get all teachers****************************************************************
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        // setTeacher(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  // GET SUBJECT BY SUBJECTNAME *******************************************
  // const [targetSubject, setTargetSubject] = useState<any>({});
  // useEffect(() => {
  //   const getSubject = async () => {
  //     try {
  //       const res = await myAPIClient.get(`/subjects/find/${selectedSubject}`, {
  //         headers: {
  //           token: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(res.data);
  //       // setTargetSubject(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getSubject();
  // }, [selectedSubject]);

  // UPDATE SUBJECT BY ID ***************************************************************
  // const updateSubject = async () => {
  //   try {
  //     const updatedSubject = {
  //       subjectteacher: subjectTeacher,
  //       classname: classUpdate,
  //     };
  //     const res = await myAPIClient.put(
  //       `/subjects/assignteacher/${targetSubject._id}`,
  //       updatedSubject,
  //       {
  //         headers: {
  //           token: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     setRefetching(!refetching);
  //     toast.success("Success, subject teacher has been assigned!");
  //     setClassTeacher("");
  //     setClassUpdate("");
  //     setSelectedSubject("");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(
  //       "Sorry, something went wrong assigning subject teacher, try again or contact admin!"
  //     );
  //   }
  // };

  // Get all classes ***************************************************************
  // const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        // setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // DELETE SUBJECT *************************************************************

  const deleteSubject = async (id: any) => {
    try {
      const res = await myAPIClient.delete(`/subjects/remove/${id}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setRefetching(!refetching);
    } catch (err) {
      toast.error("Sorry, something went wrong deleting subject!");

      console.log(err);
    }
  };

  // Get all subjects **************************************************************************
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subjects/findall", {
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
  }, [refetching]);

  // Add a new classroom
  const addSubject = async () => {
    const newSubject = {
      subjectname: subjectName,
      subjectshorthand: subjectAbbrev,
    };
    try {
      const res = await myAPIClient.post("/subjects/create", newSubject, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setRefetching(!refetching);
      toast.success("Success, subject has been added!");
      // setSubjectTeacher("");
      setSubjectAbbrev("");
      setSubjectName("");
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong adding subject!");
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
                    fontSize={16}
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
                    fontSize={16}
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
                    fontSize={16}
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

            {/* <Center
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
                      <option key={c._id} value={c.classnumeral}>
                        {c.classnumeral}
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
                      } else {
                        console.log("no sb");
                      }
                    }}
                  >
                    {subjectlist.map((option: any) => (
                      <option key={option._id} value={option.subjectname}>
                        {option.subjectname}
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
                      <option
                        key={option._id}
                        value={`${option.firstname} ${option.lastname}`}
                      >
                        {option.firstname} {option.lastname}
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
            </Center> */}
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
