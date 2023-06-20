import { Box, Flex } from "@chakra-ui/react";
import ReusableAddItem from "../reusable/ReusableAddItem";
import ReusableAnalytics from "../reusable/ReusableAnalytics";

const Purchases = () => {
  const tableHeaders = [
    "Item Purchased",
    "Amount Spent",
    "Date Purchased",
    // "Supplier Name",
    // "Balance Amount",
    "Action",
  ];

  return (
    <Flex w="100%" gap={2}>
      <Box boxShadow="md" flex={1}>
        <ReusableAddItem itemname="Purchases" />
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

export default Purchases;
