import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { ViewStreamOutlined } from "@mui/icons-material";
import useTheme from "../../theme/useTheme";
import { OptionalMaker } from "../student/add/AddStudent";
import MemberEducation from "./MemberEducation";

const AddTeacherEducation = ({
  institution,
  institution_type,
  setInstitution,
  setInstitutionType,
  setIsHighestQualification,
  setCertificateNumber,
  certificate_number,
  period_from,
  period_to,
  setPeriodFrom,
  setPeriodTo,
  is_highest_qualification,
  certificate_obtained,
  setCertificateObtained,
  addNewEducation,
  deleteEducation,
  educationDetails,
}: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box w={"100%"}>
      <Flex gap={2} flexDir={{ base: "column", lg: "row" }}>
        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Institution:<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              cursor={"pointer"}
              pointerEvents="none"
              color="gray.400"
              width="2.5rem"
              children={<ViewStreamOutlined />}
            />
            <Input
              isRequired
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g Global Secondary"
            />
          </InputGroup>
        </Center>

        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Institution Type:<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <Select
              placeholder="Instituion Type"
              value={institution_type}
              onChange={(e) => setInstitutionType(e.target.value)}
            >
              <option value={"University"}>University</option>
              <option value={"Institute"}>Institute</option>
              <option value={"High School"}>High School</option>
              <option value={"Primary School"}>Primary School</option>
            </Select>
          </InputGroup>
        </Center>
      </Flex>

      <Flex flexDir={{ base: "column", lg: "row" }} gap={2}>
        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Period: From<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              cursor={"pointer"}
              pointerEvents="none"
              color="gray.400"
              width="2.5rem"
              children={<ViewStreamOutlined />}
            />
            <Input
              isRequired
              type="date"
              value={period_from}
              onChange={(e) => setPeriodFrom(e.target.value)}
            />
          </InputGroup>
        </Center>

        <Center
          flexDirection={"column"}
          w={{ base: "90%", lg: "45%" }}
          h="100%"
        >
          <FormLabel alignSelf={"flex-start"} mt={2}>
            Period: To<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              cursor={"pointer"}
              pointerEvents="none"
              color="gray.400"
              width="2.5rem"
              children={<ViewStreamOutlined />}
            />
            <Input
              isRequired
              type="date"
              value={period_to}
              onChange={(e) => setPeriodTo(e.target.value)}
            />
          </InputGroup>
        </Center>
      </Flex>

      <Flex flexDir="column">
        <Flex flexDir={{ base: "column", lg: "row" }} gap={2}>
          <Center
            flexDirection={"column"}
            w={{ base: "90%", lg: "45%" }}
            h="100%"
          >
            <FormLabel alignSelf={"flex-start"} mt={2}>
              Certificate Obtained:<span style={{ color: "red" }}>*</span>
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                cursor={"pointer"}
                pointerEvents="none"
                color="gray.400"
                width="2.5rem"
                children={<ViewStreamOutlined />}
              />

              <Input
                isRequired
                type="text"
                value={certificate_obtained}
                placeholder="e.g UACE"
                onChange={(e) => setCertificateObtained(e.target.value)}
              />
            </InputGroup>
          </Center>

          <Center
            flexDirection={"column"}
            w={{ base: "90%", lg: "45%" }}
            h="100%"
          >
            <FormLabel alignSelf={"flex-start"} mt={2}>
              Certificate Number:<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"}
                pointerEvents="none"
                color="gray.400"
                width="2.5rem"
                children={<ViewStreamOutlined />}
              />
              <Input
                isRequired
                type="text"
                value={certificate_number}
                placeholder="Cert. Number"
                onChange={(e) => setCertificateNumber(e.target.value)}
              />
            </InputGroup>
          </Center>
        </Flex>
        <Box flexDirection={"column"} w={{ base: "90%" }} h="100%">
          <Flex mt={2} align={"center"} gap={5} justify="flex-start">
            <input
              type="checkbox"
              value={is_highest_qualification}
              onChange={(e) =>
                setIsHighestQualification(!is_highest_qualification)
              }
            />
            <span>
              Highest Qualification
              <OptionalMaker />
            </span>
          </Flex>
        </Box>
      </Flex>

      <Flex>
        <Button
          isDisabled={
            !certificate_number ||
            !certificate_obtained ||
            !institution ||
            !institution_type ||
            !period_from ||
            !period_to
          }
          w={200}
          my={2}
          backgroundColor={primaryColor.color}
          color={"white"}
          onClick={addNewEducation}
        >
          ADD
        </Button>
      </Flex>

      <Box>
        <Box fontStyle={"italic"}>Education List</Box>
        <Divider />

        <Box>
          {educationDetails.length > 0 ? (
            educationDetails.map((education: any) => (
              <MemberEducation
                key={education.key}
                education={education}
                deleteEducation={deleteEducation}
              />
            ))
          ) : (
            <Box color="gray" fontSize={14}>
              No education added yet!
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddTeacherEducation;
