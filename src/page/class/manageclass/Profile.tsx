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
} from "@chakra-ui/react";
import { ClassOutlined, Home } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import { GiLevelFour } from "react-icons/gi";
import { Attendence, Settings, Students, Subjects } from "./DynamicData";
// import { Information, ChangePassword, Settings, HomeComp } from "./DynamicData";

export const Profile = ({ classroomId }: any) => {
  const id = classroomId;

  // GET CLASSROOM BY ID **************************************************************
  const [classroom, setClassroom] = useState<any>({});

  useEffect(() => {
    const getClassroom = async () => {
      try {
        const res = await myAPIClient.get(`/classroom/${id}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setClassroom(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getClassroom();
  }, [id]);

  // GET TEACHER BY NAME **************************************************************
  const [classTeacher, setClassTeacher] = useState<any>({});

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await myAPIClient.get(
          `/teachers/find/${classroom.classTeacher}`,
          {
            headers: {
              token: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClassTeacher(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err, "tttttttttttttttt");
      }
    };

    classroom && classroom.classTeacher && getTeacher();
  }, [classroom?.classTeacher]);

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
            Class Profile
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
          <ClassOutlined style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            {classroom?.className}
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
            gap={2}
            flexDirection={"column"}
            height="max-content"
            w={{ base: "100%", md: "50%", lg: "25%" }}
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
                  w="100%"
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
                      src={
                        classTeacher?.profileimage ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683014096~exp=1683014696~hmac=21316efa5253c58a4501926c1c4c466c0e79f8d7704acf5f53030a5fc9fe5239"
                      }
                    />
                    <Box>
                      <Text
                        p={2}
                        textAlign="center"
                        fontSize={22}
                        fontWeight="bold"
                      >
                        {classroom?.classTeacher || "N/A"}
                      </Text>
                      <Text pb={2} textAlign="center" fontSize={17}>
                        Class Teacher
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
                    <Text mr={2} fontSize={{ base: 10, lg: 14 }}>
                      Email{" "}
                    </Text>
                    <Text fontSize={{ base: 10, lg: 14 }} color={"#2e5984"}>
                      {classTeacher?.email || "N/A"}
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
                    <Text fontSize={{ base: 10, lg: 14 }}>Contact </Text>
                    <Text fontSize={{ base: 10, lg: 14 }} color={"#2e5984"}>
                      {classTeacher?.contact || "N/A"}
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
                    <Text fontSize={{ base: 10, lg: 14 }}>DOB</Text>
                    <Text fontSize={{ base: 10, lg: 14 }} color={"#2e5984"}>
                      {classTeacher?.dateofbirth || "N/A"}
                    </Text>
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="100%"
                    fontSize={{ base: 13, md: 14, lg: 16 }}
                    colorScheme={primaryColor.name}
                  >
                    Remove From Class Teacher
                  </Button>
                </Box>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            h={"max-content"}
            gap={4}
            flex={2}
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
                  <TabList>
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
                      display={{ base: "none", lg: "block" }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Subjects
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Students
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      // display={{ base: "none", lg: "block" }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Attendence
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                      display={{ base: "none", lg: "block" }}
                      fontSize={{ base: 12, md: 13, lg: 16 }}
                    >
                      Settings
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>Home</TabPanel>
                    <TabPanel>
                      <Box px={4} overflowX={"auto"}>
                        <Subjects className={classroom.className} />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Students className={classroom.classNumeral} />
                    </TabPanel>
                    <TabPanel>
                      <Attendence className={classroom.classNumeral} />
                    </TabPanel>
                    <TabPanel>
                      <Settings className={classroom.classNumeral} />
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
            flex={1}
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
                      <Text p={2} fontSize={19} fontWeight="bold">
                        About {classroom.className}
                      </Text>
                      <Text p={2} fontSize={17} fontWeight="bold">
                        Details
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
                      {classroom.classNumeral}
                    </Text>

                    <Text fontSize={{ base: 15, lg: 17 }}>
                      {new Date().getFullYear()}
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
                      <GiLevelFour />
                      <Text fontSize={{ base: 15, lg: 17 }} fontWeight="bold">
                        Level
                      </Text>
                    </Flex>
                    <Text ml={2} fontSize={{ base: 15, lg: 17 }} color="gray">
                      N/A
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
