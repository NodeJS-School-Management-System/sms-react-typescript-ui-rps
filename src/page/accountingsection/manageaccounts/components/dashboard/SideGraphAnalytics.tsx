import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { ArrowDropUp } from "@mui/icons-material";

const SideGraphAnalytics = () => {
  return (
    <Center w={{ base: "80%", lg: "40%" }} h={100} boxShadow={"base"}>
      <Flex
        p={3}
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text alignSelf={"flex-start"} color={"gray"} mb={3}>
          Admin Costs
        </Text>
        <Box>
          <Flex gap={4}>
            <Box color="teal">5.6K</Box>
            <ArrowDropUp style={{ color: "teal" }} />
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};

export default SideGraphAnalytics;
