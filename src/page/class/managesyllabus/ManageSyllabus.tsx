import {
  Box,
  Text,
  IconButton,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { Delete, Download } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const ManageSyllabus = () => {
  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Text fontSize={25} fontWeight="bold" ml={3}>
          Syllabus
        </Text>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Manage Syllabus</Text>
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
              borderTop="3px solid blue"
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
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
                    Subject
                  </Text>
                  <Select placeholder="Select Class" w={"100%"}>
                    <option value="option1">Primary One</option>
                    <option value="option2">Primary Two</option>
                    <option value="option3">Primary Three</option>
                    <option value="option3">Primary Four</option>
                    <option value="option3">Primary Five</option>
                    <option value="option3">Primary Six</option>
                    <option value="option3">Primary Seven</option>
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
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid blue"
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
                  <Box>
                    <Box>
                      <Text p={2} fontSize={22} fontWeight="bold">
                        List of Subjects
                      </Text>
                    </Box>
                  </Box>

                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={19} fontWeight="bold">
                      File
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Downloaded
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
                      sample_sy.png
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      5
                    </Text>
                    <Flex gap={2}>
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete from database"
                        icon={<DeleteIcon />}
                      />
                      <IconButton
                        colorScheme="blue"
                        aria-label="Delete from database"
                        icon={<RemoveRedEyeIcon />}
                      />
                    </Flex>
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
