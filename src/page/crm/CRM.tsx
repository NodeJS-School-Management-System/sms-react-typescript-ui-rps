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
import {
  AttachMoney,
  CalendarMonth,
  CalendarViewMonthRounded,
  Class,
  Dashboard,
  LocalLibrary,
  Note,
} from "@mui/icons-material";
import { RiUserShared2Fill } from "react-icons/ri";
import { Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../components/auth/axiosInstance";
import useTheme from "../../theme/useTheme";
import AnalyticsBox from "../../components/uicomponents/AnalyticsBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRM = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  // PRIMARY COLOR FROM GLOABL THEME ************************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

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
  }, [exams]);

  // GET ALL STUDENTS IN SCHOOL*******************************************************************
  const [studentlist, setStudentlist] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/users/students/all", {
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
        const res = await myAPIClient.get("/users/teachers/all", {
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
        const res = await myAPIClient.get("/classrooms/findall", {
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
  // Get all SYLABUS
  const [sylabus, setSylabus] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/sylabus/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setSylabus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // GET ALL LIB BOOKS **************************************************************************
  // const [books, setBooks] = useState([]);
  // useEffect(() => {
  //   const getBooks = async () => {
  //     try {
  //       const res = await myAPIClient.get("/library", {
  //         headers: {
  //           token: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       console.log(res.data);
  //       setBooks(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getBooks();
  // }, []);

  // GET income ITEMS FROM DB ****************************************************************
  const [incomeItems, setincomeItems] = useState([]);
  useEffect(() => {
    const getincome = async () => {
      try {
        const res = await myAPIClient.get("/income", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setincomeItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getincome();
  }, []);

  // UPDATE LIST OF DETAILS *****************************
  const amountCollected = incomeItems.reduce(
    (total: any, item: any) => total + item.amount,
    0
  );

  const homeAnalyticsRowOne = [
    {
      title: "Total Students",
      value: studentlist.length,
      icon: CalendarViewMonthRounded,
      bgColor: "#2e5984",
    },
    {
      title: "Total Teachers",
      value: teachers.length,
      icon: RiUserShared2Fill,
      bgColor: "orange",
    },
    {
      title: "Classes",
      value: classes.length,
      icon: Class,
      bgColor: "darkblue",
    },
  ];

  const homeAnalyticsRowTwo = [
    {
      title: "Today's Attendence",
      value: studentlist.length,
      icon: CalendarMonth,
      bgColor: "#586744",
    },
    {
      title: "Exams",
      value: exams.length,
      icon: Note,
      bgColor: "#f65b99",
    },
    {
      title: "Study Materials",
      value: sylabus.length,
      icon: LocalLibrary,
      bgColor: "teal",
    },
    {
      title: "Gross Amount",
      value: amountCollected,
      icon: AttachMoney,
      bgColor: "purple",
    },
  ];

  // ****************************************************************************************

  // SEND NEW MESSAGE ***********************************************************************
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.post(
        "/message",
        {
          title,
          senderId: localStorage.getItem("id"),
          receiverName,
          message,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setLoading(false);
      setMessage("");
      setReceiverName("");
      setTitle("");
      toast.success("Message sent successfully!");
    } catch (err) {
      console.log(err);

      setLoading(false);
      toast.error(
        "Error, something went wrong sending your message, try again!"
      );
    }
  };

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
            <Home style={{ fontSize: 16 }} />
            <Link to="/">
              <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
                Home
              </Text>
            </Link>
            <FaAngleRight />
            <Dashboard style={{ fontSize: 16 }} />
            <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
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
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"#1999d1"}
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

          {homeAnalyticsRowOne.map((item: any) => (
            <AnalyticsBox item={item} value={studentlist} />
          ))}
        </Flex>

        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          {homeAnalyticsRowTwo.map((item: any) => (
            <AnalyticsBox item={item} />
          ))}
        </Flex>

        <Flex boxShadow={"lg"} flexDir={{ base: "column", lg: "row" }}>
          <Box boxShadow={"lg"} m={2} flex={1}>
            <WrapItem
              flex={1}
              gap={6}
              flexDirection={"column"}
              h={"max-content"}
              color="white"
            >
              <Button
                py={7}
                fontSize={22}
                cursor="auto"
                bgColor={primaryColor.color}
                w={"100%"}
              >
                Quick Mail
              </Button>

              <Box w={"100%"}>
                <Flex
                  p={3}
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
                    Message To: <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={receiverName}
                    color="black"
                    onChange={(e) => setReceiverName(e.target.value)}
                    type="text"
                    placeholder="Receiver"
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Title <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={title}
                    color="black"
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Subject"
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Body <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Textarea
                    value={message}
                    color="black"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Body"
                  ></Textarea>
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  mb={2}
                  onClick={sendMessage}
                  bgColor={primaryColor.color}
                  color="white"
                  isDisabled={!message || !title || !receiverName}
                >
                  {loading ? "Sending.." : "Send Message"}
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
                w={"100%"}
                h={"110px"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                {isAdmin && (
                  <Heading color="white">
                    {localStorage.getItem("firstname")}{" "}
                    {localStorage.getItem("lastname")}{" "}
                  </Heading>
                )}
                <strong style={{ color: "white" }}>Admin</strong>
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
                <Link to="/storemanager/managestore/">
                  <Heading ml={3} fontSize={20}>
                    Store Manager
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
