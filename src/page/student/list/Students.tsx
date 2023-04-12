import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  WrapItem,
  Select,
  Input,
} from "@chakra-ui/react";
import { Diversity3, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdClass } from "react-icons/md";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { StudentList } from "../../../components/student/list/StudentList";
import useTheme from "../../../theme/useTheme";

export const Students = () => {
  const token = localStorage.getItem("token");

  const [studentlist, setStudentlist] = useState([]);
  const [clas, setClas] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/students", {
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
  }, [clas]);

  // Get all classNames
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
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
  }, [clas]);

  // Filter students by classname
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(`/students/find/${clas}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        clas && setStudentlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    clas && getStudents();
  }, [clas]);

  // // Filter students by query(live typing in the input field)
  // const keys = ["firstname, lastname", "username"];
  // const filterStudents = (students) => {
  //   return students?.filter((student) => {
  //     return keys.some((key) => student[key]?.toLowerCase().includes(query));
  //   });
  // };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <>
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
              Students
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
            <Diversity3 />
            <Text fontWeight="bold" fontSize={14}>
              Students
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
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"#2e5984"}
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

          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"#2e5984"}
                color="white"
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size="3em" />
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
                  Select Class
                </Text>
                <Select
                  placeholder="Select Class"
                  value={clas}
                  onChange={(e) => setClas(e.target.value)}
                  size={"lg"}
                >
                  {classes.map((c: any) => (
                    <option key={c.classroomId} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"base"}
            borderRadius={4}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"row"}
              borderRadius={4}
              w="100%"
              h="100%"
              boxShadow={"base"}
            >
              <Flex
                bgColor={"#2e5984"}
                color="white"
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size={"3em"} />
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
                  Select Stream
                </Text>
                <Select placeholder="Select Stream" size={"lg"}>
                  {/* <option value="option1">A</option> */}
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"base"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImUsers size={"3em"} color="white" />
              </Flex>
              <Flex
                p={3}
                w={"70%"}
                h={"100%"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={20} fontWeight="bold" color={"gray"} mb={3}>
                  Total Students
                </Text>
                <Heading as="h2">{studentlist.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>
      </Box>

      <Box>
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
          h={70}
          p={5}
          pl={0}
          my={3}
        >
          <Flex pt={5} align={"center"} justify="center" direction={"column"}>
            <Text
              fontSize={25}
              mt="4"
              fontWeight={"bold"}
              color={primaryColor.color}
            >
              List of Students
            </Text>
            <Flex
              p={3}
              px={0}
              h={"100%"}
              direction="row"
              align={"center"}
              justify={"space-between"}
            >
              <Flex
                mb={2}
                p={3}
                px={0}
                w={"max-content"}
                h={"100%"}
                direction="row"
                align={"center"}
                justify={"flex-start"}
              >
                <Text
                  ml={2}
                  fontSize={17}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Show
                </Text>
                <Select mx={2} mb={4} placeholder="10" size={"sm"}>
                  <option value="option2">50</option>
                  <option value="option3">100</option>
                  <option value="option3">500</option>
                  <option value="option3">2000</option>
                </Select>
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  entries
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box
            display="flex"
            alignItems={"center"}
            gap={2}
            justifyContent={"flex-end"}
          >
            <Text>Search</Text>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search.."
            />
          </Box>
        </Box>
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <StudentList
            list={
              query
                ? studentlist.filter(
                    (student: any) =>
                      student.firstname.toLowerCase().includes(query) ||
                      student.lastname.toLowerCase().includes(query)
                  )
                : studentlist
            }
            query={query}
          />
        </Flex>
      </Box>
    </>
  );
};
