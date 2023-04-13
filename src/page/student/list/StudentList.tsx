import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
export const StudentList = ({ list, query }: any) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Today's Analytics</TableCaption>
        <Thead>
          <Tr>
            <Th>Ticket No.</Th>
            <Th>Leaving From</Th>
            <Th>Date Booked</Th>
            <Th>Time Booked</Th>
            <Th>No. of Passengers</Th>
            <Th>Phone</Th>
            <Th>Bus</Th>
            <Th>Payment Status</Th>
            <Th>Transaction Reference</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((customer: any) => (
            <Tr key={customer}>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>DELETE</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
