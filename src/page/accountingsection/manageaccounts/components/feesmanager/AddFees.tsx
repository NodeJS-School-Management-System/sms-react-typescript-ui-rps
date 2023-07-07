import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Input,
  Select,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";

const AddFees = () => {
  const token = localStorage.getItem("token");

  const [termname, setTermname] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  // *********************************************************************************************************

  // IFRAME OPENING
  const [iframeUrl, setIframeUrl] = useState<any>("");
  const iframeRef: any = useRef<any>();

  useEffect(() => {
    if (iframeUrl != "") {
      iframeRef.current.src = iframeUrl;
      setIframeUrl("sample");
    }
  }, [iframeUrl]);
  // INITIATE PAYMENT **********************************************************************************
  const [isLoading, setIsLoading] = useState(false);

  // GET LIST OF ALL BANKS
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");

  useEffect(() => {
    const getBanks = async () => {
      try {
        const res = await myAPIClient.get("/feesmanager/banks", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setBanks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBanks();
  }, []);

  const [passcode, setPasscode] = useState("");
  const [detailsRevealed, setDetailsRevealed] = useState(false);

  // ****************************************************************************************************
  // GET STUDENT DETAILS BY PASSCODE
  const [student, setStudent] = useState<any>({});
  const [isgettingStudent, setIsGettingStudent] = useState(false);
  const getStudentByPasscode = async () => {
    setIsGettingStudent(true);
    try {
      const res = await myAPIClient.get(
        `/users/students/getbypasscode/${passcode}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      console.log(student);
      setStudent(res.data);
      setIsGettingStudent(false);

      // GET FEES OF STUDENT"S CLASS******************
      //  ***WILL BE HERE *****

      // ******************
      setDetailsRevealed(true);
    } catch (err) {
      toast.error(
        "Sorry something went wrong getting students details, check your passcode and try again!"
      );
      setDetailsRevealed(false);
      setIsGettingStudent(false);
      console.log(err);
    }
  };

  // ****************************************************************************************************

  const today = new Date();

  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  // Format the date
  const formattedDate = `${month}/${day}/${year}`;

  // ****************************************************************************************************

  // UPDATE STUDENT WITH PAYMENT INFO FROM RECEIPT
  const updateStudentFees = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.put(
        `/feesmanager/updatestudent/${passcode}`,
        {
          amount: Number(amount),
          payment_reference: paymentReference,
          bankname: bank,
          currentterm: termname,
          dateofpayment: formattedDate,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setBank("");
      setPaymentReference("");
      setTermname("");
      setAmount("");
      setIsLoading(false);
      toast.success("Success, student payments have been updated!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Sorry, something went wrong updating student's fees!");
    }
  };

  // ****************************************************************************************************

  // GET THEME WITH PRIMARY COLOR ****************************************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <WrapItem
        flex={1}
        gap={6}
        flexDirection={"column"}
        h={"max-content"}
        w="100%"
        // w={{ base: "100%", md: "50%", lg: "50%" }}
      >
        <Center
          flexDirection={"column"}
          boxShadow={"lg"}
          borderRadius={2}
          pb={4}
          height="auto"
          w="100%"
          h="100%"
        >
          <Flex
            alignItems="center"
            bg={primaryColor.color}
            w="100%"
            justifyContent="center"
            flexDirection="column"
          >
            <Box>
              <Text
                p={1}
                color="white"
                textAlign="center"
                fontSize={16}
                fontWeight="bold"
              >
                Update Student Fees
              </Text>
            </Box>
          </Flex>
          <Box px={2} w={"100%"}>
            <Flex
              p={3}
              w={"100%"}
              h={"100%"}
              flexDirection={{ base: "column", md: "row" }}
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Input
                placeholder="Enter student passcode"
                value={passcode}
                w={{ base: "100%", md: "50%" }}
                type={"number"}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <Button
                bg={primaryColor.color}
                color="white"
                mx={3}
                onClick={getStudentByPasscode}
                disabled={!passcode || passcode.length < 4}
              >
                {isgettingStudent ? (
                  <CircularProgress size="24px" />
                ) : (
                  "Get Student Details"
                )}
              </Button>
            </Flex>

            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Student Name
                  </Text>

                  <Input
                    placeholder="Student passcode"
                    value={
                      student.firstname
                        ? `${student.firstname} ${student.lastname}`
                        : "N/A"
                    }
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>

                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Class
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.studentclass}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
              </Flex>
            )}

            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Address
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.address}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Parent Contact
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentcontact}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
              </Flex>
            )}
            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Parent Name
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentname}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Parent Email
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentemail}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
              </Flex>
            )}
            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Parent NIN
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentnin}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Status
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.status_and_payment_info?.day_or_border}
                    fontWeight={"bold"}
                    disabled
                    style={{ cursor: "default" }}
                  />
                </Flex>
              </Flex>
            )}

            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Select Term <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    placeholder="Select Term"
                    value={termname}
                    onChange={(e) => setTermname(e.target.value)}
                    w={"100%"}
                  >
                    <option value={"Term One"}>Term One</option>
                    <option value={"Term Two"}>Term Two</option>
                    <option value={"Term Three"}>Term Three</option>
                  </Select>
                </Flex>
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Bank Name <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    placeholder="Select Bank Name"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    w={"100%"}
                  >
                    {banks.map((bank: any) => (
                      <option value={bank.bankname}>{bank.bankname}</option>
                      ))}
                      <option value={"Cash"}>Cash</option>
                  </Select>
                </Flex>
              </Flex>
            )}

            {detailsRevealed && (
              <Flex
                py={3}
                w={"100%"}
                h={"100%"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Payment Reference <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    placeholder="Payment Reference"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                  />
                </Flex>
                <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Amount <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Flex>
              </Flex>
            )}

            {/* ***************************** */}

            {detailsRevealed && (
              <Button
                variant={"solid"}
                w={{ base: "90%", md: "50%" }}
                mx={3}
                bgColor={primaryColor.color}
                color="white"
                isDisabled={!amount || !paymentReference || !termname}
                onClick={updateStudentFees}
              >
                {isLoading ? "Updating.." : "Update Details"}
              </Button>
            )}
          </Box>
        </Center>
      </WrapItem>
    </Box>
  );
};

export default AddFees;
