import {
  Box,
  Text,
  IconButton,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Heading,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { Class, ClassOutlined, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../auth/axiosInstance";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { Sylist } from "./Sylist";

export const ManageSyllabus = () => {
  // GET ALL CLASSES FROM DB***********************************************************************
  const [classUpdate, setClassUpdate] = useState("");

  const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClasslist(res.data);
        console.log(classlist);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  const [subjectlist, setSubjectlist] = useState([]);
  // Get all subjects **************************************************************************
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subject", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSubjectlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

  const [subjectName, setSubjectName] = useState("");
  // IMAGE UPLOAD ***************************************************
  const [fileImg, setFileImg] = useState<any>(undefined);
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileImg(e.target.files[0]);
      console.log(fileImg);
    }
  };

  // CREATE SYLABUS ************************************************************************
  const addSylabus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const sylabus: any = {
      className: classUpdate,
      subjectName,
    };

    if (fileImg !== null) {
      const datai = new FormData();
      const fileName = Date.now() + fileImg.name;
      datai.append("name", fileName);
      datai.append("file", fileImg);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileImg);

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
          await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: any) => {
              console.log(downloadURL);
              sylabus.subjectFile = downloadURL;
            }
          );
          try {
            const res = await myAPIClient.post("/sylabus", sylabus, {
              headers: {
                token: `token ${localStorage.getItem("token")}`,
              },
            });
            console.log(res.data);
            setClassUpdate("");
            setSubjectName("");
          } catch (err) {}
        }
      );
    }
  };

  // DELETE SYLABUS *************************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteSylabus = async (id: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`/sylabus/${id}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      setIsDeleting(false);
      console.log(err);
    }
  };

  // GET ALL SULABUS ************************************************************************
  const [sylist, setSylist] = useState([]);

  useEffect(() => {
    const getSylabus = async () => {
      try {
        const res = await myAPIClient.get("/sylabus", {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setSylist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSylabus();
  }, [isDeleting]);

  // DOWNLOAD FILE *********************************************************************
  function downloadImage(url: string, fileName: any) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
        my={3}
      >
        <Box display={"flex"}>
          <Heading as={"h5"} color={primaryColor.color}>
            Manage Sylabus
          </Heading>
          <Text>SMS</Text>
        </Box>
        <Box display={"flex"} alignItems="center" gap={2}>
          <Home />
          <Link to="/">
            <Text fontWeight="bold" fontSize={14}>
              Home
            </Text>
          </Link>
          <FaAngleRight />
          <Class />
          <Text fontWeight="bold" fontSize={14}>
            Class
          </Text>
          <FaAngleRight />
          <ClassOutlined />
          <Text fontWeight="bold" fontSize={14}>
            Manage Sylabus
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
                    Select Class <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    value={classUpdate}
                    placeholder={"Select Class"}
                    onChange={(e) => {
                      setClassUpdate(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classlist?.map((c: any) => (
                      <option key={c.classroomId}>{c.className}</option>
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
                    Select Subject <span style={{ color: "red" }}>*</span>
                  </Text>

                  <Select
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Select Subject"
                    w={"100%"}
                  >
                    {subjectlist.map((subject: any) => (
                      <option
                        key={subject.subjectId}
                        value={subject.subjectName}
                      >
                        {subject.subjectName}
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
                  <FormLabel alignSelf={"flex-start"}>
                    Upload Image<span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    border={"none"}
                    onChange={onUploadImage}
                    isRequired
                    type="file"
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={addSylabus}
                  disabled={!classUpdate || !subjectName}
                  backgroundColor={primaryColor.color}
                  color="white"
                >
                  Add Sylabus
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
                        List of Subjects & Sylabus
                      </Text>
                    </Box>
                  </Box>

                  <Sylist
                    downloadImage={downloadImage}
                    deleteSylabus={deleteSylabus}
                    list={sylist}
                  />
                </Flex>
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
