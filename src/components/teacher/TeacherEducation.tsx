import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

const TeacherEducation = ({ education, deleteEducation }: any) => {
  return (
    <Flex
      _hover={{ backgroundColor: "#eee" }}
      p={1}
      gap={2}
      justifyContent="space-between"
    >
      <Flex>
        <Box>
          <Flex>
            <Text fontSize={14} fontWeight="bold">
              University: {education.institution}
            </Text>
          </Flex>
          <Flex fontSize={14}>{education.certificate_obtained}</Flex>
        </Box>
      </Flex>

      <Flex>
        <Box>
          <Flex>
            <Text fontWeight={"bold"} fontSize={14}>
              {education.period_from} - {education.period_to}
            </Text>
          </Flex>
          <Flex fontSize={14}>
            <Text>Certificate # {education.certificate_number}</Text>
          </Flex>
        </Box>
      </Flex>

      <Flex>
        <IconButton
          colorScheme="red"
          size="sm"
          aria-label="Delete"
          onClick={() => deleteEducation(education.id)}
          icon={<BsTrash />}
        />
      </Flex>
    </Flex>
  );
};

export default TeacherEducation;
