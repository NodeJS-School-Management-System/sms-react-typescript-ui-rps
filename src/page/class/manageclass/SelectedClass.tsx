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
  // Home,
  LocationOn,
  // PersonAddAlt1,
  // PersonOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
// import { FaAngleRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
// import { Information, ChangePassword, Settings, HomeComp } from "./DynamicData";

export const SelectedClass = () => {
  const token = localStorage.getItem("token");
  const id = "14472ffe564c4925b29f4c5255384f96";
  // const PublicFolder = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const [classroom, setClassroom] = useState<any>({});

  useEffect(() => {
    const getClassroom = async () => {
      try {
        const res = await myAPIClient.get(`/classroom/${id}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClassroom(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getClassroom();
  }, []);

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
            Classroom Profile
          </Heading>
          <Text>SMS</Text>
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
            w={{ base: "100%", md: "50%", lg: "50%" }}
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
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Image
                      width={40}
                      borderRadius="50%"
                      objectFit="contain"
                      height={40}
                      src={
                        "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
                      }
                    />
                    <Box>
                      <Text
                        p={2}
                        textAlign="center"
                        fontSize={22}
                        fontWeight="bold"
                      >
                        {/* {classroom.firstname} {classroom.lastname} */}
                      </Text>
                      <Text pb={2} textAlign="center" fontSize={17}>
                        Classroom
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
                    <Text>Email </Text>
                    <Text color={"#2e5984"} fontWeight={"bold"}>
                      {classroom.email}
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
                    <Text>Contact </Text>
                    <Text color={"#2e5984"} fontWeight={"bold"}>
                      {" "}
                      {classroom.contact}{" "}
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
                    <Text>DOB </Text>
                    <Text color={"#2e5984"} fontWeight={"bold"}>
                      {classroom.dateofbirth}
                    </Text>
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="100%"
                    colorScheme={primaryColor.name}
                  >
                    Suspend {classroom.lastname}
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
              // bg={"white"}
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
                      <Box>Test1</Box>
                    </TabPanel>
                    <TabPanel>
                      <Box px={4} overflowX={"auto"}>
                        <Box>Test1</Box>
                        {/* <Information classroom={classroom} /> */}
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>Test</Box>
                      {/* <ChangePassword classroom={classroom} /> */}
                    </TabPanel>
                    <TabPanel>
                      <Box>Test1</Box>
                      {/* <Settings classroom={classroom} /> */}
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
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #2e5984"
              // bg={"white"}
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
                        {" "}
                        About Vincent{" "}
                      </Text>
                      <Text p={2} fontSize={19} fontWeight="bold">
                        {" "}
                        Education{" "}
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
                      {" "}
                      Class{" "}
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
                      {" "}
                      Stream{" "}
                    </Text>
                    <Text fontSize={17} fontWeight="bold">
                      {" "}
                      Block{" "}
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
                    <Text fontSize={17}> Seven </Text>
                    <Text fontSize={17}> A </Text>
                    <Text fontSize={17}> 12 </Text>
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
                        {" "}
                        Location{" "}
                      </Text>
                    </Flex>
                    <Text fontSize={17} color="gray">
                      {" "}
                      15 Zam Plaza{" "}
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
