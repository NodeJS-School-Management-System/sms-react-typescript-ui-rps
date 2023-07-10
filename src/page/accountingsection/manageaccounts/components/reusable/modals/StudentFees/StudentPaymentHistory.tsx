import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import Logo from "../../../../../../../assets/logou.png";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";
import Sign from "../../../../../../../assets/rpssign.png";

const StudentPaymentHistory = ({ student }: any) => {
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [dateofpayment, setDateofPayment] = useState("");
  const [ref, setRef] = useState("");

  const [revealReceipt, setRevealReceipt] = useState(false);

  const receiptRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `${student.username}'s Receipt`,
  });

  const handlePrintReceipt = (
    feesbalance: any,
    amountpaid: any,
    dateofpayment: any,
    ref: any
  ) => {
    setBalance(feesbalance);
    setAmount(amountpaid);
    setDateofPayment(dateofpayment);
    setRef(ref);

    setRevealReceipt(true);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  };

  return (
    <Box>
      <Flex flexDir={"column"} gap={2} mt={3}>
        <Flex flexDir={"column"} gap={3}>
          <Box fontSize={13}>
            Student Status:{" "}
            <span style={{ fontWeight: "bold" }}>
              {student.status_and_payment_info?.bursary_scheme}
            </span>
          </Box>
          <Box fontSize={13}>
            Date of Last Payment:{" "}
            <span style={{ fontWeight: "bold" }}>
              {student.status_and_payment_info?.day_or_border}
            </span>
          </Box>

          {student?.status_and_payment_info?.payment_details?.map(
            (item: any) => (
              <Box borderTop={"1px solid #eee"}>
                <Flex gap={2}>
                  <Box fontSize={13} flex={1}>
                    Payment Method:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item?.payment_method || "N/A"}
                    </span>
                  </Box>
                  <Box fontSize={13} flex={1}>
                    Bank Name:{" "}
                    <span style={{ fontWeight: "bold" }}>{item?.bankname}</span>
                  </Box>
                  <Box fontSize={13} flex={1}>
                    Date of Payment:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item?.dateofpayment}
                    </span>
                  </Box>
                </Flex>

                <Flex gap={2}>
                  <Box fontSize={13} w="30%" flex={1}>
                    Payment Ref:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item?.payment_reference}
                    </span>
                  </Box>
                  <Box fontSize={13} flex={1}>
                    Amount:{" "}
                    <span style={{ fontWeight: "bold" }}>{item?.amount}</span>
                  </Box>
                  <Box fontSize={13} flex={1}>
                    <IconButton
                      colorScheme="blue"
                      onClick={() =>
                        handlePrintReceipt(
                          item?.feesbalance,
                          item?.amount,
                          item?.dateofpayment,
                          item?.payment_reference
                        )
                      }
                      aria-label="Download Receipt"
                      icon={<Download style={{ fontSize: "small" }} />}
                      size="xs"
                    />
                  </Box>
                </Flex>
              </Box>
            )
          )}
        </Flex>

        {/* <Box>
          <Button
            w="100%"
            backgroundColor={primaryColor.color}
            disabled
            color="white"
          >
            Generate PDF
          </Button>
        </Box> */}

        {/* RECEIPT */}
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
              <Box flex={1}>
                <Image src={Logo} alt="" w={115} />
              </Box>
              <Flex flex={1} align="center" flexDir="column" gap={6}>
                <Box fontStyle={"italic"} fontSize={10}>
                  "We care, we share, we learn together"
                </Box>
                <Box
                  fontWeight={"bold"}
                  fontSize={18}
                  border={"2px solid black"}
                  borderRadius={30}
                  textAlign="center"
                  px={4}
                  py={1}
                >
                  RECEIPT
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
                    {student?.password}
                  </Text>
                </Box>
              </Flex>
              <Flex flex={1} justifyContent="center">
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

            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={14}>
                Received with thanks from{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {student.firstname} {student.lastname}
                </span>
              </Text>
              <Text fontSize={14}>
                The sum of shillings{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {numberToWords.toWords(amount) || "N/L"} shillings only
                </span>
              </Text>
              <Text fontSize={14}>
                Being payment of{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {"School Fees"}
                </span>
              </Text>
              <Text fontSize={14}>
                Cash/cheque No.{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {ref || "N/L"}
                </span>{" "}
                Balance:{" "}
                <span
                  style={{
                    borderBottom: "1px dotted black",
                    fontWeight: "bold",
                  }}
                >
                  {balance || "N/L"}/=
                </span>
              </Text>
              <Flex align={"center"}>
                <Flex flex={1} justify="flex-start" flexDir="column">
                  <Flex gap={2} align='center'>
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
                <Box flex={1} fontSize={13}>
                  <Box display="flex" fontSize={14} alignItems="center" gap={2}>
                    <Text> Signature:</Text>{" "}
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
      </Flex>
    </Box>
  );
};

export default StudentPaymentHistory;
