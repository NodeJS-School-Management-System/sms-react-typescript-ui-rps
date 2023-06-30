import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Heading,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import CustomTable from "./CustomTable";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MdBookmarks } from "react-icons/md";
import useTheme from "../../../theme/useTheme";

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
        const res = await myAPIClient.get(`/classrooms/findall`, {
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
        const res = await myAPIClient.get("/exams/findall", {
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
        const res = await myAPIClient.get(`/subjects/findall`, {
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
        const res = await myAPIClient.get(`/users/students/find/${clas}`, {
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
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 30, lg: 35 }}
            color={primaryColor.color}
          >
            Insert Marks
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
          <MdBookmarks style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Entry Marks
          </Text>
        </Box>
      </Flex>

      <Box w="100%">
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
              borderTop={`3px solid ${primaryColor.color}`}
              height="auto"
              w="100%"
              h="100%"
            >
              <Box w={"100%"}>
                {/* Student class ************************************************* */}
                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                      <option key={clasi._id} value={clasi.classnumeral}>
                        {clasi.classnumeral}
                      </option>
                    ))}
                  </Select>
                </Flex>

                {/* Running term ************************************************** */}
                <Flex
                  p={3}
                  // bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                  // bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                      <option key={exam._id} value={exam.examName}>
                        {exam.examName}
                      </option>
                    ))}
                  </Select>
                </Flex>

                {/* Subject ***************************************************** */}
                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                      <option key={sub._id} value={sub.subjectname}>
                        {sub.subjectname}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Button
                  onClick={() => setInsertClicked(true)}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  bgColor={primaryColor.color}
                  color="white"
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
                bg={primaryColor.color}
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
                    bg={primaryColor.color}
                    color="white"
                    w="100%"
                    h="100%"
                    justifyContent="flex-start"
                    flexDirection="column"
                  >
                    <Box>
                      <Text
                        textAlign={"center"}
                        fontSize={{ base: 13, md: 14, lg: 15 }}
                        px={5}
                        fontWeight="bold"
                      >
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
