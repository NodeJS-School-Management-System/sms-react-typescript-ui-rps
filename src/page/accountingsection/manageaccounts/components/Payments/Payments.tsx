import { Box, Flex } from "@chakra-ui/react";
import AddStudentDetails from "../feesmanager/AddStudentDetails";
import AddPayments from "./AddPayment";

const Payments = () => {
  return (
    <Box>
      <Flex gap={3}>
        <Box flex={1} h="100%">
          <AddPayments />
        </Box>
        <Box flex={1} h="100%">
          <AddStudentDetails />
        </Box>
      </Flex>
    </Box>
  );
};

export default Payments;
