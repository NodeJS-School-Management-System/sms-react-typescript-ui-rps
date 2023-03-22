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

const columnHelper = createColumnHelper<TableDataProps>();

export const NTStaffList = ({ list }: any) => {
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
    columnHelper.accessor("username", {
      cell: (info) => info.getValue(),
      header: "Username",
    }),

    columnHelper.accessor("department", {
      cell: (info) => info.getValue(),
      header: "Department",
    }),
    columnHelper.accessor("dateofbirth", {
      cell: (info) => info.getValue(),
      header: "Date of Birth",
    }),
    columnHelper.accessor("educationlevel", {
      cell: (info) => info.getValue(),
      header: "Highest Qualification",
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
