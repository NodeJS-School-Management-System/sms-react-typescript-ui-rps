import {
  AttachMoney,
  CalendarMonth,
  Class,
  LocalLibrary,
  Note,
  School,
  SupervisedUserCircle,
} from "@mui/icons-material";
import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  WrapItem,
  Select,
  Input,
  Button,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../components/auth/axiosInstance";
import useTheme from "../../theme/useTheme";

const CRM = () => {
  const token = localStorage.getItem("token");

  // GET ALL EXAMS *******************************************************************************
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get("/exams", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setExams(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getExams();
  }, []);

  // GET ALL STUDENTS IN SCHOOL*******************************************************************
  const [studentlist, setStudentlist] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/students", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStudentlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, []);

  // ****************************************************************************************

  // GET ALL TEACHERS IN SCHOOL************************************************************
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/teachers", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTeachers();
  }, []);

  // ****************************************************************************************

  // Get all classNames
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // ****************************************************************************************

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex direction="column" style={{ width: "100%" }}>
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
              Home
            </Heading>
            <Text>SMS</Text>
          </Box>
          <Box display={"flex"} alignItems="center" gap={2}>
            <Home />
            <Link to="/">
              <Text fontWeight="bold" fontSize={14}>
                Home
              </Text>
            </Link>
            <FaAngleRight />
            {/* <Diversity3 /> */}
            <Text fontWeight="bold" fontSize={14}>
              Dashboard
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
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"#2e5984"}
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
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <School style={{ color: "white", fontSize: 60 }} />
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

          {/* Teachers ********************* */}
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={primaryColor.name}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <SupervisedUserCircle
                  style={{ color: "white", fontSize: 60 }}
                />
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
                  Total Teachers
                </Text>
                <Heading as="h2">{teachers.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>

          {/* Classes ***************************************** */}
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"tomato"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Class style={{ color: "white", fontSize: 60 }} />
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
                  Classes
                </Text>
                <Heading as="h2">{classes.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          {/* Attendence *************************************/}
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CalendarMonth style={{ color: "white", fontSize: 60 }} />
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
                  Today's Attendence
                </Text>
                <Heading as="h2">{studentlist.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>

          {/* Exams **************************************** */}
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={primaryColor.name}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Note style={{ color: "white", fontSize: 60 }} />
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
                  Exams
                </Text>
                <Heading as="h2">{exams.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>

          {/* Attendence ********************************************** */}
          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <LocalLibrary style={{ color: "white", fontSize: 60 }} />
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
                  STUDY MATERIALS
                </Text>
                <Heading as="h2">8</Heading>
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
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <AttachMoney style={{ color: "white", fontSize: 60 }} />
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
                  FEES COLLECTED
                </Text>
                <Box fontSize={30} fontWeight={500}>
                  34,000,000/=
                </Box>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>

        <Flex boxShadow={"lg"}>
          <Box boxShadow={"lg"} m={2} flex={1}>
            <WrapItem
              flex={1}
              gap={6}
              flexDirection={"column"}
              h={"max-content"}
              // w={{ base: "100%", md: "50%", lg: "50%" }}
            >
              <Button colorScheme={"teal"} w={"100%"}>
                Quick Mail
              </Button>

              <Box w={"100%"}>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Message To:
                  </FormLabel>
                  <Input type="text" placeholder="Receiver" />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Title
                  </FormLabel>
                  <Input type="text" placeholder="Subject" />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Body
                  </FormLabel>
                  <Textarea placeholder="Body"></Textarea>
                </Flex>

                <Button variant={"solid"} w="50%" mx={3} colorScheme={"teal"}>
                  Send
                </Button>
              </Box>
            </WrapItem>
          </Box>

          <Box boxShadow={"lg"} m={2} flex={1}>
            <WrapItem
              // boxShadow={"lg"}
              flex={1}
              gap={2}
              borderRadius={4}
              flexDirection={"column"}
              // w={{ base: "100%", md: "50%", lg: "50%" }}
            >
              <Flex
                bgColor={"#2e5984"}
                color={"white"}
                w={"100%"}
                h={"110px"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Heading>Abeine Vicent</Heading>
                <strong>Admin</strong>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                bg={"#eee"}
              >
                <Link to="/classroom/managesyllabus/">
                  <Heading ml={3} fontSize={20}>
                    Syllabus
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                // bg={"#eee"}
              >
                <Link to="/library/manage/">
                  <Heading ml={3} fontSize={20}>
                    Library
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                bg={"#eee"}
              >
                <Link to="/examsection/manageexam/">
                  <Heading ml={3} fontSize={20}>
                    Examination Result
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                // bg={"#eee"}
              >
                <Link to="/accountingsection/managefees/">
                  <Heading ml={3} fontSize={20}>
                    Accounting System
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                bg={"#eee"}
              >
                <Link to="/noticeboard/view/">
                  <Heading ml={3} fontSize={20}>
                    Notice Board
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                // bg={"#eee"}
              >
                <Link to="/classroom/managesubjects/">
                  <Heading ml={3} fontSize={20}>
                    Subject Management
                  </Heading>
                </Link>
              </Flex>
              <Flex
                w={"100%"}
                h={"40px"}
                justifyContent={"center"}
                flexDirection={"column"}
                bg={"#eee"}
              >
                <Link to="/classroom/manageclass/">
                  <Heading ml={3} fontSize={20}>
                    Class Management
                  </Heading>
                </Link>
              </Flex>
            </WrapItem>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
export default CRM;
