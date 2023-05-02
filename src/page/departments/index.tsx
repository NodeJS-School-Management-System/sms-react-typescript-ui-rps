import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Add, Home } from "@mui/icons-material";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { GiRadarCrossSection } from "react-icons/gi";
import { Link } from "react-router-dom";
import useTheme from "../../theme/useTheme";
import SingleDepartment from "./SingleDepartment";
import { useEffect, useState } from "react";
import { myAPIClient } from "../auth/axiosInstance";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase/firebase";
export interface TutorialProps {
  title: string;
  description: string;
  videoSrc: string;
  key: any;
}

const Departments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // CREATE NEW DEPARTMENT *******************************************************************
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(undefined);
  const [code, setCode] = useState("");
  const [subdeps, setSubDeps] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(image);
    }
  };

  const addNewDept = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newdept: any = {
      name,
      code,
      subdeps,
    };

    setIsLoading(true);
    if (image !== null) {
      const datai = new FormData();
      const fileName = Date.now() + image.name;
      datai.append("name", fileName);
      datai.append("file", image);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

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
              newdept.image = downloadURL;
            }
          );
          try {
            await myAPIClient.post("/departments", newdept, {
              headers: {
                token: `token ${localStorage.getItem("token")}`,
              },
            });

            setName("");
            setImage("");
            setCode("");
            setSubDeps("");

            setIsLoading(false);
            setSuccess(true);
            setError(false);
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
          }
        }
      );
    }
  };

  // ***************************************************************************************************

  // GET DEPARTMENTS ***********************************************************************************
  const [depts, setDeparts] = useState([]);
  useEffect(() => {
    const getDepts = async () => {
      try {
        const res = await myAPIClient.get("/departments", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDeparts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDepts();
  });

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box boxShadow={"md"} p={2}>
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
            Departments
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
          <GiRadarCrossSection style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Dashboard
          </Text>
        </Box>
      </Flex>

      <Flex gap={6} flexWrap="wrap" justify={"center"}>
        {depts.map((d: any) => (
          <SingleDepartment d={d} />
        ))}
      </Flex>
      <Box position="fixed" bottom="40px" right="40px">
        <IconButton
          bgColor={primaryColor.color}
          color="white"
          onClick={onOpen}
          aria-label="Add to database"
          icon={<Add />}
        />
      </Box>

      <>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={22} color={primaryColor.color}>
              Create New Department
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box w={"100%"}>
                <Flex
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Department Name <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(false);
                      setSuccess(false);
                    }}
                    type="text"
                    placeholder={"Department Name"}
                  />
                </Flex>

                <Flex
                  py={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Sub - Departments <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    required
                    type="text"
                    value={subdeps}
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setSubDeps(e.target.value);
                    }}
                    placeholder={"Sub-Departments"}
                  />
                </Flex>

                <Flex
                  py={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Department Code <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={code}
                    type="number"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setCode(e.target.value);
                    }}
                    placeholder={"Department Code"}
                  />
                </Flex>

                <Flex
                  py={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Department Image <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    border={"none"}
                    onChange={onUploadImage}
                    isRequired
                    type="file"
                  />
                </Flex>
                {error && (
                  <Alert p={6} w={"90%"} status="error">
                    <AlertIcon />
                    There was an error processing your request
                  </Alert>
                )}

                {success && (
                  <Alert p={6} w={"90%"} status="success">
                    <AlertIcon />
                    Success, department has been updated successfully!
                  </Alert>
                )}

                <Button
                  my={2}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={addNewDept}
                  backgroundColor={primaryColor.color}
                  color="white"
                  disabled={!name || !image || !code || !subdeps}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="white"
                    />
                  ) : (
                    "Add Department"
                  )}
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default Departments;
