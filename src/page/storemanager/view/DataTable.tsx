import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

const DataTable = ({ headerData, deleteItem, captionText, items }: any) => {
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
    <TableContainer overflowY={"auto"} h={470}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>{captionText}</TableCaption>
        <Thead>
          {headerData && (
            <Tr>
              {headerData.map((head: any) => (
                <Th fontSize={10} key={head}>
                  {head}
                </Th>
              ))}
            </Tr>
          )}
        </Thead>

        <Tbody>
          {items?.map((item: any) => (
            <Tr key={item._id}>
              <Td fontSize={11}>{item?.itemName}</Td>
              <Td fontSize={11}>{item?.itemCategory}</Td>
              <Td fontSize={11}>{item?.itemQuantity}</Td>
              <Td fontSize={11}>{item?.itemCostPrice}</Td>
              <Td fontSize={11}>{item?.dateAdded || "N/A"}</Td>
              <Td fontSize={11}>{item?.quantity_remaining || "N/A"}</Td>
              <Td fontSize={11}>
                {item?.itemQuantity - item?.quantity_remaining || "N/A"}
              </Td>

              <Td>
                <Flex gap={1}>
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete database"
                    onClick={() => deleteItem(item._id)}
                    icon={<BiTrashAlt />}
                    size="xs"
                  />
                  <IconButton
                    colorScheme="blue"
                    // onClick={() => openModal(user.studentId)}
                    aria-label="Edit database"
                    icon={<BsEye />}
                    size="xs"
                  />
                  <IconButton
                    colorScheme="blue"
                    onClick={() =>
                      downloadImage(item.publication, "LibrayBook")
                    }
                    aria-label="Download database"
                    icon={<Download />}
                    size="xs"
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
