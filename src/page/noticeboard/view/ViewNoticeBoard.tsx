import {
  Box,
  Flex,
  WrapItem,
  Input,
  Button,
  FormLabel,
  Spinner,
  Text,
  Heading,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Diversity3, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "../../auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import ReusableAnalytics from "../../accountingsection/manageaccounts/components/reusable/ReusableAnalytics";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ViewNoticeBoard = () => {
  const {
    theme: { primaryColor },
  } = useTheme();
  const token = localStorage.getItem("token");

  const [isLoadingItems, setIsLoadingItems] = useState(false);

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

  // INCOMES
  const tableHeaders = ["Sender", "Title", "Message", "Action"];

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);

  const newnotice = {
    message,
    title,
    sender: attachment,
  };
  const addNotice = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.post(
        "/noticeboard/createnotice",
        newnotice,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setMessage("");
      setTitle("");
      setAttachment("");
      setIsLoadingItems(true);
      toast.success("Success, notice has been added!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Sorry, something went wrong adding new notice!");
    }
  };

  // DELETE NOTICE
  const deleteNotice = async (id: any) => {
    try {
      await myAPIClient.delete(`/noticeboard/remove/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoadingItems(!isLoadingItems);
      toast.success("Success, notice has been deleted");
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  const [notices, setNotices] = useState([]);
  const getData = async () => {
    try {
      const res = await myAPIClient.get("/noticeboard/findall", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setNotices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoadingItems]);

  return (
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
          <Heading
            as={"h5"}
            fontSize={{ base: 22, md: 32, lg: 37 }}
            color={primaryColor.color}
          >
            Notice Board
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
            Notice Board
          </Text>
        </Box>
      </Flex>

      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        boxShadow={"lg"}
      >
        <Box w={{ base: "100%", lg: "50%" }} boxShadow={"lg"} m={2} flex={1}>
          <WrapItem flex={1} gap={6} flexDirection={"column"} h={"max-content"}>
            <Box
              backgroundColor={primaryColor.color}
              color="white"
              cursor="default"
              fontSize={16}
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              w="100%"
              py={2}
            >
              {loading ? "Adding.." : "Add Notice"}
            </Box>

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
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Title <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Title"
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
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Sender
                </FormLabel>
                <Select
                  placeholder="Select User"
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)}
                  w={"100%"}
                >
                  {employees?.map((c: any) => (
                    <option key={c._id} value={`${c.firstname} ${c.lastname}`}>
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
                w={"100%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FormLabel
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Message <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Message"
                ></Textarea>
              </Flex>

              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={addNotice}
                isDisabled={!title || !message || !attachment}
                backgroundColor={primaryColor.color}
                color="white"
              >
                {loading ? <Spinner color="white" /> : "Add Notice"}
              </Button>
            </Box>
          </WrapItem>
        </Box>

        <Box
          w={{ base: "100%", lg: "50%" }}
          h={600}
          boxShadow={"lg"}
          m={2}
          flex={1}
        >
          <ReusableAnalytics
            tableHeaders={tableHeaders}
            captionText="Notice Board"
            data={notices}
            deleteNotice={deleteNotice}
          />
        </Box>
      </Flex>
    </Box>
  );
};
