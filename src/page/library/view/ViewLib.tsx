import { Box, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import useTheme from "../../../theme/useTheme";

const ViewLib = () => {
  const {
    theme: { primaryColor },
  } = useTheme();
  return (
    <Flex flexDir={'column'}>
      <Flex justifyContent={"space-between"} pr={10}>
        <Box display={"flex"}>
          <Heading ml={3} as={"h5"} color={primaryColor.color}>
            View Library
          </Heading>
          <Text>SMS</Text>
        </Box>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Library</Text>
        </Flex>
      </Flex>
      <Box
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
        h={70}
        p={5}
        pl={0}
        my={3}
      >
        <Flex pt={5} align={"center"} justify="center" direction={"column"}>
        
          <Flex
            p={3}
            px={0}
            h={"100%"}
            direction="row"
            align={"center"}
            justify={"space-between"}
          >
            <Flex
              mb={2}
              p={3}
              px={0}
              w={"max-content"}
              h={"100%"}
              direction="row"
              align={"center"}
              justify={"flex-start"}
            >
              <Text
                ml={2}
                fontSize={17}
                fontWeight="bold"
                alignSelf={"flex-start"}
                color={"gray"}
                mb={3}
              >
                Show
              </Text>
              <Select mx={2} mb={4} placeholder="10" size={"sm"}>
                <option value="option2">50</option>
                <option value="option3">100</option>
                <option value="option3">500</option>
                <option value="option3">2000</option>
              </Select>
              <Text
                fontSize={20}
                fontWeight="bold"
                alignSelf={"flex-start"}
                color={"gray"}
                mb={3}
              >
                entries
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display="flex"
          alignItems={"center"}
          gap={2}
          justifyContent={"flex-end"}
        >
          <Text>Search</Text>
          <Input
            type="search"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            placeholder="Search.."
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default ViewLib;
