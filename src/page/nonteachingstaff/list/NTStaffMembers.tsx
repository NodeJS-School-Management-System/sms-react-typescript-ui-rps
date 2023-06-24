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
import useTheme from "../../../theme/useTheme";
import { NTStaffList } from "./NTStaffList";

export const NTStaffMembers = () => {
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState("");

  // DELETE MEMBER ************************************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMember = async (nonteachingstaffId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(
        `/users/members/remove/${nonteachingstaffId}`,
        {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsDeleting(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };

  const [isFetching, setIsFetching] = useState(false);

  // GET MEMBERS LIST **************************************************************************
  const [memberlist, setMemberslist] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      setIsFetching(true);
      try {
        const res = await myAPIClient.get("/users/members/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setMemberslist(res.data);
        console.log(res.data);
        setIsFetching(false);

        // setMale(0);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };

    getMembers();
  }, [isDeleting]);

  // ***********************************************************************************************

  // FILTER MALES FROM MEMBERS LIST****************************************************************
  const maleCount = memberlist.reduce((count: any, user: any) => {
    if (user.gender === "Male") {
      return count + 1;
    }
    return count;
  }, 0);

  // FILTER FEMALES FROM TEACHERS LIST****************************************************************
  const femaleCount = memberlist.reduce((count: any, user: any) => {
    if (user.gender === "Female") {
      return count + 1;
    }
    return count;
  }, 0);

  // Filter Member with search
  const keys = [
    "firstname",
    "lastname",
    "department",
    "gender",
    "dateofbirth",
    "contact",
    "address",
  ];

  // FILTER MEMBERS
  const filterMembers = (members: any) => {
    return members?.filter((member: any) => {
      return keys?.some(
        (key: any) =>
          typeof member[key] === "string" &&
          member[key].toLowerCase().includes(query)
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
          my={3}
        >
          <Box display={"flex"}>
            <Heading
              as={"h5"}
              fontSize={{ base: 22, md: 32, lg: 37 }}
              color={primaryColor.color}
            >
              Members
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
              Members' List
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
                bgColor={"#2e5984"}
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
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Total Members
                </Text>
                <Heading as="h2">{memberlist.length}</Heading>
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
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <NTStaffList
            deleteMember={deleteMember}
            isDeleting={isDeleting}
            isFetching={isFetching}
            list={query ? filterMembers(memberlist) : memberlist}
          />
        </Flex>
      </Box>
    </>
  );
};
