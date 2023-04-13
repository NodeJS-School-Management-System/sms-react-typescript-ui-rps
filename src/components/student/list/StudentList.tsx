import { Box, Image, Flex, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

type TableDataProps = {
  profileimage: Element;
  fullname?: string;
  username: string;
  email?: string;
  class: string;
  stream?: string;
  age: number;
  address: string;
  gender: string;
  contact?: string;
  parentname?: string;
  parentcontact?: string;
  hostel: string;
  transport: string;
  action?: Element;
};


export const StudentList = ({ list }: any) => {
  const columnHelper = createColumnHelper<TableDataProps>();

  const PublicFolder = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const columns = [
    columnHelper.accessor("profileimage", {
      cell: (info) => (
        <Image w={50} h={50} borderRadius="50%" src={info.getValue()} />
      ),
      header: "Profile Image",
    }),
    columnHelper.accessor("firstname", {
      cell: (info) => info.getValue(),
      header: "First Name",
    }),
    columnHelper.accessor("lastname", {
      cell: (info) => info.getValue(),
      header: "Last Name",
    }),
    columnHelper.accessor("clas", {
      cell: (info) => info.getValue(),
      header: "Class",
    }),
    columnHelper.accessor("stream", {
      cell: (info) => info.getValue(),
      header: "Stream",
    }),
    columnHelper.accessor("parentname", {
      cell: (info) => info.getValue(),
      header: "Parent Name",
    }),
    columnHelper.accessor("parentcontact", {
      cell: (info) => info.getValue(),
      header: "Parent Contact",
    }),
    columnHelper.accessor("dateofbirth", {
      cell: (info) => info.getValue(),
      header: "Date of Birth",
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
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
      ),
      header: "Action",
    }),
  ];

  return (
    <Box overflowX={{ base: "auto", md: "auto", lg: "hidden" }}>
      <DataTable columns={columns} data={list} />
    </Box>
  );
};
