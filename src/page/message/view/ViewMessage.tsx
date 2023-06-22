import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Input,
  FormLabel,
  Textarea,
  Select,
  CircularProgress,
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import Conversation from "./Conversation";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { format } from "timeago.js";

export const ViewMessage = () => {
  // IMPORT PRIMARY COLOR FROM THEME **************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [receiver_fullname, setReceiverFullname] = useState("");

  const [showMessages, setShowMessages] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  // CLICKED MESSAGE DETAILS
  const [msgbody, setMsgbody] = useState<any>({});

  const triggerMessage = (item: any) => {
    setShowMessages(false);
    setShowMessage(true);
    setMsgbody(item);
  };

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

  // GET TEACHERS' PAYMENTS
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
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
  const [refetch, setRefetch] = useState(false);
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
      setRefetch(true);
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

  // GET CONVERSATIONS OF A USER
  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const getConversations = async () => {
      setFetching(true);
      try {
        const res = await myAPIClient.get(`/messages/findbyuserid/${userId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setMessages(res.data);
        setFetching(false);
      } catch (err) {
        console.log(err);
        setFetching(false);
      }
    };
    getConversations();
  }, [refetch]);

  // ****************************************************************************************

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          Mailbox
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Mailbox</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={4}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
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
              borderTop={`3px solid ${primaryColor.color}`}
              // bg={"white"}
              height="auto"
              h="100%"
            >
              <Box w={"100%"}>
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

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"md"}
              borderRadius={2}
              p={4}
              borderTop={`3px solid ${primaryColor.color}`}
              // bg={"white"}
              height="auto"
              w="100%"
              h="100%"
            >
              <Box w={"100%"}>
                <Flex
                  overflowX={"auto"}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box>
                    <Box>
                      <Text
                        p={2}
                        color={primaryColor.color}
                        fontSize={22}
                        fontWeight="bold"
                      >
                        Inbox
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box boxShadow={"md"} h={400} p={5} w="100%" overflowY={"auto"}>
              <>
                {fetching ? (
                  <Flex align={"center"} justify="center" margin={"auto"}>
                    <CircularProgress
                      isIndeterminate
                      color="teal"
                      size="24px"
                    />
                  </Flex>
                ) : messages.length < 1 ? (
                  <Flex align={"center"} justify="center">
                    <Box color="gray">No message yet!</Box>
                  </Flex>
                ) : (
                  showMessages &&
                  messages.map((item: any) => (
                    <Conversation
                      item={item}
                      key={item._id}
                      setShowMessage={setShowMessage}
                      setShowMessages={setShowMessages}
                      setMsgbody={setMsgbody}
                      triggerMessage={triggerMessage}
                    />
                  ))
                )}
              </>
              {showMessage && (
                <Box>
                  <Box
                    bg={"#eee"}
                    display={"flex"}
                    flexDirection="column"
                    padding={2}
                    borderRadius={3}
                    marginBottom={0}
                    paddingBottom={0}
                  >
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box
                        fontWeight={"600"}
                        fontSize={18}
                        display="flex"
                        gap={3}
                        alignItems={"center"}
                      >
                        <FaAngleLeft
                          onClick={() => {
                            setShowMessage(false);
                            setShowMessages(true);
                          }}
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                        <Text> {msgbody?.sender_fullname}</Text>
                      </Box>
                      <Box fontWeight={"500"} fontSize={16}>
                        {msgbody?.title}
                      </Box>
                      <Box fontWeight={"300"} fontSize={14}>
                        {format(msgbody?.createdAt)}
                      </Box>
                    </Box>
                    <Box>
                      <Text>{msgbody?.messagebody}</Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
