import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormLabel,
  IconButton,
  Image,
  Input,
  Link,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase/firebase";
import { ArrowDropDownRounded, Delete, Edit } from "@mui/icons-material";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import useTheme from "../../theme/useTheme";
import { myAPIClient } from "../auth/axiosInstance";
const SingleDepartment = ({ d }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAdmin = localStorage.getItem("isAdmin");

  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(undefined);
  const [code, setCode] = useState<any>("");
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
      name: name ? name : d.name,
      code: code ? code : d.code,
      subdeps: subdeps ? subdeps : d.subdeps,
    };

    setIsLoading(true);
    if (image && image !== null) {
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
            await myAPIClient.put(`/departments/${d.deptId}`, newdept, {
              headers: {
                token: `token ${localStorage.getItem("token")}`,
              },
            });

            setName("");
            setImage("");
            setCode(0);
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
    } else {
      try {
        await myAPIClient.put(`/departments/${d.deptId}`, newdept, {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        });

        setName("");
        setImage("");
        setCode(0);
        setSubDeps("");

        setIsLoading(false);
        setSuccess(true);
        setError(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setSuccess(false);
        setIsLoading(false);
      }
    }
  };

  // *************************************************************************
  // DELETE DEPARTMENT *************************************************************************
  const deleteDept = async () => {
    try {
      const res = await myAPIClient.delete(`departments/${d.deptId}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // *************************************************************************

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const scale = isHovered ? "scale(1.03)" : "scale(1)";
  const bgColor = isHovered ? "darkblue" : "inherit";
  const {
    theme: { primaryColor },
  } = useTheme();
  return (
    <Box
      borderRadius={10}
      textDecor="none !important"
      display="flex"
      flexDirection={"column"}
      gap={3}
      pb={3}
      boxShadow={"md"}
      w={{ base: "95%", md: "50%", lg: "23%" }}
      transform={scale}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition="transform 0.3s ease-in-out"
    >
      <Box flex={1} bgColor={"white"}>
        <Image
          src={d.image}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          w="100%"
          h="8rem"
          objectFit={"cover"}
        />
      </Box>
      <Box flex={1}>
        <Box
          textAlign={"center"}
          fontSize={{ base: 18, md: 19, lg: 18 }}
          _hover={{ textDecoration: "none" }}
          color={bgColor}
          overflow="hidden"
          fontWeight={500}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          px={3}
        >
          {d.name} - {d.code}
        </Box>
        <Box>
          <List px={5}>
            {Array.isArray(d?.subdeps) &&
              d.subdeps.map((subd: any) => (
                <ListItem
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Flex>
                    <ArrowDropDownRounded
                      style={{
                        width: 20,
                        height: 20,
                        transform: "rotate(270deg)",
                      }}
                    />
                    <Link href={subd.redirect}>{subd.name}</Link>
                  </Flex>
                  <Flex>{subd.code}</Flex>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
      {isAdmin && (
        <Box
          display="flex"
          gap={2}
          justifyContent="flex-end"
          mr={4}
          alignItems="flex-end"
        >
          <IconButton
            backgroundColor={primaryColor.color}
            color="white"
            size="sm"
            onClick={onOpen}
            aria-label="Edit database"
            icon={<Edit />}
          />
          <IconButton
            backgroundColor="#f98"
            color="white"
            size="sm"
            onClick={deleteDept}
            aria-label="Delete database"
            icon={<Delete />}
          />
        </Box>
      )}

      <>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={22} color={primaryColor.color}>
              Update Department
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
                    placeholder={d.name}
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
                    placeholder={d.subdeps[0].name}
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
                    placeholder={d.code}
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
                  disabled={!name && !image && !code && !subdeps}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="white"
                    />
                  ) : (
                    "Update Department"
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

export default SingleDepartment;
