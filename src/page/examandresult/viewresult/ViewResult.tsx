import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Image,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import ReportModal from "./ReportModal";
import Logo from "../../../assets/logo.png";
import { FaAngleRight } from "react-icons/fa";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import { useReactToPrint } from "react-to-print";
import ReportTableExt from "./ReportTableExt";
import ExamResultsTable from "./ExamResultsTable";
import {
  MongoAPIClient,
  myAPIClient,
} from "../../../components/auth/axiosInstance";

export const ViewResult = () => {
  const reportRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Report",
  });

  const token = localStorage.getItem("token");
  const [insertClicked, setInsertClicked] = useState(false);

  const [clas, setClas] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");

  // useDisclosure hook for controlling opening and closing of a chakraui modal *****
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function for opening the reports modal *************************************************
  const openReportModal = useCallback(() => {
    onOpen();
  }, []);

  // *****************************************************************************************

  // Fetch all classes in the db ************************************************************
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

  // ****************************************************************************************

  // Fetch all exams in the db ***************************************************************
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

  // ****************************************************************************************

  // Fetch all subjects in the db ************************************************************
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

  // ****************************************************************************************

  // Get results by classname(selecting a class from dropdown)***********************
  const [results, setResults] = useState([]);
  const PF = MongoAPIClient;
  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await axios.get(`${PF}results/Term One/${clas}`);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getResults();
  }, [clas]);

  // *******************************************************************************

  // COMPUTE TOTAL AND AVERAGE FOR EACH SUBJECT'S MARKS *****************************
  // function getTotalMarksForSubject(results: any, subject: any) {
  //   let totalMarks = 0;
  //   for (const exam of results.examresults) {
  //     for (const mark of exam.marks) {
  //       if (mark.subject === subject) {
  //         totalMarks += mark.marks;
  //       }
  //     }
  //   }
  //   return totalMarks;
  // }

  function getTotalMarksForSubject(results: any, subject: any) {
    let totalMarks = 0;
    let examCount = 0;
    for (const exam of results.examresults) {
      for (const mark of exam.marks) {
        if (mark.subject === subject) {
          totalMarks += mark.marks;
          examCount++;
        }
      }
    }
    const averageMarks = examCount > 0 ? totalMarks / examCount : 0;
    return { totalMarks, averageMarks };
  }

  // **************************************************

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          View Marks
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>View Result</Text>
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
                        Select class, exam and subject to view results
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

                {/* <CustomTable
                  clas={clas}
                  subject={subject}
                  exam={exam}
                  list={results}
                /> */}
                <Box>
                  <Text>Table with results will be here</Text>
                </Box>

                <Flex gap={3} ml={10}>
                  <Button colorScheme="teal" onClick={openReportModal}>
                    Generate Reports
                  </Button>
                  <Button colorScheme="facebook" onClick={handlePrint}>
                    Print Report
                  </Button>

                  {results.map((result) => (
                    <ReportModal
                      onOpen={onOpen}
                      onClose={onClose}
                      isOpen={isOpen}
                      reportRef={reportRef}
                      data={result}
                    />
                  ))}
                </Flex>
              </>
            )}
          </WrapItem>
        </Flex>
      </Box>

      {/* Report generated ***************************************************************************/}

      {clas && (
        <Box
          className="printable-component"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          ref={reportRef}
        >
          {results?.map((result: any) => (
            <Flex
              key={result._id}
              style={{ pageBreakInside: "avoid" }}
              alignItems="center"
              flexDirection={"column"}
              w="90%"
              justifyContent={"center"}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Box marginX={30}>
                  <Image w={70} h={70} borderRadius="50%" src={Logo} />
                </Box>

                <Box
                  mb={5}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Text fontWeight={"bold"} fontSize={22}>
                    RWEBIITA PREPARATORY SCHOOL
                  </Text>
                  <Text marginTop={-1} fontWeight={"bold"}>
                    P.O BOX 101, KABWOHE, SHEEMA DISTRICT
                  </Text>
                  <Text fontWeight={"bold"}>
                    TEL. 256-789-576065/704010650 Email: mkatusiimeh@gmail.com
                  </Text>
                  <Text fontWeight={"bold"}>
                    Website: www.rwebiitapreparatory.com
                  </Text>
                </Box>

                <Box marginX={30}>
                  <Image
                    w={70}
                    h={70}
                    borderRadius="50%"
                    src={result?.profileimage}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text
                  textTransform={"uppercase"}
                  fontWeight={"bold"}
                  marginTop={-5}
                  fontSize={18}
                >
                  END OF {result.termname} REPORT{" "}
                </Text>
              </Box>
              <Box>
                <Text>
                  Name:{" "}
                  <span
                    style={{
                      borderBottom: "1px dotted gray",
                      fontWeight: "bold",
                    }}
                  >
                    {`${result.firstname} ${result.lastname}`}{" "}
                  </span>
                  Class:{" "}
                  <span
                    style={{
                      borderBottom: "1px dotted gray",
                      fontWeight: "bold",
                    }}
                  >
                    {clas}{" "}
                  </span>{" "}
                  Term{" "}
                  <span
                    style={{
                      borderBottom: "1px dotted gray",
                      fontWeight: "bold",
                    }}
                  >
                    {result.termname}{" "}
                  </span>
                </Text>

                {/* <ReportTable result={result} /> */}
                <ExamResultsTable
                  len={results.length}
                  allresults={results}
                  getTotalMarksForSubject={getTotalMarksForSubject}
                  results={result}
                />
                <ReportTableExt />
              </Box>
              <Flex justifyContent="center">
                <Box>
                  <Text
                    textAlign={"center"}
                    fontSize={11}
                    // mb={20}
                    fontWeight="bold"
                  >
                    MOTTO: WE CARE, WE SHARE, WE LEARN TOGETHER
                  </Text>
                </Box>
              </Flex>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};