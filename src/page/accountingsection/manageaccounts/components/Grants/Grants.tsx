import { Box, Flex } from "@chakra-ui/react";
import ReusableAddItem from "../reusable/ReusableAddItem";
import ReusableAnalytics from "../reusable/ReusableAnalytics";

const Grants = () => {
  const tableHeaders = ["Grant Provider", "Amount", "Date Received", "Action"];

  return (
    <Flex w="100%" gap={2}>
      <Box boxShadow="md" flex={1}>
        <ReusableAddItem itemname="Grant" />
      </Box>
      <Box flex={1} boxShadow="md">
        <ReusableAnalytics
          tableHeaders={tableHeaders}
          captionText="List of Grants"
        />
      </Box>
    </Flex>
  );
};

export default Grants;
