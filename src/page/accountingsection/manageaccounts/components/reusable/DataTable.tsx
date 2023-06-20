import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { DataTableProps } from "./types/Reusable.type";

const DataTable = ({
  headerData,
  captionText,
  students,
  employees,
}: DataTableProps) => {
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

        {students ? (
          <Tbody>
            {students.map((student: any) => (
              <Tr key={student._id}>
                <Td fontSize={11}>#{student.password}</Td>
                <Td fontSize={11}>
                  <Image
                    w={25}
                    h={25}
                    borderRadius="50%"
                    src={student.profileimage}
                  />
                </Td>
                <Td fontSize={11}>
                  {student.firstname} {student.lastname}
                </Td>
                <Td fontSize={11}>{student.gender}</Td>
                <Td fontSize={11}>{student.studentclass}</Td>
                <Td fontSize={11}>{student.dateofbirth}</Td>
                <Td fontSize={11}>
                  {student.status_and_payment_info.currentfees || "N/A"}
                </Td>
                <Td fontSize={11}>
                  {student.status_and_payment_info.fees_balance || "N/A"}
                </Td>
                <Td fontSize={11}>{student.parentname}</Td>
                <Td fontSize={11}>{student.parentcontact}</Td>
                <Td>
                  <Flex gap={2} align="center" justify={"center"}>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete database"
                      // onClick={() => deleteStudent(user.studentId)}
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
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        ) : employees ? (
          <Tbody>
            {employees.map((employee: any) => (
              <Tr key={employee._id}>
                <Td fontSize={11}>{employee.username}</Td>
                <Td fontSize={11}>
                  <Image
                    w={25}
                    h={25}
                    borderRadius="50%"
                    src={employee.profileimage}
                  />
                </Td>
                <Td fontSize={11}>
                  {employee.firstname} {employee.lastname}
                </Td>
                {/* <Td fontSize={11}>
                  {employee.isTeacher
                    ? "Teacher"
                    : employee.isMember
                    ? "Member"
                    : null}
                </Td> */}
                <Td fontSize={11}>
                  {employee.isMember
                    ? employee.role
                    : employee.designation
                    ? employee.designation
                    : "N/A"}
                </Td>
                <Td fontSize={11}>
                  {employee.salary_and_payment_info.salary_amount}
                </Td>
                <Td fontSize={11}>
                  {employee.salary_and_payment_info.salary_balance || "N/A"}
                </Td>
                <Td fontSize={11}>
                  {employee.salary_and_payment_info.payment_details[
                    employee.salary_and_payment_info.payment_details.length - 1
                  ]?.deductions || "N/A"}
                </Td>
                <Td fontSize={11}>
                  {" "}
                  {employee.salary_and_payment_info.salary_amount -
                    (employee.salary_and_payment_info.payment_details[
                      employee.salary_and_payment_info.payment_details.length -
                        1
                    ]?.deductions
                      ? employee.salary_and_payment_info.payment_details[
                          employee.salary_and_payment_info.payment_details
                            .length - 1
                        ]?.deductions
                      : 0)}
                </Td>
                <Td fontSize={11}>
                  {employee.salary_and_payment_info.allowance_amount || "N/A"}
                </Td>
                <Td>
                  <Flex gap={2} align="center" justify={"center"}>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete database"
                      // onClick={() => deleteStudent(user.studentId)}
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
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default DataTable;
