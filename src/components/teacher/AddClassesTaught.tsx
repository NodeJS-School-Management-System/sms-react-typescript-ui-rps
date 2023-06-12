import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTheme from "../../theme/useTheme";
import { myAPIClient } from "../auth/axiosInstance";
import { OptionalMaker } from "../student/add/AddStudent";
import ListOfClassesTaught from "./ListOfClassesTaught";

const AddClassesTaught = ({
  subject,
  setSubject,
  stream,
  setStream,
  classname,
  setClassname,
  isSubjectTeacher,
  setIsSubjectTeacher,
  classesTaught,
  addNewClass,
  deleteClass,
}: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // Get all subjects **************************************************************************
  const [subjectlist, setSubjectlist] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subjects/findall", {
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

  return (
    <Box w={"100%"}>
      <Flex gap={2} flexDirection={{ base: "column", lg: "row" }}>
        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Class Name<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <Select
              placeholder="Select Class"
              w="100%"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
            >
              {classlist?.map((c: any) => (
                <option key={c.classnumeral} value={c.classnumeral}>
                  {c.classnumeral}
                </option>
              ))}
            </Select>
          </InputGroup>
        </Center>

        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Subject Taught<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <Select
              w="100%"
              placeholder="Select Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjectlist?.map((subject: any) => (
                <option key={subject._id} value={subject.subjectname}>
                  {subject.subjectname}
                </option>
              ))}
            </Select>
          </InputGroup>
        </Center>
      </Flex>

      <Flex gap={2} flexDirection={{ base: "column", lg: "row" }}>
        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Stream
            <OptionalMaker />
          </FormLabel>
          <InputGroup>
            <Select
              placeholder="Select Stream"
              w="100%"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
            >
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
            </Select>
          </InputGroup>
        </Center>

        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel visibility={"hidden"} alignSelf={"flex-start"} mt={2}>
            Subject Teacher
          </FormLabel>
          <Flex mt={2} align={"center"} gap={2} justify="center">
            <input
              type="checkbox"
              value={isSubjectTeacher}
              onChange={(e) => setIsSubjectTeacher(!isSubjectTeacher)}
            />
            <span>Subject Teacher</span>
          </Flex>
        </Center>
      </Flex>

      <Flex mt={2}>
        <Button
          w={200}
          background={primaryColor.color}
          color="white"
          onClick={addNewClass}
          isDisabled={!classname || !subject}
        >
          Add
        </Button>
      </Flex>

      <Box pt={3} w="90%">
        <Box fontStyle={"italic"}>Class List</Box>
        <Divider />

        <Box>
          {classesTaught.length > 0 ? (
            classesTaught.map((classlist: any) => (
              <ListOfClassesTaught
                key={classlist.id}
                classlist={classlist}
                deleteClass={deleteClass}
              />
            ))
          ) : (
            <Box color="gray" fontSize={14}>
              No classes added yet!
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddClassesTaught;
