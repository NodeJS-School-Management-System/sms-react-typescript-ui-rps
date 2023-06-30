import { Center, Flex, Heading, Text, WrapItem } from "@chakra-ui/react";

const AnalyticsBox = ({ item }: any) => {
  const isStudent = localStorage.getItem("isStudent");

  return (
    <WrapItem
      boxShadow={"base"}
      flex={1}
      gap={2}
      flexDirection={"column"}
      w={{ base: "100%", md: "50%", lg: "50%" }}
    >
      {isStudent !== "true" && (
        <Center flexDirection={"row"} w="100%" h={"110px"} boxShadow={"base"}>
          <Flex
            bgColor={item.bgColor}
            w={"30%"}
            h={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <item.icon style={{ color: "white", fontSize: 55 }} />
          </Flex>
          <Flex
            p={3}
            w={"70%"}
            h={"100%"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text
              fontSize={16}
              textAlign="center"
              fontWeight="bold"
              color={"gray"}
              mb={3}
            >
              {item.title}
            </Text>
            <Heading as="h4" fontSize={30}>
              {item.value.toLocaleString()}
            </Heading>
          </Flex>
        </Center>
      )}
    </WrapItem>
  );
};

export default AnalyticsBox;
