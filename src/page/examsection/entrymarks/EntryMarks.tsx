import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
// import axios from "axios";
import CustomTable from "./CustomTable";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const EntryMarks = () => {
  const token = localStorage.getItem("token");
  const [insertClicked, setInsertClicked] = useState(false);

  // Running term
  const [term, setTerm] = useState("");

  const [clas, setClas] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");

  // Fetch all classes
  const [classes, setClasses] = useState<any>([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get(`/classroom`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // Fetch all exams
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get(`/exams`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setExams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getExams();
  }, []);

  // Fetch all exams
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get(`/subject`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

  // Get all students by classname
  const [studentss, setStudentss] = useState<any>([]);
  useEffect(() => {
    const getStudentss = async () => {
      try {
        const res = await myAPIClient.get(`/students/find/${clas}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setStudentss(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudentss();
  }, [clas]);

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          Insert Marks
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14} fontWeight="bold">
            Home
          </Text>
          <FaAngleRight />
          <Text fontSize={14} fontWeight="bold">
            Exam
          </Text>
          <FaAngleRight />
          <Text fontSize={14} fontWeight="bold">
            Insert Marks
          </Text>
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
              borderTop="3px solid #ccc"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                {/* Student class ************************************************* */}
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
                    Select Class
                  </Text>
                  <Select
                    placeholder="Select Class"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setClas(e.target.value);
                    }}
                    w={"100%"}
                    value={clas}
                  >
                    {classes.map((clasi: any) => (
                      <option
                        key={clasi.classroomId}
                        value={clasi.classNumeral}
                      >
                        {clasi.classNumeral}
                      </option>
                    ))}
                  </Select>
                </Flex>

                {/* Running term ************************************************** */}
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
                    Select Term
                  </Text>
                  <Select
                    placeholder="Select Term"
                    onChange={(e) => {
                      setTerm(e.target.value);
                    }}
                    w={"100%"}
                    value={term}
                  >
                    <option>Term One</option>
                    <option>Term Two</option>
                    <option>Term Three</option>
                  </Select>
                </Flex>

                {/* ExamType******************************************* */}
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
                    Select Exam
                  </Text>
                  <Select
                    placeholder="Select Exam"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setExam(e.target.value);
                    }}
                    w={"100%"}
                    value={exam}
                  >
                    {exams.map((exam: any) => (
                      <option key={exam.examId} value={exam.examName}>
                        {exam.examName}
                      </option>
                    ))}
                  </Select>
                </Flex>

                {/* Subject ***************************************************** */}
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
                    Select Subject
                  </Text>
                  <Select
                    placeholder="Select Subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {subjects.map((sub: any) => (
                      <option key={sub.subjectId} value={sub.subjectName}>
                        {sub.subjectName}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Button
                  onClick={() => setInsertClicked(true)}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={"teal"}
                  disabled={!clas || !subject || !exam}
                >
                  Insert Marks
                </Button>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            {!insertClicked ? (
              <Box
                flexDirection={"column"}
                boxShadow={"lg"}
                bg={"blue"}
                borderRadius={2}
                py={4}
                height="auto"
                w="100%"
                h="100%"
              >
                <Box w={"100%"}>
                  <Flex
                    overflowX={"auto"}
                    alignItems="center"
                    bg={"blue"}
                    w="100%"
                    h="100%"
                    color="white"
                    justifyContent="flex-start"
                    flexDirection="column"
                  >
                    <Box>
                      <Text textAlign={"center"} fontWeight="bold">
                        Select class, exam and subject to insert marks
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <>
                <Text
                  fontSize={25}
                  textAlign="center"
                  margin="auto"
                  fontWeight="bold"
                >
                  {exam} {subject} Marks - For {clas}
                </Text>

                <CustomTable
                  clas={clas}
                  subject={subject}
                  exam={exam}
                  list={studentss}
                  term={term}
                />

                {/* <Flex gap={3} ml={10}>
                  <Button colorScheme="teal">Save</Button>
                  <Button colorScheme="facebook">Reset</Button>
                </Flex> */}
              </>
            )}
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
