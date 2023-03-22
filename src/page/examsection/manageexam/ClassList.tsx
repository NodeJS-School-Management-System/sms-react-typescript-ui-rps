import { Box, Image, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DeleteClassModal } from "./DeleteClassModal";
import ViewClassModal from "./ViewClassModal";
import { useState, useCallback, useMemo } from "react";

type TableDataProps = {
  classNumeral: string;
  className: string;
  classTeacher?: string;
  action?: Element;
};

const columnHelper = createColumnHelper<TableDataProps>();

export const ClassList = ({ list }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedId, setSelectedId] = useState<any>("");

  const handleClick = useCallback((id) => {
    setSelectedId(id);
    onOpen();
  }, []);

  const columns = [
    columnHelper.accessor("classNumeral", {
      cell: (info) => info.getValue(),
      header: "Class Numeral",
    }),
    columnHelper.accessor("className", {
      cell: (info) => info.getValue(),
      header: "Class Name",
    }),
    columnHelper.accessor("classTeacher", {
      cell: (info) => info.getValue() || "N/A",
      header: "Class Teacher",
    }),
    columnHelper.accessor("classroomId", {
      cell: (info) => (
        <Flex gap={2}>
          <IconButton
            colorScheme="red"
            aria-label="Delete from database"
            icon={<DeleteIcon />}
            // onClick={() => handleClick()}
          />
          <IconButton
            colorScheme="blue"
            data-id={info.getValue()}
            onClick={() => handleClick(info.getValue())}
            aria-label="View from database"
            icon={<RemoveRedEyeIcon />}
          />
        </Flex>
      ),
      header: "Action",
    }),
  ];
  return (
    <Box overflowX={{ base: "auto", md: "auto", lg: "hidden" }}>
      <DataTable columns={columns} data={list} />
      <>
        {/* <DeleteClassModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            /> */}
        {useMemo(() => {
          if (!isOpen) {
            return null;
          } else {
            return (
              <ViewClassModal
                selectedId={selectedId}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            );
          }
        })}
      </>
    </Box>
  );
};
