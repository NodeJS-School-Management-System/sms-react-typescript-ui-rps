import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { ClassList } from "./ClassList";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const ManageExam = () => {
  const token = localStorage.getItem("token");

  const [examDate, setExamDate] = useState("");
  const [examTimetable, setTimeTable] = useState("");
  const [runningTerm, setRunningTerm] = useState("");
  const [examName, setExamName] = useState("");

  // Add new exam and its details *************************************************
  const addExam = async () => {
    try {
      const newExam = {
        examDate,
        examTimetable,
        runningTerm,
        examName,
      };

      const res = await myAPIClient.post("/exams", newExam, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      alert("Added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Get all exams
  // const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get("/exams", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data)
        // setExams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getExams();
  }, []);

  const [classlist, setClasslist] = useState([]);
  // Get all classes registered *************************************
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          Manage Examination
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Exam</Text>
          <FaAngleRight />
          <Text fontSize={14}>Manage Exam</Text>
        </Flex>
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
              borderTop="3px solid blue"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"} p={4}>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
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
                    Exam Name
                  </Text>
                  <Input
                    isRequired
                    py={3}
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    type="text"
                    placeholder="Exam Name"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
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
                    Exam Date
                  </Text>
                  <Input
                    isRequired
                    py={3}
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    type="text"
                    placeholder="Exam Name"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
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
                    Exam Time Table
                  </Text>
                  <Input
                    isRequired
                    pt={1}
                    value={examTimetable}
                    type="file"
                    onChange={(e) => setTimeTable(e.target.value)}
                    placeholder="Exam Name"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
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
                    Running Term
                  </Text>
                  <Input
                    isRequired
                    py={3}
                    type="text"
                    value={runningTerm}
                    onChange={(e) => setRunningTerm(e.target.value)}
                    placeholder="Exam Name"
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  p={2}
                  colorScheme={"teal"}
                  onClick={addExam}
                >
                  Add
                </Button>
              </Box>
            </Center>
          </WrapItem>
          {/* 
          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid blue"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <Flex
                  overflowX={"auto"}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box>
                    <Box>
                      <Text p={2} fontSize={22} fontWeight="bold">
                        Exam List
                      </Text>
                    </Box>
                  </Box>

                  <Text ml={3} fontSize={19} fontWeight="bold">
                    Exams
                  </Text>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={19} fontWeight="bold">
                      Exam Name
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Exam Date
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Time Table
                    </Text>
                  </Flex>
                  {exams &&
                    exams.map((exam: any) => (
                      <Flex
                        w={"100%"}
                        p={3}
                        borderTop="1px solid #ccc"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDirection="row"
                        key={exam.examId}
                      >
                        <Text fontSize={19} fontWeight="bold">
                          {exam.examName}
                        </Text>
                        <Text fontSize={19} fontWeight="bold">
                          {exam.examDate}
                        </Text>
                        <Text fontSize={19} fontWeight="bold">
                          Mid Term
                        </Text>
                      </Flex>
                    ))}
                </Flex>
              </Box>
            </Box>
          </WrapItem> */}

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              height="auto"
              w="90%"
              h="100%"
            >
              <ClassList list={classlist} />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
