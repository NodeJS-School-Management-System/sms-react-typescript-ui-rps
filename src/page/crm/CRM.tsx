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
  CircularProgress,
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
        const res = await myAPIClient.get("/exams/findall", {
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

  // const sendMessage = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await myAPIClient.post(
  //       "/message",
  //       {
  //         title,
  //         senderId: localStorage.getItem("id"),
  //         receiverName,
  //         message,
  //       },
  //       {
  //         headers: {
  //           token: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     setLoading(false);
  //     setMessage("");
  //     setReceiverName("");
  //     setTitle("");
  //     toast.success("Message sent successfully!");
  //   } catch (err) {
  //     console.log(err);

  //     setLoading(false);
  //     toast.error(
  //       "Error, something went wrong sending your message, try again!"
  //     );
  //   }
  // };

  // MESSAGING SECTION **********************************************************
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [receiver_fullname, setReceiverFullname] = useState("");

  // GET CONVERSATIONS OF THE LOGGED IN USER ***********************************************
  const userId = localStorage.getItem("id");
  const [user, setUser] = useState<any>({});

  const getUser = async () => {
    try {
      const res = await myAPIClient.get(`/users/getuserbyid/${userId}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    console.log(userId);
  }, [userId]);

  // ****************************************************************************************

  // GET MEMBERS' PAYMENTS
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await myAPIClient.get("/users/members/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, []);

  // GET ADMINS' PAYMENTS
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await myAPIClient.get("/users/admins/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setAdmins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdmins();
  }, []);

  const employees = [...teachers, ...members, ...admins];

  // SEND MESSAGE
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    setIsSending(true);
    try {
      await myAPIClient.post(
        "/messages/newmessage",
        {
          receiver_fullname,
          senderId: userId,
          sender_fullname: `${user?.firstname} ${user?.lastname}`,
          messagebody: body,
          title,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setIsSending(false);
      setBody("");
      setTitle("");
      setReceiverFullname("");
      toast.success("Message sent successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
      setIsSending(false);
    }
  };


  // ****************************************************************************************

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
             
            >
              <Box
                backgroundColor={primaryColor.color}
                px={5}
                py={3}
                display="flex"
                color="white"
                alignItems={"center"}
                justifyContent="center"
                w={"100%"}
              >
                Compose
              </Box>
              <Center
                flexDirection={"column"}
                boxShadow={"lg"}
                w="100%"
                borderRadius={2}
                pb={4}
                // borderTop={`3px solid ${primaryColor.color}`}
                height="auto"
                h="100%"
              >
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
                      Message To:
                    </FormLabel>
                    <Select
                      placeholder="Select User"
                      value={receiver_fullname}
                      onChange={(e) => setReceiverFullname(e.target.value)}
                      w={"100%"}
                    >
                      {employees?.map((c: any) => (
                        <option
                          key={c._id}
                          value={`${c.firstname} ${c.lastname}`}
                        >
                          {c.username}
                          <span style={{ fontSize: 12 }}>
                            {" "}
                            (
                            {c.isMember
                              ? c.role
                              : c.isTeacher
                              ? c.designation
                              : "admin"}
                            )
                          </span>
                        </option>
                      ))}
                    </Select>
                  </Flex>
                  <Flex
                    p={3}
                    // bg={"white"}
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
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Subject"
                    />
                  </Flex>
                  <Flex
                    p={3}
                    // bg={"white"}
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
                    <Textarea
                      placeholder="Body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></Textarea>
                  </Flex>

                  <Button
                    variant={"solid"}
                    w="50%"
                    mx={3}
                    backgroundColor={primaryColor.color}
                    color="white"
                    onClick={sendMessage}
                    disabled={!title || !body || !receiver_fullname}
                  >
                    {isSending ? (
                      <CircularProgress
                        isIndeterminate
                        color="white"
                        size="24px"
                      />
                    ) : (
                      "Send"
                    )}
                  </Button>
                </Box>
              </Center>
            </WrapItem>
          </Box>

          <Box boxShadow={"lg"} m={2} flex={1}>
            <WrapItem
              flex={1}
              gap={2}
              borderRadius={4}
              flexDirection={"column"}
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
