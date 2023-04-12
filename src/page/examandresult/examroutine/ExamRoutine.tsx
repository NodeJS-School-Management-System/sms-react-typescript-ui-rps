import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";

export const ExamRoutine = () => {
  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          View Routine
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>View Result</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              borderTop="3px solid #ccc"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <Text fontWeight={"bold"} fontSize="22" mx={3} mt={2}>
                  Get Result
                </Text>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Select Class
                  </Text>
                  <Select placeholder="Select Class" w={"100%"}>
                    <option value="option1">P1</option>
                    <option value="option2">P2</option>
                    <option value="option3">P3</option>
                    <option value="option3">P4</option>
                    <option value="option3">P5</option>
                    <option value="option3">P6</option>
                    <option value="option3">P7</option>
                  </Select>
                </Flex>
                <Button variant={"solid"} w="50%" mx={3} colorScheme={"teal"}>
                  Add
                </Button>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <Flex
                  overflowX={"auto"}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={19} fontWeight="bold">
                      Routine
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Published on
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Option
                    </Text>
                  </Flex>
                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={19} fontWeight="bold">
                      sample_ro.png
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      2022-08-01 21:20:17
                    </Text>
                    <Box
                      alignItems="center"
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Download />
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
