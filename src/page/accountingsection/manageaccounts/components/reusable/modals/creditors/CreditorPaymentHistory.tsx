import { Download } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useTheme from "../../../../../../../theme/useTheme";
import numberToWords from "number-to-words";
import Logo from "../../../../../../../assets/logou.png";
import Sign from "../../../../../../../assets/rpssign.png";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const CreditorPaymentHistory = ({ user }: { user: any }) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [dateofpayment, setDateofPayment] = useState("");
  const [revealReceipt, setRevealReceipt] = useState(false);

  const receiptRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `${user.suppliername}'s Payment Voucher`,
  });

  const handlePrintReceipt = (
    balancee: any,
    amountpaid: any,
    dateofpayment: any
  ) => {
    setBalance(balancee);
    setAmount(amountpaid);
    setDateofPayment(dateofpayment);

    setRevealReceipt(true);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  };

  return (
    <Box>
      <Box>
        <Text>
          Last Payment on:{" "}
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {
              user?.creditor_payments[user?.creditor_payments?.length - 1]
                ?.date_of_payment
            }
          </span>
        </Text>
      </Box>

      <Flex flexDir={"column"} gap={2} mt={3}>
        <Flex flexDir={"column"} gap={3}>
          {user?.creditor_payments?.map((item: any) => (
            <Box borderTop={"1px solid #eee"}>
              <Flex>
                <Box flex={1} fontSize={13}>
                  Amount:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item?.amount_paid}
                  </span>
                </Box>
                <Box flex={1} fontSize={13}>
                  Date of Payment:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.date_of_payment}
                  </span>
                </Box>
              </Flex>

              <Flex>
                <Flex flex={1} justifyContent="flex-end" fontSize={13}>
                  <IconButton
                    colorScheme="blue"
                    onClick={() =>
                      handlePrintReceipt(
                        item?.balance || 0,
                        item?.amount_paid,
                        item?.date_of_payment
                      )
                    }
                    aria-label="Download Receipt"
                    icon={<Download style={{ fontSize: "small" }} />}
                    size="xs"
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
        <Box>
          <Button
            w="100%"
            backgroundColor={primaryColor.color}
            disabled
            color="white"
          >
            Generate PDF
          </Button>
        </Box>
      </Flex>

      {/* VOUCHER */}
      {revealReceipt && (
        <Flex px={5} pt={5} flexDir={"column"} ref={receiptRef}>
          <Box textAlign={"center"} fontWeight="bold" fontSize={20}>
            RWEBIITA PREPARATORY SCHOOL
          </Box>
          <Flex
            gap={2}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <Box flex={1} fontSize={13}>
              <Image src={Logo} alt="" w={145} />
            </Box>
            <Flex align="center" flex={1} flexDir="column" gap={6}>
              <Box fontStyle={"italic"} fontSize={10}>
                "We care, we share, we learn together"
              </Box>
              <Box
                fontWeight={"bold"}
                fontSize={18}
                border={"2px solid black"}
                borderRadius={30}
                px={5}
                py={1}
                textAlign="center"
                w="100%"
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent={"center"}
              >
                <Text>PAYMENT</Text>
                <Text>VOUCHER</Text>
              </Box>
            </Flex>
            <Flex flex={1} gap={1} flexDirection={"column"}>
              <Text fontSize={9}>Ngoma Kagango Division - </Text>
              <Text fontSize={9}>Sheema Municipality</Text>
              <Text fontSize={9}>Off Itendero Town</Text>
              <Text fontSize={9}>P.O Box 101, Kabwohe</Text>
              <Text fontSize={9}>Tel: 0789576076 / 0704010650</Text>
              <Text fontSize={9}>Email: rwebiitapreparatory@gmail.com</Text>
              <Text fontSize={9}>Website: rwebiitapreparatory.com</Text>
            </Flex>
          </Flex>

          <Flex
            gap={2}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <Flex flex={1}>
              <Box display={"flex"} gap={4} fontWeight={"bold"} fontSize={20}>
                No.{" "}
                <Text color="red" fontSize={22}>
                  {(user?.suppliername?.length - 3) * 1000}
                </Text>
              </Box>
            </Flex>
            <Flex flex={1} justify="center">
              <Text fontSize={14}>
                Date:{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {dateofpayment || "N/L"}
                </span>
              </Text>
            </Flex>
          </Flex>

          <Flex mb={1}>
            <Box>Payee's Name/ Address:</Box>
            <span
              style={{
                borderBottom: "1px dotted black",
                fontWeight: "bold",
              }}
            >
              {user?.suppliername || "N/L"}
            </span>
          </Flex>

          {/* TABLE */}
          <TableContainer>
            <Table border={"1px solid gray"}>
              <Thead>
                <Tr borderBottom={"1px solid gray"}>
                  <Th borderRight={"1px solid gray"}>O & E</Th>
                  <Th borderRight={"1px solid gray"}>DESCRIPTION</Th>
                  <Th borderRight={"1px solid gray"}>AMOUNT</Th>
                  <Th>SIGNATURE</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr borderBottom={"1px solid gray"}>
                  <Td borderRight={"1px solid gray"}></Td>
                  <Td borderRight={"1px solid gray"}></Td>
                  <Td borderRight={"1px solid gray"}>{amount}</Td>
                  <Td>
                    <Box visibility={"hidden"}>P</Box>
                  </Td>
                </Tr>
                {[1, 2, 3, 4].map((row: any) => (
                  <Tr key={row} borderBottom={"1px solid gray"}>
                    <Td borderRight={"1px solid gray"}></Td>
                    <Td borderRight={"1px solid gray"}></Td>
                    <Td borderRight={"1px solid gray"}></Td>
                    <Td>
                      <Box visibility={"hidden"}>P</Box>
                    </Td>
                  </Tr>
                ))}
                <Tr borderBottom={"1px solid gray"}>
                  <Td borderRight={"1px solid gray"}></Td>
                  <Td borderRight={"1px solid gray"}>Total</Td>
                  <Td fontWeight="bold" borderRight={"1px solid gray"}>
                    {amount}/=
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td borderRight={"1px solid gray"}></Td>
                  <Td borderRight={"1px solid gray"}>Balance</Td>
                  <Td borderRight={"1px solid gray"} fontWeight="bold">
                    {balance}/=
                  </Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Flex flexDir={"column"} gap={2}>
            <Text>
              Amount in words{" "}
              <span
                style={{
                  borderBottom: "1px dotted black",
                  fontWeight: "bold",
                }}
              >
                {amount
                  ? `${numberToWords.toWords(amount)} shillings only`
                  : "............................................................................................"}
              </span>
            </Text>

            <Flex>
              <Text flex={1} fontSize={14}>
                Prepared By:{" "}
                <span>
                  ............................................................
                </span>{" "}
              </Text>
              <Text flex={1}>
                Checked By:{" "}
                <span>
                  ...............................................................
                </span>
              </Text>
            </Flex>

            <Flex>
              <Text flex={1} fontSize={14}>
                Signature:{" "}
                <span>
                  ............................................................
                </span>{" "}
              </Text>
              <Text flex={1}>
                Signature:{" "}
                <span>
                  ...............................................................
                </span>
              </Text>
            </Flex>

            <Flex>
              <Text flex={1} fontSize={14}>
                Received By:{" "}
                <span>
                  ............................................................
                </span>{" "}
              </Text>
              <Text flex={1}>
                Authorised By:{" "}
                <span>
                  ...............................................................
                </span>
              </Text>
            </Flex>

            <Flex>
              <Text flex={1} fontSize={14}>
                Signature:{" "}
                <span>
                  ............................................................
                </span>{" "}
              </Text>
              <Text flex={1}>
                Signature:{" "}
                <span>
                  ...............................................................
                </span>
              </Text>
            </Flex>

            <Flex align={"center"}>
              <Flex flex={1} justify={"flex-start"} flexDir="column">
                <Flex gap={2} justify="flex-start" align="center">
                  <Text fontSize={14}>SHS</Text>
                  <Box
                    fontWeight={"bold"}
                    fontSize={18}
                    border={"2px solid black"}
                    borderRadius={30}
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"center"}
                    textAlign="center"
                    px={10}
                  >
                    {amount}/=
                  </Box>
                </Flex>
                <Text ml={14} fontSize={14}>
                  Thank you
                </Text>
              </Flex>
              <Box
                flex={1}
                fontSize={13}
                display="flex"
                justifyContent={"center"}
                flexDir="column"
              >
                <Box display="flex" fontSize={14} alignItems="center" gap={2}>
                  <Text>Signature:</Text>{" "}
                  <span>
                    <Image src={Sign} w={45} />
                  </span>{" "}
                </Box>
                <Text fontSize={12}>(RWEBIITA PREPARATORY SCHOOL)</Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default CreditorPaymentHistory;
