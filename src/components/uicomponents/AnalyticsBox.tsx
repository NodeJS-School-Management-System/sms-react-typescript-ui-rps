import { Center, Flex, Heading, Text, WrapItem } from "@chakra-ui/react";


const AnalyticsBox = ({ item }: any) => {
//   const {
//     theme: { primaryColor },
//   } = useTheme();

  return (
    <WrapItem
      boxShadow={"base"}
      flex={1}
      gap={2}
      flexDirection={"column"}
      w={{ base: "100%", md: "50%", lg: "50%" }}
    >
      <Center flexDirection={"row"} w="100%" h="100%" boxShadow={"base"}>
        <Flex
          bgColor={item.bgColor}
          w={"30%"}
          h={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <item.icon style={{ color: "white", fontSize: 60 }} />
        </Flex>
        <Flex
          p={3}
          w={"70%"}
          h={"100%"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={20} fontWeight="bold" color={"gray"} mb={3}>
            {item.title}
          </Text>
          <Heading as="h2">{(item.value).toLocaleString()}</Heading>
        </Flex>
      </Center>
    </WrapItem>
  );
};

export default AnalyticsBox;
