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
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import { MongoAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";

export const ViewMessage = () => {
  const PF = MongoAPIClient;

  // IMPORT PRIMARY COLOR FROM THEME **************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  // Logged in user id
  // State variables for showing hiding messages/message
  const [showMessages, setShowMessages] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  // GET CONVERSATIONS OF THE LOGGED IN USER ********************************************
  const userId = localStorage.getItem("_id");
  const [conversations, setConversations] = useState([]);
  const getConversations = async () => {
    try {
      const res = await axios.get(`${PF}conversations/${userId}`);
      setConversations(res.data);
      console.log(conversations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversations();
    console.log(userId);
  }, []);
  // ****************************************************************************************

  // GET LOGGED IN USERS DETAILS BY HIS ID *************************************************
  // const [user, setUser] = useState({});
  // const [passedConversation, setPassedConversation] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${PF}staff/${userId}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

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
            <Button colorScheme={"teal"} w={"100%"}>
              Compose
            </Button>
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              w="100%"
              borderRadius={2}
              pb={4}
              borderTop="3px solid #ccc"
              bg={"white"}
              height="auto"
              h="100%"
            >
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

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  backgroundColor={primaryColor.color}
                  color="white"
                >
                  Send
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
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              bg={"white"}
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
                      <Text p={2} fontSize={22} fontWeight="bold">
                        Inbox
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box bg={"#eee"} h={400} p={5} w="100%" overflowY={"scroll"}>
              <>
                {showMessages &&
                  [1, 2, 3, 4, 5, 6, 7].map((item: any, index) => (
                    <Conversation
                      item={item}
                      setShowMessage={setShowMessage}
                      setShowMessages={setShowMessages}
                    />
                  ))}
              </>
              {showMessage && (
                <Box>
                  <Box
                    h={70}
                    bg={"#eee"}
                    display={"flex"}
                    gap={2}
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
                        <Text> Abeinemukama Vicent</Text>
                      </Box>
                      <Box fontWeight={"500"} fontSize={16}>
                        PTA Meeting
                      </Box>
                      <Box fontWeight={"300"} fontSize={14}>
                        2 min ago
                      </Box>
                    </Box>
                    <Box>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique tempore minima ipsam molestiae totam, iste
                        modi eaque natus repudiandae in fugiat non illo a
                        quibusdam expedita perferendis aliquam, unde facilis.
                      </Text>
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
