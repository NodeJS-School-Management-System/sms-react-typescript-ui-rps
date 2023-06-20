import { Box, Flex } from "@chakra-ui/react";
import AddStudentRequirement from "./AddStudentRequirement";
import EnterStudentRequirements from "./EnterStudentRequirements";

const StudentRequirements = () => {
  return (
    <Box>
      <Flex gap={3}>
        <Box flex={1} h="100%">
          <AddStudentRequirement />
        </Box>
        <Box flex={1} h="100%">
          <EnterStudentRequirements />
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentRequirements;
