import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { ExamList } from "./ExamList";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { Home, SquareSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ManageExam = () => {
  const token = localStorage.getItem("token");

  const [examDate, setExamDate] = useState("");
  const [examTimetable, setTimeTable] = useState<any>(undefined);
  const [runningTerm, setRunningTerm] = useState("");
  const [examName, setExamName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    theme: { primaryColor },
  } = useTheme();

  // UPLOAD IMAGE ***********************************************************************************
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTimeTable(e.target.files[0]);

      console.log(examTimetable);
    }
  };

  // Add new exam and its details ********************************************************************
  const [isDeleting, setIsDeleting] = useState(false);

  const addExam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newExam: any = {
      examDate,
      runningTerm,
      examName,
    };

    if (examTimetable !== null) {
      const datai = new FormData();
      const fileName = Date.now() + examTimetable?.name;
      datai.append("name", fileName);
      datai.append("file", examTimetable);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, examTimetable);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            newExam.examTimetable = downloadURL;
          });
          try {
            const res = await myAPIClient.post("/exams/create", newExam, {
              headers: {
                token: `Bearer ${token}`,
              },
            });
            console.log(res.data);
            toast.success("Success, exam had been added!");
            setExamDate("");
            setRunningTerm("");
            setExamName("");
            setTimeTable("");
            setIsLoading(false);
            setIsDeleting(!isDeleting);
          } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast.error(
              "Sorry, something went wrong adding exam, try again or contact admin!"
            );
          }
        }
      );
    }
  };
  // **********************************************************************************************

  // DELETE EXAM *********************************************************************
  const deleteExam = async (examId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`/exams/remove/${examId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };
  // ************************************************************************************

  // Get all exams
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get("/exams/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setExams(res.data);
        console.log(exams);
      } catch (err) {
        console.log(err);
      }
    };
    getExams();
  }, [isDeleting]);

  return (
    <Box>
      {/* <Flex justifyContent={"space-between"} pr={10}>
        <Box display={"flex"}>
          <Heading ml={3} as={"h5"} color={primaryColor.color}>
            Manage Examination
          </Heading>
          <Text>SMS</Text>
        </Box>

        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Exam</Text>
          <FaAngleRight />
          <Text fontSize={14}>Manage Exam</Text>
        </Flex>
      </Flex> */}

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
            Manage Exam
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
          <SquareSharp style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Manage Exam
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
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Exam Name<span style={{ color: "red" }}>*</span>
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
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Exam Date<span style={{ color: "red" }}>*</span>
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
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Exam Time Table<span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    isRequired
                    pt={1}
                    type="file"
                    onChange={onUploadImage}
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
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Running Term<span style={{ color: "red" }}>*</span>
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
                  backgroundColor={primaryColor.color}
                  onClick={addExam}
                  isDisabled={!examDate || !examTimetable || !examName}
                  color="white"
                >
                  {isLoading ? "Adding.." : "Add Exam"}
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
              <ExamList
                isDeleting={isDeleting}
                deleteExam={deleteExam}
                list={exams}
              />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
