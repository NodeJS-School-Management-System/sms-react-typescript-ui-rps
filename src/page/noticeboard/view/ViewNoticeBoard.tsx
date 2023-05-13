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
  Heading,
} from "@chakra-ui/react";
import { Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import { NoticeList } from "./NoticeList";

export const ViewNoticeBoard = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const [notices, setNotices] = useState();
  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await myAPIClient.get("/noticeboard", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setNotices(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotices();
  }, []);

  const addNotice = async () => {
    try {
      const res = await myAPIClient.post(
        "/noticeboard",
        { title, info, username },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setTitle("");
      setInfo("");
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
            NoticeBoard
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
          <RiNotificationBadgeFill style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Notice Board
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              borderTop="3px solid #ccc"
              // bg={"white"}
              height="auto"
              w="90%"
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
                    Title <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Subject"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    File
                  </FormLabel>
                  <Input
                    type="file"
                    placeholder="Subject"
                    border="none"
                    // value={title}
                    // onChange={(e) => setTitle(e.target.value)}
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
                    placeholder="Body"
                    onChange={(e) => setInfo(e.target.value)}
                    value={info}
                  ></Textarea>
                </Flex>

                <Button
                  disabled={!title || !info}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={addNotice}
                  bgColor={primaryColor.color}
                  color="white"
                >
                  Add
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
              height="auto"
              w="90%"
              h="100%"
            >
              <NoticeList list={notices} />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
