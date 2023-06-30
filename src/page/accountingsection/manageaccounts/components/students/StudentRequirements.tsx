import { Box, Flex } from "@chakra-ui/react";
import AddStudentRequirement from "./AddStudentRequirement";
import EnterStudentRequirements from "./EnterStudentRequirements";

const StudentRequirements = () => {
  return (
    <Flex gap={3} flexDir={{ base: "column", md: "row" }}>
      <Box flex={1} h="100%">
        <AddStudentRequirement />
      </Box>
      <Box flex={1} h="100%">
        <EnterStudentRequirements />
      </Box>
    </Flex>
  );
};

export default StudentRequirements;
