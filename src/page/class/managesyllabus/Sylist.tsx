import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Spinner,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";

export const Sylist = ({
  list,
  isLoading,
  deleteSylabus,
  downloadImage,
}: any) => {
  // const isLoading = false;
  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer w="100%">
          <Table variant="simple">
            <TableCaption>Sylabus List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Subject</Th>
                <Th fontSize={14}>File</Th>
                <Th fontSize={14}>Class</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((sylabus: any) => (
                  <Tr key={sylabus._id}>
                    <Td>{sylabus.subjectname}</Td>
                    <Td>
                      <Image
                        src={sylabus.sylabusfile}
                        alt=""
                        borderRadius={"50%"}
                        width={25}
                        height={25}
                        m="auto"
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{sylabus.classname}</Td>
                    <Td textAlign={"center"}>
                      <Flex align={"center"} justify="center" gap={2}>
                        <IconButton
                          colorScheme="red"
                          size={"sm"}
                          onClick={() => deleteSylabus(sylabus._id)}
                          aria-label="Delete from database"
                          icon={<DeleteIcon />}
                          mr={2}
                        />
                        <IconButton
                          colorScheme="blue"
                          aria-label="Download from database"
                          icon={<Download />}
                          size={"sm"}
                          onClick={() =>
                            downloadImage(sylabus.sylabusfile, "sylabus")
                          }
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
