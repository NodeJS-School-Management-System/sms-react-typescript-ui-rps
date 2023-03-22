import { Box, Image, Flex, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

type TableDataProps = {
    id: string
    image: Element
    fullname: string;
    username: string;
    email: string;
    contact: string;
    stream: string;
    gender: string;
    action: Element;
};

const data: TableDataProps[] = [
    {
        id: '1',
        image: <Image w={50} h={50} borderRadius='50%' src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg' />,
        fullname: 'Abeine Vicent',
        username: 'vicent',
        email: 'abeine@gmail.com',
        contact: '+256779980978',
        address: 'Mbarara',
        gender: 'Male',
        action: <Flex gap={2}>
            <IconButton
                colorScheme='red'
                aria-label='Delete from database'
                icon={<DeleteIcon />}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Delete from database'
                icon={<RemoveRedEyeIcon />}
            />
        </Flex>
    },
    {
        id: '1',
        image: <Image w={50} h={50} borderRadius='50%' src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg' />,
        fullname: 'Abeine Vicent',
        username: 'vicent',
        email: 'abeine@gmail.com',
        contact: '+256779980978',
        address: 'Mbarara',
        gender: 'Male',
        action: <Flex gap={2}>
            <IconButton
                colorScheme='red'
                aria-label='Delete from database'
                icon={<DeleteIcon />}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Delete from database'
                icon={<RemoveRedEyeIcon />}
            />
        </Flex>
    },
    {
        id: '1',
        image: <Image w={50} h={50} borderRadius='50%' src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg' />,
        fullname: 'Abeine Vicent',
        username: 'vicent',
        email: 'abeine@gmail.com',
        contact: '+256779980978',
        address: 'Mbarara',
        gender: 'Male',
        action: <Flex gap={2}>
            <IconButton
                colorScheme='red'
                aria-label='Delete from database'
                icon={<DeleteIcon />}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Delete from database'
                icon={<RemoveRedEyeIcon />}
            />
        </Flex>
    },
    {
        id: '1',
        image: <Image w={50} h={50} borderRadius='50%' src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg' />,
        fullname: 'Abeine Vicent',
        username: 'vicent',
        email: 'abeine@gmail.com',
        contact: '+256779980978',
        address: 'Mbarara',
        gender: 'Male',
        action: <Flex gap={2}>
            <IconButton
                colorScheme='red'
                aria-label='Delete from database'
                icon={<DeleteIcon />}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Delete from database'
                icon={<RemoveRedEyeIcon />}
            />
        </Flex>
    },
    {
        id: '1',
        image: <Image w={50} h={50} borderRadius='50%' src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg' />,
        fullname: 'Abeine Vicent',
        username: 'vicent',
        email: 'abeine@gmail.com',
        contact: '+256779980978',
        address: 'Mbarara',
        gender: 'Male',
        action: <Flex gap={2}>
            <IconButton
                colorScheme='red'
                aria-label='Delete from database'
                icon={<DeleteIcon />}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Delete from database'
                icon={<RemoveRedEyeIcon />}
            />
        </Flex>
    },

];

const columnHelper = createColumnHelper<TableDataProps>();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id"
    }),
    columnHelper.accessor("image", {
        cell: (info) => info.getValue(),
        header: "Image"
    }),
    columnHelper.accessor("fullname", {
        cell: (info) => info.getValue(),
        header: "Full Name"
    }),
    columnHelper.accessor("username", {
        cell: (info) => info.getValue(),
        header: "username",
    }),
    columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email"
    }),
    columnHelper.accessor("contact", {
        cell: (info) => info.getValue(),
        header: "Contact"
    }),
    columnHelper.accessor("address", {
        cell: (info) => info.getValue(),
        header: "Address"
    }),
    columnHelper.accessor("gender", {
        cell: (info) => info.getValue(),
        header: "Gender"
    }),
    columnHelper.accessor("action", {
        cell: (info) => info.getValue(),
        header: "Action"
    }),
];

export const TeacherList = () => {
    return (
        <Box overflowX={{ base: 'auto', md: 'auto', lg: 'hidden' }}>
            <DataTable columns={columns} data={data} />
        </Box>
    )
}
