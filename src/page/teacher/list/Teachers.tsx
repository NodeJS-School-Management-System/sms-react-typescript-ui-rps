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
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { ImUsers, ImMan, ImWoman } from "react-icons/im";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { useState, useEffect } from "react";
import { TeacherList } from "./TeacherList";
import useTheme from "../../../theme/useTheme";

export const Teachers = () => {
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState("");

  // DELETE TEACHER ************************************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTeacher = async (teacherId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(
        `/users/teachers/remove/${teacherId}`,
        {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };

  const [isFetching, setIsFetching] = useState(false);

  // GET TEACHERS LIST **************************************************************************
  const [teacherslist, setTeacherslist] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      setIsFetching(true);
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setTeacherslist(res.data);
        console.log(res.data);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };

    getTeachers();
  }, [isDeleting]);

  // ***********************************************************************************************

  // FILTER MALES FROM TEACHERS LIST****************************************************************
  const maleCount = teacherslist.reduce((count: any, user: any) => {
    if (user.gender === "Male") {
      return count + 1;
    }
    return count;
  }, 0);

  // FILTER FEMALES FROM TEACHERS LIST****************************************************************
  const femaleCount = teacherslist.reduce((count: any, user: any) => {
    if (user.gender === "Female") {
      return count + 1;
    }
    return count;
  }, 0);

  // Filter teachers with search
  const keys = [
    "firstname",
    "lastname",
    "class",
    "gender",
    "dateofbirth",
    "contact",
    "address",
  ];

  // const filterTeachers = (teachers: any) => {
  //   return teachers?.filter((teacher: any) => {
  //     return keys?.some((key: any) =>
  //       teacher[key]?.toLowerCase().includes(query)
  //     );
  //   });
  // };

  // FILTER TEACHERS
  const filterTeachers = (teachers: any) => {
    return teachers?.filter((teacher: any) => {
      return keys?.some(
        (key: any) =>
          typeof teacher[key] === "string" &&
          teacher[key].toLowerCase().includes(query)
      );
    });
  };

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
          pt={0}
          mb={3}
        >
          <Box display={"flex"}>
            <Heading
              as={"h5"}
              fontSize={{ base: 22, md: 32, lg: 37 }}
              color={primaryColor.color}
            >
              Teachers
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
            <Diversity3 style={{ fontSize: 16 }} />
            <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
              Teachers' List
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
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"teal"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImMan size={"3em"} color="white" />
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
                  Male
                </Text>
                <Heading as="h2">{maleCount}</Heading>
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
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={primaryColor.color}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImWoman size={"3em"} color="white" />
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
                  Female
                </Text>
                <Heading as="h2">{femaleCount}</Heading>
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
            <Center
              flexDirection={"row"}
              w="100%"
              h={"110px"}
              boxShadow={"base"}
            >
              <Flex
                bgColor={"darkblue"}
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
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Total Teachers
                </Text>
                <Heading as="h2">{teacherslist.length}</Heading>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>
      </Box>

      <Flex>
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="flex-end"
          h={70}
          p={5}
          pl={0}
          my={3}
        >
          <Box
            display="flex"
            alignItems={"center"}
            gap={2}
            justifyContent={"flex-end"}
          >
            <Text>Search:</Text>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search.."
            />
          </Box>
        </Box>
      </Flex>

      <Box>
        {/* <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
          h={70}
          p={5}
          pl={0}
          my={3}
        >
          <Flex
            mt={5}
            pt={5}
            align={"center"}
            justify="center"
            direction={"column"}
          >
            <Text
              fontSize={25}
              mt={4}
              fontWeight={"bold"}
              color={primaryColor.color}
            >
              List of Teachers
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
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search.."
            />
          </Box>
        </Box> */}

        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <TeacherList
            deleteTeacher={deleteTeacher}
            isDeleting={isDeleting}
            isFetching={isFetching}
            list={query ? filterTeachers(teacherslist) : teacherslist}
          />
        </Flex>
      </Box>
    </>
  );
};
