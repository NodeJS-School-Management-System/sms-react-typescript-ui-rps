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
import useTheme from "../../../theme/useTheme";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";

export const ManageExam = () => {
  const token = localStorage.getItem("token");

  const [examDate, setExamDate] = useState("");
  const [examTimetable, setTimeTable] = useState<any>(undefined);
  const [runningTerm, setRunningTerm] = useState("");
  const [examName, setExamName] = useState("");

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

  const addExam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newExam: any = {
      examDate,
      runningTerm,
      examName,
    };

    if (examTimetable !== null) {
      const datai = new FormData();
      const fileName = Date.now() + examTimetable.name;
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
            const res = await myAPIClient.post("/exams", newExam, {
              headers: {
                token: `Bearer ${token}`,
              },
            });
            console.log(res.data);
            setExamDate("");
            setRunningTerm("");
            setExamName("");
            setTimeTable("");
          } catch (err) {
            console.log(err);
          }
        }
      );
    }
  };
  // **********************************************************************************************

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
        console.log(res.data);
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
                  backgroundColor={primaryColor.color}
                  onClick={addExam}
                  color="white"
                >
                  Add Exam
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
              <ClassList list={classlist} />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
