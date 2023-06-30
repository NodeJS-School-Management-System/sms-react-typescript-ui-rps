import { Box, Flex } from "@chakra-ui/react";
import ReusableAnalytics from "../reusable/ReusableAnalytics";
import Graph from "./Graph";

const Dashboard = () => {
  const tableHeaders = ["Type", "Amount", "Previous Paid"];

  return (
    <Flex w="100%" gap={3} flexDirection={{ base: "column", lg: "row" }}>
      <Box flex={1} w={{ base: "100%", lg: "50%" }} boxShadow="md">
        <ReusableAnalytics captionText="KPI" tableHeaders={tableHeaders} />
      </Box>
      <Box boxShadow="md" w={{ base: "100%", lg: "50%" }} flex={1}>
        <Graph />
      </Box>
    </Flex>
  );
};

export default Dashboard;
