import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";
import Logo from "../../../../../../../assets/logou.png";
import useTheme from "../../../../../../../theme/useTheme";
import Sign from "../../../../../../../assets/rpssign.png";

const PaymentHistory = ({ user }: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [dateofpayment, setDateofPayment] = useState("");
  const [ref, setRef] = useState("");

  const [revealReceipt, setRevealReceipt] = useState(false);

  const receiptRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `${user.username}'s Payment Voucher`,
  });

  const handlePrintReceipt = (
    salary_balance: any,
    amountpaid: any,
    dateofpayment: any,
    ref: any
  ) => {
    setBalance(salary_balance);
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
      <Box>
        <Text>
          Last Payment on{" "}
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {
              user.salary_and_payment_info.payment_details[
                user.salary_and_payment_info.payment_details.length - 1
              ]?.dateofpayment
            }
          </span>
        </Text>
      </Box>

      <Flex flexDir={"column"} gap={2} mt={3}>
        <Flex flexDir={"column"} gap={3}>
          {user?.salary_and_payment_info?.payment_details?.map((item: any) => (
            <Box borderTop={"1px solid #eee"}>
              <Flex>
                <Box flex={1} fontSize={13}>
                  Payment Method:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item?.paymentmethod}
                  </span>
                </Box>
                <Box flex={1} fontSize={13}>
                  Payment Ref:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item?.payment_reference}
                  </span>
                </Box>
              </Flex>

              <Flex>
                <Box flex={1} fontSize={13}>
                  Amount:{" "}
                  <span style={{ fontWeight: "bold" }}>{item?.amount}</span>
                </Box>
                <Box flex={1} fontSize={13}>
                  Date of Payment:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.dateofpayment}
                  </span>
                </Box>
              </Flex>

              <Flex>
                <Box flex={1} fontSize={13}>
                  NSSF:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item?.nssf || "N/A"}
                  </span>
                </Box>
                <Box flex={1} fontSize={13}>
                  Advance1:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item?.advance1 || "N/A"}
                  </span>
                </Box>
              </Flex>
              <Flex>
                <Box flex={1} fontSize={13}>
                  Deductions:{" "}
                  <span style={{ fontWeight: "bold" }}>{item.deductions}</span>
                </Box>

                <Flex flex={1} justifyContent="space-between" fontSize={13}>
                  <Box>
                    Advance2:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item?.advance2 || "N/A"}
                    </span>
                  </Box>
                  <IconButton
                    colorScheme="blue"
                    onClick={() =>
                      handlePrintReceipt(
                        item?.salary_balance || 0,
                        item?.amount,
                        item?.dateofpayment,
                        item?.payment_reference
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
            <Box flex={1} fontSize={13}>
              <Image src={Logo} alt="" w={115} />
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
                  {user?.username?.length * 1000}
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

          <Flex flexDir={"column"} gap={2}>
            <Text fontSize={14}>
              Payment with thanks to{" "}
              <span
                style={{
                  borderBottom: "1px dotted black",
                  fontWeight: "bold",
                }}
              >
                {user.firstname} {user.lastname}
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
                {"Monthly Salary"}
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
              <Flex
                flex={1}
                justify={"flex-start"}
                flexDir="column"
              >
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

export default PaymentHistory;
