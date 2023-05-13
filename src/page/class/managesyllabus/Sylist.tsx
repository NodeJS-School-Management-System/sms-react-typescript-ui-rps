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

export const Sylist = ({ list, deleteSylabus, downloadImage }: any) => {
  const isLoading = false;
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
                  <Tr key={sylabus.sylabusId}>
                    <Td>{sylabus.subjectName}</Td>
                    <Td>
                      <Image
                        src={sylabus.subjectFile}
                        alt=""
                        borderRadius={"50%"}
                        width={25}
                        height={25}
                        m="auto"
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{sylabus.className}</Td>
                    <Td textAlign={"center"} m="auto">
                      <Td
                        textAlign={"center"}
                        m="auto"
                        display={"flex"}
                        gap={2}
                      >
                        <IconButton
                          colorScheme="red"
                          onClick={() => deleteSylabus(sylabus.sylabusId)}
                          aria-label="Delete from database"
                          icon={<DeleteIcon />}
                        />
                        <IconButton
                          colorScheme="blue"
                          aria-label="Download from database"
                          icon={<Download />}
                          onClick={() =>
                            downloadImage(sylabus.subjectFile, "sylabus")
                          }
                        />
                      </Td>
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
