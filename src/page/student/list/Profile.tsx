import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  CircularProgress,
} from "@chakra-ui/react";
import { Home, LocationOn, PersonAddAlt1 } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useTheme from "../../../theme/useTheme";
import { Information, ChangePassword, Settings, HomeComp } from "./DynamicData";
import { myAPIClient } from "../../auth/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Profile = ({ studentId }: any) => {
  const token = localStorage.getItem("token");
  const id = studentId;

  const [student, setStudent] = useState<any>({});
  const [suspension, setSuspension] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(`/users/students/${id}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, [id, suspension]);

  // SUSPEND STUDENT
  const [loading, setLoading] = useState(false);
  const suspendStudent = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.put(
        `/users/students/${id}`,
        {
          isSuspended:
            student.isSuspended === false
              ? true
              : student.isSuspended === true
              ? false
              : null,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setLoading(false);
      setSuspension(true);
      toast.success("Success, student has been updated!");
    } catch (err) {
      console.log(err);
      toast.error("There was an error processing your request!");
      setLoading(false);
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
        my={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 25, lg: 30 }}
            color={primaryColor.color}
          >
            Student Profile
          </Heading>
          <Text fontSize={12}>SMS</Text>
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
          <PersonAddAlt1 style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            {student.username}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={1}
          flexDirection={{ base: "column", md: "row" }}
        >
          <WrapItem
            flex={1.7}
            gap={2}
            flexDirection={"column"}
            height="max-content"
            w={{ base: "100%", md: "50%", lg: "30%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #2e5984"
              height="auto"
              w="100%"
              h="100%"
            >
              <Box w={"100%"}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  px={5}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Image
                      width={40}
                      borderRadius="50%"
                      objectFit="cover"
                      height={40}
                      src={`${student.profileimage}`}
                    />
                    <Box>
                      <Text
                        p={2}
                        textAlign="center"
                        fontSize={22}
                        fontWeight="bold"
                      >
                        {student.firstname} {student.lastname}
                      </Text>
                      <Text pb={2} textAlign="center" fontSize={17}>
                        Student
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={14} mr={2}>
                      Email:
                    </Text>
                    <Text color={"#2e5984"} fontSize={{ base: 10, lg: 14 }}>
                      {student.email || "N/A"}
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={14}>Contact: </Text>
                    <Text fontSize={{ base: 11, lg: 14 }} color={"#2e5984"}>
                      {student.contact || "N/A"}
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={14}>DOB</Text>
                    <Text fontSize={{ base: 11, lg: 14 }} color={"#2e5984"}>
                      {student.dateofbirth}
                    </Text>
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="100%"
                    colorScheme={primaryColor.name}
                    onClick={suspendStudent}
                  >
                    {loading ? (
                      <CircularProgress size={"24px"} />
                    ) : student.isSuspended === true ? (
                      `Reinstate ${student.lastname}`
                    ) : (
                      `Suspend ${student.lastname}`
                    )}
                  </Button>
                </Box>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            justifyContent="center"
            h={"max-content"}
            gap={4}
            flex={3}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              pb={0}
              borderTop="3px solid #2e5984"
              height="auto"
              justifyContent="center"
              w="100%"
              h="100%"
            >
              <Flex
                alignItems="flex-start"
                gap="2"
                justifyContent="center"
                flexDirection="row"
                pb={3}
              >
                <Tabs variant="unstyled">
                  <TabList style={{ padding: "0px" }}>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Home
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      fontSize={{ base: 12, md: 13, lg: 15 }}
                    >
                      Information
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      display={{ base: "none", lg: "block" }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Change Password
                    </Tab>
                    <Tab
                      display={{ base: "none", lg: "block" }}
                      _selected={{
                        color: primaryColor.color,
                      }}
                      fontSize={{ base: 12, md: 13, lg: 15 }}
                    >
                      Settings
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HomeComp />
                    </TabPanel>
                    <TabPanel>
                      <Information student={student} />
                    </TabPanel>
                    <TabPanel>
                      <ChangePassword student={student} />
                    </TabPanel>
                    <TabPanel>
                      <Settings student={student} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Box>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={1.3}
            w={{ base: "100%", md: "50%", lg: "25%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #2e5984"
              height="auto"
              w="100%"
              h="100%"
            >
              <Box w={"100%"}>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box>
                    <Box>
                      <Text p={2} fontSize={18} fontWeight="bold">
                        About {student.lastname}
                      </Text>
                      <Text p={2} fontSize={17} fontWeight="bold">
                        Education
                      </Text>
                    </Box>
                  </Box>

                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={{ base: 15, lg: 17 }} fontWeight="bold">
                      Class
                    </Text>
                    <Text fontSize={{ base: 15, lg: 17 }} fontWeight="bold">
                      Stream
                    </Text>
                    <Text fontSize={{ base: 15, lg: 17 }} fontWeight="bold">
                      Year
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={{ base: 15, lg: 17 }}>
                      {" "}
                      {student.studentclass}{" "}
                    </Text>
                    <Text fontSize={{ base: 15, lg: 17 }}>
                      {student.stream || " N/A"}{" "}
                    </Text>
                    <Text fontSize={{ base: 15, lg: 17 }}>
                      {" "}
                      {new Date().getFullYear()}{" "}
                    </Text>
                  </Flex>

                  <Box
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Flex flexDirection="row" alignItems={"center"} gap={2}>
                      <LocationOn />
                      <Text fontSize={{ base: 15, lg: 17 }} fontWeight="bold">
                        Location
                      </Text>
                    </Flex>
                    <Text ml={2} fontSize={{ base: 15, lg: 17 }} color="gray">
                      {student.address}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
