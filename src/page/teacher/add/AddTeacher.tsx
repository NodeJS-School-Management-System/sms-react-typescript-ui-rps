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
  Select,
  Alert,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";
import {
  ClassOutlined,
  Countertops,
  DateRange,
  DepartureBoard,
  DirectionsTransit,
  Home,
  HomeMax,
  House,
  LocalActivity,
  Money,
  MoneyOff,
  NavigateNextSharp,
  Person,
  PersonAddAlt1,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneOutlined,
  StarOutlineSharp,
  WcOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { BiEnvelope } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../../../firebase/firebase";
import { OptionalMaker } from "../../../components/student/add/AddStudent";
import AddTeacherEducation from "../../../components/teacher/AddTeacherEducation";
import ClassesTaught from "../../../components/teacher/AddClassesTaught";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const AddTeacher = () => {
  const token = localStorage.getItem("token");

  // BIO DATA
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [profileimage, setProfileimage] = useState<any>(undefined);
  const [role, setRole] = useState("");
  const [password, setpassword] = useState("");
  const [nin, setNin] = useState("");
  const [department, setDepartment] = useState("");
  const [allowancerate, setAllowancerate] = useState("");
  const [allowance_amount, setAllowances] = useState<any>(0);
  const [salary, setSalary] = useState<any>(0);

  // Education Details
  const [institution, setInstitution] = useState("");
  const [institution_type, setInstitutionType] = useState("");
  const [certificate_obtained, setCertificateObtained] = useState("");
  const [certificate_number, setCertificateNumber] = useState("");
  const [period_from, setPeriodFrom] = useState("");
  const [period_to, setPeriodTo] = useState("");
  const [is_highest_qualification, setIsHighestQualification] = useState(false);
  const [educationDetails, setEducationDetails] = useState<any>([]);

  // Classes taught
  const [stream, setStream] = useState("");
  const [classname, setClassname] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubjectTeacher, setIsSubjectTeacher] = useState(false);
  const [classesTaught, setClassesTaught] = useState<any>([]);

  // ADDRESS
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [parish, setParish] = useState("");
  const [village, setVillage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // OBJECT CONTAINING CLASSES TAUGHT IS UPDATED HERE *********************

  const addNewEducation = () => {
    const isEducationExists = educationDetails.some(
      (item: any) =>
        item.certificate_number === certificate_number &&
        item.certificate_obtained === certificate_obtained &&
        item.institution === institution &&
        item.institution_type === institution_type &&
        item.is_highest_qualification === is_highest_qualification &&
        item.period_to === period_to &&
        item.period_from === period_from
    );

    if (isEducationExists) {
      toast.error(
        "Provided details already exist, try again with atleast one item different!"
      );
      return;
    }

    const newEducation = {
      institution,
      institution_type,
      certificate_number,
      certificate_obtained,
      is_highest_qualification,
      period_from,
      period_to,
      id: uuidv4(),
    };
    setEducationDetails((prevEducation: any) => [
      ...prevEducation,
      newEducation,
    ]);

    console.log(educationDetails);

    toast.success("Success, education has been added!");

    setInstitution("");
    setInstitutionType("");
    setPeriodFrom("");
    setCertificateObtained("");
    setCertificateNumber("");
    setPeriodTo("");
  };

  // DELETE CLASS DETAILS BY CLICKING DELETE ICON *********************
  const deleteClass = (id: any) => {
    setClassesTaught((prevClassesTaught: any) =>
      prevClassesTaught.filter((item: any) => item.id !== id)
    );
    toast.info("Success, class has been deleted!");
  };

  // OBJECT CONTAINING ACADEMIC DETAILS  IS UPDATED HERE *********************

  const addNewClass = () => {
    const isClassExists = classesTaught.some(
      (item: any) =>
        item.classname === classname &&
        item.subject === subject &&
        item.stream === stream &&
        item.isSubjectTeacher === isSubjectTeacher
    );

    if (isClassExists) {
      toast.error(
        "Provided details already exist, try again with atleast one item different!"
      );
      return;
    }

    const newClass = {
      classname,
      stream,
      subject,
      isSubjectTeacher,
      id: uuidv4(),
    };
    setClassesTaught((prevClassesTaught: any) => [
      ...prevClassesTaught,
      newClass,
    ]);

    toast.success("Success, class has been added!");

    setClassname("");
    setStream("");
    setSubject("");
  };

  // DELETE CLASS DETAILS BY CLICKING DELETE ICON *********************
  const deleteEducation = (id: any) => {
    setEducationDetails((prevEducation: any) =>
      prevEducation.filter((item: any) => item.id !== id)
    );
    toast.info("Success, class has been deleted!");
  };

  // GET ALL COUNTRIES *************************************
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");

        setCountryList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
  }, []);

  // ONCHANGE OF PROFILE IMAGE ***************************************

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileimage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(profileimage);
    }
  };

  // ADD NEW TEACHER *************************************
  const addTeacher = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const teacher = {
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      maritalstatus,
      contact,
      gender,
      dateofbirth,
      department,
      profileimage,
      NIN: nin,
      allowance_amount,
      allowance_type: allowancerate,
      classes_taught: classesTaught,
      educationdetails: educationDetails,
      address: {
        country,
        district,
        subcounty,
        county,
        parish,
        village,
      },
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
            teacher.profileimage = downloadURL;
          });
          try {
            const res = await myAPIClient.post(
              "/users/teachers/register",
              teacher,
              {
                headers: {
                  token: `token ${token}`,
                },
              }
            );

            console.log(res.data);

            setSuccess(true);
            setError(false);

            setIsLoading(false);

            setEmail("");
            setUsername("");
            setpassword("");
            setGender("");
            setClassname("");
            setDateofbirth("");
            setFirstname("");
            setLastname("");
            setRole("");
            setStream("");
            setSubject("");
            setProfileimage("");
            setContact("");
            setNin("");
            setSalary("");
            setProfileimage("");
            setAllowances("");
            setMaritalstatus("");
            setCountry("");
            setCounty("");
            setParish("");
            setSubCounty("");
            setVillage("");
            setDistrict("");
            setClassesTaught([]);
            setEducationDetails([]);
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
          }
        }
      );
    }
  };

  // REGISTER TEACHER ENDS HERE *********************************************************************

  // Get all classNames
  const [classes, setClasses] = useState<any>([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // Get all subjectNames
  const [subjects, setSubjects] = useState<any>([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subject", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

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
            Register Teacher
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
          <PersonAddAlt1 style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Add Teacher
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
          <Text
            textAlign={"center"}
            // color=""
            fontSize={{ base: 10, md: 13, lg: 16 }}
          >
            ***All the fields marked with * are required ***
          </Text>
        </Flex>

        <form
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-around"}
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <WrapItem
              flex={1}
              gap={2}
              // h="max-content"
              flexDirection={"column"}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            >
              <Box my={3} color={primaryColor.color} fontSize={19}>
                <span
                  style={{ borderBottom: `3px solid ${primaryColor.color}` }}
                >
                  {" "}
                  Bio
                </span>{" "}
                Data
              </Box>

              <Box color={primaryColor.color}>Bio:</Box>

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
                <FormLabel alignSelf={"flex-start"}>
                  Email<span style={{ color: "red" }}>*</span>
                </FormLabel>
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
                    type="date"
                    value={dateofbirth}
                    onChange={(e) => setDateofbirth(e.target.value)}
                    placeholder="Date of Birth"
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  NIN<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<NavigateNextSharp />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={nin}
                    maxLength={14}
                    onChange={(e) => setNin(e.target.value)}
                    placeholder="NIN Number"
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Department
                  <OptionalMaker />
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<DepartureBoard />}
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
                  Marital Status<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<StarOutlineSharp />}
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
                    type="number"
                    maxLength={10}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone Number"
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Role
                  <OptionalMaker />
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
                    placeholder="Role e.g Games Teacher"
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Password<span style={{ color: "red" }}>*</span>
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
                    placeholder="Password"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setpassword(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>
            </WrapItem>

            <WrapItem
              flexDirection={"column"}
              gap={2}
              flex={1}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              // h={"max-content"}
            >
              <Box my={3} color={primaryColor.color} fontSize={19}>
                <span
                  style={{ borderBottom: `3px solid ${primaryColor.color}` }}
                >
                  Compensation
                </span>{" "}
                & Other Details
              </Box>

              <Box color={primaryColor.color}>Address:</Box>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>Country</FormLabel>
                <InputGroup>
                  <Select
                    placeholder="Select Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    w={"100%"}
                  >
                    {countryList?.map((country: any) => (
                      <option
                        key={country.name.common}
                        value={country.name.common}
                      >
                        {country.name.common}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  District<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<DirectionsTransit />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  County<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<House />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={county}
                    placeholder="County"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setCounty(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Sub - County<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<Countertops />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={subcounty}
                    placeholder="Sub - County"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setSubCounty(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Parish<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<LocalActivity />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={parish}
                    placeholder="Parish"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setParish(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Village<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<HomeMax />}
                  />
                  <Input
                    isRequired
                    type="text"
                    value={village}
                    placeholder="Village"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setVillage(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Box color={primaryColor.color}>Compesation:</Box>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Base Salary(UGX)<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<Money />}
                  />
                  <Input
                    isRequired
                    type="number"
                    value={salary}
                    placeholder="Base Salary"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setSalary(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Box color={primaryColor.color}>Allowances:</Box>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Allowance Rate
                  <OptionalMaker />
                </FormLabel>
                <InputGroup>
                  <Select
                    placeholder="Allowance Rate"
                    w="100%"
                    value={allowancerate}
                    onChange={(e) => setAllowancerate(e.target.value)}
                  >
                    <option value={"Yearly"}>Yearly</option>
                    <option value={"Monthly"}>Monthly</option>
                    <option value={"Weekly"}>Weekly</option>
                    <option value={"Daily"}>Daily</option>
                  </Select>
                </InputGroup>
              </Center>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Allowances(UGX)
                  <OptionalMaker />
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    cursor={"pointer"}
                    pointerEvents="none"
                    color="gray.400"
                    width="2.5rem"
                    children={<MoneyOff />}
                  />
                  <Input
                    isRequired
                    type="number"
                    value={allowance_amount}
                    placeholder="Allowances"
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setAllowances(e.target.value);
                    }}
                  />
                </InputGroup>
              </Center>

              <Box color={primaryColor.color}>Other Details:</Box>

              <Center flexDirection={"column"} w="90%" h="100%">
                <FormLabel alignSelf={"flex-start"}>
                  Profile Image<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input onChange={onUploadImage} isRequired type="file" />
              </Center>
            </WrapItem>

            <WrapItem
              flex={1}
              gap={2}
              h="max-content"
              flexDirection={"column"}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            >
              <Box my={3} color={primaryColor.color} fontSize={19}>
                <span
                  style={{ borderBottom: `3px solid ${primaryColor.color}` }}
                >
                  {" "}
                  Education
                </span>{" "}
                & Classes Taught
              </Box>

              {/* Classes taught */}
              <Box color={primaryColor.color}>Classes Taught:</Box>
              <ClassesTaught
                subject={subject}
                setSubject={setSubject}
                classname={classname}
                setClassname={setClassname}
                stream={stream}
                setStream={setStream}
                isSubjectTeacher={isSubjectTeacher}
                setIsSubjectTeacher={setIsSubjectTeacher}
                classesTaught={classesTaught}
                addNewClass={addNewClass}
                deleteClass={deleteClass}
              />

              {/* Teacher's education */}
              <Box color={primaryColor.color}>Education:</Box>
              <AddTeacherEducation
                setPeriodTo={setPeriodTo}
                educationDetails={educationDetails}
                setIsHighestQualification={setIsHighestQualification}
                is_highest_qualification={is_highest_qualification}
                setPeriodFrom={setPeriodFrom}
                setCertificateNumber={setCertificateNumber}
                certificate_number={certificate_number}
                period_from={period_from}
                period_to={period_to}
                institution_type={institution_type}
                setInstitutionType={setInstitutionType}
                setInstitution={setInstitution}
                institution={institution}
                setCertificateObtained={setCertificateObtained}
                certificate_obtained={certificate_obtained}
                deleteEducation={deleteEducation}
                addNewEducation={addNewEducation}
              />

              {error && (
                <Alert p={6} w={"90%"} status="error">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              )}

              {success && (
                <Alert p={6} w={"90%"} status="success">
                  <AlertIcon />
                  Success, teacher has been added successfully!
                </Alert>
              )}

              <Button
                variant={"solid"}
                colorScheme={primaryColor.name}
                px={20}
                py={4}
                onClick={addTeacher}
                disabled={
                  !username ||
                  !password ||
                  !firstname ||
                  !lastname ||
                  !gender ||
                  !maritalstatus ||
                  !dateofbirth ||
                  !profileimage ||
                  !contact ||
                  !country ||
                  !county ||
                  !parish ||
                  !district ||
                  !subcounty ||
                  !village ||
                  !salary ||
                  educationDetails.length < 0
                }
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="white" />
                ) : (
                  "Add Teacher"
                )}
              </Button>
            </WrapItem>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
