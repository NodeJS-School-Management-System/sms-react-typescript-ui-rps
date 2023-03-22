import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  WrapItem,
  Select,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdClass } from "react-icons/md";
import { useEffect, useState } from "react";
import { NTStaffList } from "./NTStaffList";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const NTStaffMembers = () => {
  const token = localStorage.getItem("token");

  const [ntstaffmember, setNtstaffmember] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await myAPIClient.get("/nonteachingstaff", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setNtstaffmember(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMembers();
  }, []);

  // Filter teachers with search
  const [query, setQuery] = useState("");
  const keys = ["firstname", "lastname", "class"];
  const filterTeachers = (teachers) => {
    return teachers?.filter((teacher) => {
      return keys?.some((key) => teacher[key]?.toLowerCase().includes(query));
    });
  };

  return (
    <>
      <Box>
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          h={70}
          p={5}
          my={3}
        >
          <Text fontSize={30} fontWeight="bold">
            View Non Teaching Staff Members
          </Text>
          <Text>SMS</Text>
        </Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            boxShadow={"lg"}
            flex={1}
            gap={2}
            borderRadius={4}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" bgColor={"teal"}>
              <Flex
                bgColor={"blue"}
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
                bg={"white"}
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
                <Select placeholder="(2022 - 2023)" size={"lg"}>
                  <option value="option1">(2022 - 2023)</option>
                  <option value="option2">(2021 - 2022)</option>
                  <option value="option3">(2020 - 2021)</option>
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"lg"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" bgColor={"teal"}>
              <Flex
                bgColor={"blue"}
                color={"white"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size="3em" />
              </Flex>
              <Flex
                p={3}
                bg={"white"}
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
                <Select placeholder="Select Class" size={"lg"}>
                  <option value="option1">P1</option>
                  <option value="option1">P2</option>
                  <option value="option1">P3</option>
                  <option value="option1">P4</option>
                  <option value="option1">P5</option>
                  <option value="option1">P6</option>
                  <option value="option1">P7</option>
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"lg"}
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
              bgColor={"teal"}
            >
              <Flex
                bgColor={"blue"}
                color={"white"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <MdClass size={"3em"} />
              </Flex>
              <Flex
                p={3}
                bg={"white"}
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
                  <option value="option1">A</option>
                  <option value="option2">B</option>
                  <option value="option3">C</option>
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem
            boxShadow={"lg"}
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"row"} w="100%" h="100%" bgColor={"teal"}>
              <Flex
                bgColor={"teal"}
                color={"white"}
                w={"30%"}
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImUsers size={"3em"} />
              </Flex>
              <Flex
                p={3}
                bg={"white"}
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
                <Heading as="h2">{ntstaffmember.length}</Heading>
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
          h={70}
          p={5}
          my={3}
        >
          <Text fontSize={25} fontWeight={"bold"}>
            List of Students
          </Text>
        </Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={3}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <NTStaffList list={ntstaffmember} />
        </Flex>
      </Box>
    </>
  );
};
