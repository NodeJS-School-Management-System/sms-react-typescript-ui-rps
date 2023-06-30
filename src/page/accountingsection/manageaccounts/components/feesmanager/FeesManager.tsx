import { Box, Flex } from "@chakra-ui/react";
import AddFees from "./AddFees";
import AddStudentDetails from "./AddStudentDetails";

const FeesManager = () => {
  return (
    <Box>
      <Flex gap={3} flexDir={{base: "column", md: "row"}}>
        <Box flex={1} h="100%">
          <AddFees />
        </Box>
        <Box flex={1} h="100%">
          <AddStudentDetails />
        </Box>
      </Flex>
    </Box>
  );
};

export default FeesManager;
