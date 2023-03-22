import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  Input,
  WrapItem,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Button,
  AlertIcon,
  Alert,
  CircularProgress,
} from "@chakra-ui/react";
import {
  ClassOutlined,
  DateRange,
  Home,
  Person,
  PersonAddAlt1,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneOutlined,
  SchoolOutlined,
  WcOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  MongoAPIClient,
  myAPIClient,
} from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import axios from "axios";

export const AddNTStaff = () => {
  const PF = MongoAPIClient;

  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [department, setDepartment] = useState("");
  const [profileimage, setProfileimage] = useState<any>(undefined);
  const [role, setRole] = useState("");
  const [rank, setRank] = useState("");
  const [educationlevel, setEducationlevel] = useState("");
  const [password, setpassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileimage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(profileimage);
    }
  };

  const addmember = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const member = {
      username,
      firstname,
      lastname,
      email,
      password,
      rank,
      role,
      maritalstatus,
      contact,
      gender,
      address,
      educationlevel,
      department,
      dateofbirth,
      profileimage,
    };

    setIsLoading(true);
    if (profileimage !== null) {
      const datai = new FormData();
      const fileName = Date.now() + profileimage.name;
      datai.append("name", fileName);
      datai.append("file", profileimage);

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, profileimage);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            member.profileimage = downloadURL;
          });
          try {
            await myAPIClient.post("/upload", datai, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          } catch (err) {
            setError(true);
            setSuccess(false);
          }

          setIsLoading(true);
          try {
            const res = await myAPIClient.post("/nonteachingstaff", member, {
              headers: {
                token: `token ${token}`,
              },
            });

            console.log(res.data);

            // Also interact with mongo ********************************************************
            try {
              const res = await axios.post(`${PF}staff/registerstaff`, member);
              console.log(res.data);
            } catch (err) {
              console.log(err);
            }

            setIsLoading(false);
            setSuccess(true);
            setError(false);

            setEmail("");
            setUsername("");
            setpassword("");
            setGender("");
            setEducationlevel("");
            setDateofbirth("");
            setFirstname("");
            setLastname("");
            setRole("");
            setRank("");
            setDepartment("");
            setProfileimage("");
            setContact("");
            setAddress("");
            setMaritalstatus("");
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
          }
        }
      );

      // Upload IMage to uploads folder on the backend **********************************************
      // This will be replaced by firebase and then commented out later *****************************
      // try {
      //   await myAPIClient.post("/upload", datai, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      // } catch (err) {
      //   setError(true);
      //   setSuccess(false);
      // }
    }
  };

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
            Non Teaching Staff Registration
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
          <PersonOutline />
          <Text fontWeight="bold" fontSize={14}>
            NTStaff
          </Text>
          <FaAngleRight />
          <PersonAddAlt1 />
          <Text fontWeight="bold" fontSize={14}>
            Add NTStaff
          </Text>
        </Box>
      </Flex>

      <Box boxShadow="base" p={4}>
        <Flex
          align="center"
          justify={"center"}
          borderRadius={3}
          bg="#fcc107"
          w="95%"
          p={4}
          h={50}
        >
          <Text textAlign={"center"}>
            *************All the fields marked with * are required ***********
          </Text>
        </Flex>
        <form
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <WrapItem
            flex={1}
            gap={2}
            flexDirection={"column"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                First Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<PersonOutlineOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={firstname}
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setFirstname(e.target.value);
                  }}
                  placeholder="First Name"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Last Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<PersonOutline />}
                />
                <Input
                  isRequired
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Username<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<Person />}
                />
                <Input
                  isRequired
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<BiEnvelope />}
                />
                <Input
                  isRequired
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </InputGroup>
            </Center>

            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Role<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ClassOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>Rank</FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ClassOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="Rank"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Address<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<Home />}
                />
                <Input
                  isRequired
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Contact<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<Phone />}
                />
                <Input
                  isRequired
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone"
                />
              </InputGroup>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Education Level<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<SchoolOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={educationlevel}
                  onChange={(e) => setEducationlevel(e.target.value)}
                  placeholder="Education Level"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Marital Status<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<PhoneOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={maritalstatus}
                  onChange={(e) => setMaritalstatus(e.target.value)}
                  placeholder="Marital Status"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Department<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<ClassOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Date of Birth<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<DateRange />}
                />
                <Input
                  isRequired
                  type="text"
                  value={dateofbirth}
                  onChange={(e) => setDateofbirth(e.target.value)}
                  placeholder="Date of Birth"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Gender<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<WcOutlined />}
                />
                <Input
                  isRequired
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender"
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                password<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  cursor={"pointer"}
                  pointerEvents="none"
                  color="gray.400"
                  width="2.5rem"
                  children={<GiPadlock />}
                />
                <Input
                  isRequired
                  type="text"
                  value={password}
                  // onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setpassword(e.target.value);
                  }}
                />
              </InputGroup>
            </Center>
            <Center flexDirection={"column"} w="90%" h="100%">
              <FormLabel alignSelf={"flex-start"}>
                Profile Image<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                border={"none"}
                onChange={onUploadImage}
                isRequired
                type="file"
              />
            </Center>

            {error && (
              <Alert p={6} w={"90%"} status="error">
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}

            {success && (
              <Alert p={6} w={"90%"} status="success">
                <AlertIcon />
                Success, member has been added successfully!
              </Alert>
            )}

            <Button
              variant={"solid"}
              colorScheme={primaryColor.name}
              px={20}
              py={4}
              onClick={addmember}
              disabled={
                !username ||
                !password ||
                !firstname ||
                !lastname ||
                !gender ||
                !educationlevel ||
                !maritalstatus ||
                !address ||
                !dateofbirth ||
                !profileimage ||
                !contact ||
                !role ||
                !department
              }
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="white" />
              ) : (
                "Add Member"
              )}
            </Button>
          </WrapItem>
        </form>
      </Box>
    </Box>
  );
};
