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
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { BiTrashAlt } from "react-icons/bi";
import EditModal from "./EditModal";
import { useState } from "react";

export const ClassFeesList = ({ list, isLoading, deleteClassFee }: any) => {
  const [selectedId, setSelectedId] = useState("");
  const openModel = (id: any) => {
    setSelectedId(id);
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Fees List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Class Name</Th>
                <Th fontSize={14}>Amount</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {list?.map((fee: any) => (
                <Tr key={fee?.classfeeId}>
                  <Td>{fee?.class}</Td>
                  <Td>{fee?.amount}</Td>
                  <Td>
                    <Td
                      display={"flex"}
                      justifyContent="center"
                      m="auto"
                      textAlign={"center"}
                      gap={2}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        onClick={() => deleteClassFee(fee?.classfeeId)}
                        icon={<BiTrashAlt />}
                      />

                      <IconButton
                        colorScheme="blue"
                        onClick={() => openModel(fee?.classfeeId)}
                        aria-label="Edit database"
                        icon={<Edit />}
                      />
                      <Box display="none">
                        {isOpen ? (
                          <EditModal
                            item={fee}
                            onOpen={onOpen}
                            onClose={onClose}
                            isOpen={isOpen}
                            selectedId={selectedId}
                          />
                        ) : null}
                      </Box>
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
