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
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";
export const ExamList = ({ list, query, deleteExam }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [clickedId, setClickedId] = useState("");

  // const openModal = (id: any) => {
  //   setClickedId(id);
  //   onOpen();
  // };

  const isLoading = false;

  // DOWNLOAD FILE *********************************************************************
  function downloadImage(url: string, fileName: any) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Exam List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Exam Name</Th>
                <Th fontSize={14}>Exam Date</Th>
                <Th fontSize={14}>Running Term</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list &&
                list.map((exam: any) => (
                  <Tr key={exam.examId}>
                    <Td>{exam.examName}</Td>
                    <Td>{exam.examDate}</Td>
                    <Td>{exam.runningTerm || "N/A"}</Td>
                    <Td>
                      <Td display={"flex"} gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => deleteExam(exam.examId)}
                          icon={<BiTrashAlt />}
                        />
                        <IconButton
                          colorScheme="blue"
                          onClick={() =>
                            downloadImage(exam.examTimetable, "timetable")
                          }
                          aria-label="Edit database"
                          icon={<Download />}
                        />
                        {/* <Box>
                          {isOpen ? (
                            <ClassProfile
                              id={clickedId}
                              classroom={clas}
                              onOpen={onOpen}
                              onClose={onClose}
                              isOpen={isOpen}
                            />
                          ) : null}
                        </Box> */}
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
