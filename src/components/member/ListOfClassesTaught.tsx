import { Box, Flex, IconButton, Text } from "@chakra-ui/react";

import { BsTrash } from "react-icons/bs";

const ListOfClassesTaught = ({ classlist, deleteClass }: any) => {
  return (
    <Flex
      py={4}
      mt={2}
      _hover={{ backgroundColor: "#eee" }}
      p={1}
      gap={2}
    >
      <Flex flex={1}>
        <Box>
          <Text fontSize={14} fontWeight="bold">
            Class: {classlist.classname}:
          </Text>
          <Text fontSize={14} fontWeight="bold">
            Stream: {classlist.stream ? classlist.stream : "N/A"}:
          </Text>
        </Box>
      </Flex>

      <Flex flex={1}>
        <Text fontSize={14}>{classlist.subject}</Text>
      </Flex>

      <Flex flex={1} gap={1} align="start" justify={"flex-end"}>
        {/* <IconButton
          colorScheme="blue"
          aria-label="Edit"
          icon={<Edit />}
          size="sm"
          onClick={() =>
            updateClass(
              // classlist.classname,
              "Test Class",
              classlist.stream,
              classlist.subject
            )
          }
        /> */}

        <IconButton
          colorScheme="red"
          size="sm"
          aria-label="Delete"
          icon={<BsTrash />}
          onClick={() => deleteClass(classlist.id)}
        />
      </Flex>
    </Flex>
  );
};

export default ListOfClassesTaught;
