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
  Heading,
} from "@chakra-ui/react";
import ReportModal from "./ReportModal";
import Logo from "../../../assets/logo.png";
import { FaAngleRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import ReportTableExt from "./ReportTableExt";
import ExamResultsTable from "./ExamResultsTable";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import { CustomTable } from "./CustomTable";
import { ClassOutlined, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ViewResult = () => {
  const reportRef = useRef<any>();

  const [showReport, setShowReport] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Report",
  });

  const token = localStorage.getItem("token");
  const [insertClicked, setInsertClicked] = useState(false);

  const [clas, setClas] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");

  const {
    theme: { primaryColor },
  } = useTheme();

  // useDisclosure hook for controlling opening and closing of a chakraui modal *****
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function for opening the reports modal *************************************************
  // const openReportModal = useCallback(() => {
  //   onOpen();
  // }, []);

  // *****************************************************************************************

  // Fetch all classes in the db ************************************************************
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

  // ****************************************************************************************

  // Fetch all exams in the db ***************************************************************
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get(`/exams/findall`, {
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

  // ****************************************************************************************

  // Get results by classname(selecting a class from dropdown)***********************
  const [termname, setTermname] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await myAPIClient.get(
          `/marks/findbyclassandterm/${clas}/${termname}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    clas && termname && getResults();
  }, [clas, termname]);

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
    // let totalMarks = 0;
    // let examCount = 0;
    // for (const exam of results?.marks) {
    //   for (const mark of exam?.marks) {
    //     if (mark.subject === subject) {
    //       totalMarks += mark.marks;
    //       examCount++;
    //     }
    //   }
    // }
    // const averageMarks = examCount > 0 ? totalMarks / examCount : 0;
    // return { totalMarks, averageMarks };
  }

  // ********************************************************************

  const filterInfo = () => {
    const requiredIndex = results.findIndex((student: any) => {
      const markIndex = student.marks.findIndex((mark: any) => {
        return (
          mark.subjectname === subject &&
          mark.examname === exam &&
          student.termname.toLowerCase() === termname.toLowerCase()
        );
      });
      return markIndex !== -1;
    });

    console.log(subject, exam, termname);
    console.log(requiredIndex);

    return requiredIndex;
  };

  return (
    <Box overflow={"hidden"}>
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
            View Marks
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
          <ClassOutlined style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            View Result
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
                      setClas(e.target.value);
                      setShowReport(false);
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
                    Select Term
                  </Text>
                  <Select
                    placeholder="Select Term"
                    onChange={(e) => {
                      setTermname(e.target.value);
                    }}
                    w={"100%"}
                    value={termname}
                  >
                    <option value={"Term One"}>Term One</option>
                    <option value={"Term Two"}>Term Two</option>
                    <option value={"Term Three"}>Term Three</option>
                  </Select>
                </Flex>

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
                  onClick={() => {
                    setInsertClicked(true);
                    filterInfo();
                  }}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  backgroundColor={primaryColor.color}
                  color="white"
                  disabled={!clas || !subject || !exam}
                >
                  View Marks
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
                    alignItems="center"
                    bg={primaryColor.color}
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
                  {exam} {subject} Results - For {clas}
                </Text>
                <Box m="auto">
                  <CustomTable
                    subject={subject}
                    exam={exam}
                    termname={termname}
                    results={results}
                  />
                </Box>

                <Flex
                  gap={3}
                  ml={10}
                  align="center"
                  justify={"center"}
                  w="100%"
                >
                  <Box
                    display="flex"
                    gap={4}
                    alignItems="center"
                    justifyContent={"center"}
                    flexDirection="column"
                  >
                    <Button colorScheme="teal">
                      View All Results for {clas}
                    </Button>
                    <Button
                      m="auto"
                      colorScheme="facebook"
                      onClick={() => {
                        setShowReport(true);
                        handlePrint();
                      }}
                    >
                      Generate Reports for {clas}
                    </Button>
                  </Box>

                  {results.map((result: any) => (
                    <ReportModal
                      key={result._id}
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
            display: showReport ? "flex" : "none",
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
              w="95%"
              h="100%"
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
                    {result.studentname}
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
