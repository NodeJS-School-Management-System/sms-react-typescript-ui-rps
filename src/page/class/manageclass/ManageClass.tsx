import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Heading,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClassOutlined, Home } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { ClassList } from "./ClassList";
import { myAPIClient } from "../../../components/auth/axiosInstance";
// import { ClassModal } from "./ClassModal";

export const ManageClass = () => {
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [classNumeral, setClassNumeral] = useState("");
  const [className, setClassName] = useState("");
  const [classUpdate, setClassUpdate] = useState("");
  const [classTeacher, setClassTeacher] = useState("");

  // DELETE CLASS FROM DB ***************************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteClass = async (classroomId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(
        `/classrooms/remove/${classroomId}`,
        {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };
  // ************************************************************************************

  // Get all teachers ***********************************************************************
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  // Get all classes registered *************************************************************
  const [classlist, setClasslist] = useState([]);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    const getClasses = async () => {
      setIsLoading(true);
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasslist(res.data);
        console.log(classlist);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getClasses();
  }, [isDeleting, refetching]);

  // Add a new classroom
  const addClass = async () => {
    const newClass = {
      classnumeral: classNumeral,
      classname: className,
    };

    try {
      await myAPIClient.post("/classrooms/create", newClass, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      toast.success("Success, class has been created!");
      setClassName("");
      setClassNumeral("");
      setRefetching(true);
    } catch (err) {
      console.log(err);
      toast.error("Sorry, error adding class, try again or contact admin!");
    }
  };

  // Fetch classroom by className
  const [selectedClass, setSelectedClass] = useState<any>([]);
  useEffect(() => {
    const getClass = async () => {
      try {
        const res = await myAPIClient.get(`/classrooms/find/${classUpdate}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setSelectedClass(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    classUpdate && getClass();
  }, [classUpdate]);

  // Update classroom according to the id of the selected class
  const updateClassroom = async () => {
    try {
      await myAPIClient.put(
        `/classrooms/updateclass/${selectedClass.classnumeral}`,
        { classteacher: classTeacher },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setRefetching(!refetching);
      toast.success("Success, class teacher has been assigned!");
      setClassTeacher("");
      setClassUpdate("");
    } catch (err) {
      console.log(err);
      toast.error(
        "Sorry, error assigning class teacher, try again or contact admin!"
      );
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
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 32 }}
            color={primaryColor.color}
          >
            Manage Class
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
            Manage Class
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="base"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={3}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              pb={4}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    Running Class
                  </Text>
                </Box>
              </Flex>
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
                    Class In Numeric
                  </Text>
                  <Input
                    type="text"
                    value={classNumeral}
                    onChange={(e) => setClassNumeral(e.target.value)}
                    placeholder={"Class"}
                    w={"100%"}
                  />
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
                    Class Name
                  </Text>
                  <Input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder={"Class Name"}
                    w={"100%"}
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={primaryColor.name}
                  onClick={addClass}
                  disabled={!className || !classNumeral}
                >
                  Add Class
                </Button>
              </Box>
            </Center>
            <Center
              flexDirection={"column"}
              boxShadow={"base"}
              borderRadius={2}
              pb={4}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    textAlign="center"
                    fontSize={18}
                    color={"white"}
                    fontWeight="bold"
                  >
                    Assign Class Teacher
                  </Text>
                </Box>
              </Flex>
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
                    value={classUpdate}
                    placeholder={"Select Class"}
                    onChange={(e) => {
                      setClassUpdate(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classlist?.map((c: any) => (
                      <option key={c._id}>{c.classnumeral}</option>
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
                    Select Teacher
                  </Text>
                  <Select
                    value={classTeacher}
                    placeholder="Select Teacher"
                    onChange={(e) => {
                      if (e.target.value) {
                        setClassTeacher(e.target.value);
                      }
                    }}
                  >
                    {teacher.map((option: any) => (
                      <option
                        key={option._id}
                        value={`${option.firstname} ${option.lastname}`}
                      >
                        {option.firstname} {option.lastname}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Button
                  variant={"solid"}
                  w={"70%"}
                  mx={3}
                  colorScheme={primaryColor.name}
                  onClick={updateClassroom}
                  disabled={!classUpdate || !classTeacher}
                >
                  Assign Teacher
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
              borderTop={`3px solid ${primaryColor.color}`}
              height="auto"
              w="90%"
              h="100%"
            >
              <ClassList
                isLoading={isLoading}
                deleteClass={deleteClass}
                list={classlist}
              />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
