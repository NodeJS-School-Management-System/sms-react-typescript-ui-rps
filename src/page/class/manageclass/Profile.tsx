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
import {
  Home,
  LocationOn,
  PersonAddAlt1,
  PersonOutline,
} from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "../../../theme/useTheme";
// import { Information, ChangePassword, Settings, HomeComp } from "./DynamicData";

export const Profile = ({ classroomId }: any) => {
  // const id1 = localStorage.getItem("studentId");
  const id = classroomId;

  useEffect(() => {
    console.log(id);
  }, []);

  // GET CLASSROOM BY ID **************************************************************
  // const [classroom, setClassroom] = useState<any>({});

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
          <Heading as={"h5"} color={primaryColor.color}>
            Class Profile
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
          <PersonOutline />
          <Text fontWeight="bold" fontSize={14}>
            Classroom
          </Text>
          <FaAngleRight />
          <PersonAddAlt1 />
          <Text fontWeight="bold" fontSize={14}>
            P4
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
              w="90%"
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
                    // p={3}
                  >
                    <Image
                      width={40}
                      borderRadius="50%"
                      objectFit="cover"
                      height={40}
                      src={`tes.png`}
                    />
                    <Box>
                      <Text
                        p={2}
                        textAlign="center"
                        fontSize={22}
                        fontWeight="bold"
                      >
                        Primary Four
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
                    <Text mr={2}>Email </Text>
                    <Text color={"#2e5984"}> class@gmail.com</Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text>Contact </Text>
                    <Text color={"#2e5984"}> test </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text>DOB</Text>
                    <Text color={"#2e5984"}> test</Text>
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="100%"
                    colorScheme={primaryColor.name}
                  >
                    {" "}
                    Suspend test
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
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="flex-start"
                gap="2"
                justifyContent="flex-start"
                flexDirection="row"
                pb={3}
                w="100%"
              >
                <Tabs variant="unstyled">
                  <TabList>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Home
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Information
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Change Password
                    </Tab>
                    <Tab
                      _selected={{
                        color: primaryColor.color,
                      }}
                    >
                      Settings
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {/* <HomeComp /> */}
                      Home
                    </TabPanel>
                    <TabPanel>
                      <Box px={4} overflowX={"auto"}>
                        {/* <Information student={student} /> */}
                        Infor
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      {/* <ChangePassword student={student} /> */}
                      password
                    </TabPanel>
                    <TabPanel>
                      {/* <Settings student={student} /> */}
                      setigns
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
              w="90%"
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
                      <Text p={2} fontSize={22} fontWeight="bold">
                        About Primary FOur
                      </Text>
                      <Text p={2} fontSize={19} fontWeight="bold">
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
                    <Text fontSize={17} fontWeight="bold">
                      Class
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
                      Stream
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
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
                    <Text fontSize={17}> P4</Text>
                    <Text fontSize={17}>A</Text>
                    <Text fontSize={17}> {new Date().getFullYear()} </Text>
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
                      <Text fontSize={18} fontWeight="bold">
                        Location
                      </Text>
                    </Flex>
                    <Text fontSize={17} color="gray">
                      test
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