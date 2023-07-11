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
  useDisclosure,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye, BsDownload } from "react-icons/bs";
import CreditorsModal from "./modals/creditors/CreditorsModal";
import EmployeeModal from "./modals/employeepayments/EmployeeModal";
import StudentModal from "./modals/StudentModal";
import { DataTableProps } from "./types/Reusable.type";

const DataTable = ({
  headerData,
  captionText,
  students,
  employees,
  creditors,
  deleteCreditor,
}: DataTableProps) => {
  const studentModal = useDisclosure();
  const employeeModal = useDisclosure();
  const creditorModal = useDisclosure();

  const [clickedId, setClickedId] = useState("");
  const [user, setUser] = useState<any>({});
  const [creditor, setCreditor] = useState<any>([]);

  const openModal = (id: any) => {
    setClickedId(id);
    studentModal.onOpen();
  };

  const openCreditorModal = (creditorr: any) => {
    setCreditor(creditorr);
    creditorModal.onOpen();
  };

  const openUserModal = (userr: any) => {
    setUser(userr);
    employeeModal.onOpen();
  };

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
                      icon={<BsDownload />}
                      disabled
                      size="xs"
                    />
                    <IconButton
                      colorScheme="blue"
                      onClick={() => openModal(student._id)}
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
                  ]?.nssf || "N/A"}
                </Td>

                <Td fontSize={11}>
                  {employee.salary_and_payment_info.payment_details[
                    employee.salary_and_payment_info.payment_details.length - 1
                  ]?.advance1 || "N/A"}
                </Td>

                <Td fontSize={11}>
                  {employee.salary_and_payment_info.payment_details[
                    employee.salary_and_payment_info.payment_details.length - 1
                  ]?.advance2 || "N/A"}
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
                      icon={<Edit />}
                      size="xs"
                    />
                    <IconButton
                      colorScheme="blue"
                      onClick={() => openUserModal(employee)}
                      aria-label="View database"
                      icon={<BsEye />}
                      size="xs"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        ) : creditors ? (
          <Tbody>
            {creditors.map((creditor: any) => (
              <Tr key={creditor._id}>
                <Td fontSize={11}>{creditor?.itemname}</Td>
                <Td fontSize={11}>{creditor?.total_amount}</Td>
                <Td fontSize={11}>{creditor?.latest_payment_amount}</Td>
                <Td fontSize={11}>
                  {creditor?.creditor_payments[
                    creditor?.creditor_payments?.length - 1
                  ]?.balance || "N/A"}
                </Td>
                <Td fontSize={11}>
                  {creditor?.total_quantity_initially_supplied}{" "}
                  {creditor?.item_unit_of_measurement || "N/A"}
                </Td>

                <Td fontSize={11}>{creditor?.suppliername}</Td>
                <Td fontSize={11}>{creditor?.supplieraddress}</Td>
                <Td fontSize={11}>{creditor?.supplieremail || "N/A"}</Td>
                <Td fontSize={11}>{creditor?.suppliercontact}</Td>
                <Td fontSize={11}>{creditor?.dateofpurchase}</Td>
                <Td>
                  <Flex gap={2} align="center" justify={"center"}>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete database"
                      onClick={() => deleteCreditor(creditor._id)}
                      icon={<BiTrashAlt />}
                      size="xs"
                    />
                    <IconButton
                      colorScheme="blue"
                      onClick={() => openCreditorModal(creditor)}
                      aria-label="View database"
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

      {/* MODAL */}
      <StudentModal
        onOpen={studentModal.onOpen}
        onClose={studentModal.onClose}
        isOpen={studentModal.isOpen}
        id={clickedId}
      />

      {/* CREDITORS MODAL */}
      <CreditorsModal
        onOpen={creditorModal.onOpen}
        onClose={creditorModal.onClose}
        isOpen={creditorModal.isOpen}
        user={creditor}
      />

      {/* EMPLOYEE MODAL */}
      <EmployeeModal
        onOpen={employeeModal.onOpen}
        onClose={employeeModal.onClose}
        isOpen={employeeModal.isOpen}
        user={user}
      />
    </TableContainer>
  );
};

export default DataTable;
