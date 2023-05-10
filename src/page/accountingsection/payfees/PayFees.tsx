import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalculateSharp, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const PayFees = () => {
  const token = localStorage.getItem("token");

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // const [clas, setClas] = useState("");
  const [termname, setTermname] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [scheme, setScheme] = useState("");
  const [contact, setContact] = useState("");

  // GET CLASS FEES******************************************************************************************
  // const [classfees, setClassFees] = useState<any>({});
  // useEffect(() => {
  //   // const getClassFees = async () => {
  //   //   try {
  //   //     const res = await myAPIClient.get(`/classfee/findbyclass/${clasn}`, {
  //   //       headers: {
  //   //         token: `Bearer ${token}`,
  //   //       },
  //   //     });
  //   //     console.log(res.data);
  //   //     setClassFees(res.data);
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //   }
  //   // };
  //   // getClassFees();
  // }, [clas]);
  // *********************************************************************************************************

  // IFRAME OPENING
  const [iframeUrl, setIframeUrl] = useState<any>("");
  const iframeRef: any = useRef<any>();

  useEffect(() => {
    if (iframeUrl != "") {
      iframeRef.current.src = iframeUrl;
    }
  }, [iframeUrl]);
  // INITIATE PAYMENT **********************************************************************************
  const [isLoading, setIsLoading] = useState(false);
  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.post(
        "/payments/initiatepayment",
        {
          phone_number: contact,
          amount,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      setIframeUrl(res.data.redirect_url);
      setIsLoading(false);

      toast.success(
        `Success: A mobile money notification has been sent your phone. 
        Approve with you pin to confirm and enter the payment reference below to save`,
        {
          autoClose: 25000,
        }
      );
      setPaymentSuccess(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);

      toast.error("Sorry, something went wrong, try again!");
    }
  };

  const [passcode, setPasscode] = useState("");
  const [detailsRevealed, setDetailsRevealed] = useState(false);

  // ****************************************************************************************************
  // GET STUDENT DETAILS BY PASSCODE
  const [student, setStudent] = useState<any>({});
  const getStudentByPasscode = async () => {
    try {
      const res = await myAPIClient.get(
        `/students/find/getbypasscode/${passcode}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(student);
      setStudent(res.data);

      // GET FEES OF STUDENT"S CLASS******************
      //  ***WILL BE HERE *****

      // ******************
      setDetailsRevealed(true);
    } catch (err) {
      setDetailsRevealed(false);
      console.log(err);
    }
  };

  // ****************************************************************************************************

  // GET THEME WITH PRIMARY COLOR ****************************************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        h={70}
        p={5}
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 30, lg: 35 }}
            color={primaryColor.color}
          >
            Pay Fees
          </Heading>
          <Text fontSize={{ base: 12, lg: 16 }}>SMS</Text>
        </Box>
        <Box display={"flex"} alignItems="center" gap={2}>
          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            gap={3}
          >
            <Home style={{ fontSize: 16 }} />
            <Link to="/">
              <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
                Home
              </Text>
            </Link>
            <FaAngleRight />
          </Box>
          <CalculateSharp style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Pay Fees
          </Text>
        </Box>
      </Flex>

      <Flex
        py={4}
        w={{ base: "100%", md: "100%" }}
        h="100%"
        gap={2}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <WrapItem
          flex={1}
          gap={6}
          flexDirection={"column"}
          h={"max-content"}
          w={{ base: "100%", md: "50%", lg: "50%" }}
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
                  p={2}
                  color="white"
                  textAlign="center"
                  fontSize={22}
                  fontWeight="bold"
                >
                  Pay School Fees
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
                  onChange={(e) => setPasscode(e.target.value)}
                />
                <Button
                  bg={primaryColor.color}
                  color="white"
                  mx={3}
                  onClick={getStudentByPasscode}
                >
                  Get Student Details
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
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Student Name
                    </Text>

                    <Input
                      placeholder="Enter student passcode"
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
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Class
                    </Text>

                    <Input
                      placeholder="Enter student passcode"
                      value={student?.clas}
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
                      fontSize={20}
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
                      fontSize={20}
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
                      fontSize={20}
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
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Sponsorship Scheme <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Select
                      placeholder="Select Scheme"
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      w={"100%"}
                    >
                      <option value="Self">Self</option>
                      <option value="Half Barsary">Half Barsary</option>
                      <option value="Full Barsary">Full Barsary</option>
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
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Phone number <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      placeholder="Phone number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Flex>
                  <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                    <Text
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Amount <span style={{ color: "red" }}>*</span>{" "}
                      {/* {clas && (
                        <span style={{ color: "gray", fontSize: 14 }}>
                          (Total for {clas}: {classfees?.amount}/=)
                        </span>
                      )} */}
                    </Text>
                    <Input
                      placeholder="Amount"
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
                  isDisabled={!amount || !termname || !scheme || !contact}
                  onClick={initiatePayment}
                >
                  {isLoading ? "Initiating.." : "Initiate Payment"}
                </Button>
              )}
              {paymentSuccess && (
                <>
                  <Flex
                    p={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      fontSize={20}
                      fontWeight="bold"
                      alignSelf={"flex-start"}
                      color={"gray"}
                      mb={3}
                    >
                      Payment Reference
                    </Text>
                    <Input
                      placeholder="Payment Reference"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                    />
                  </Flex>
                  <Button
                    variant={"solid"}
                    w="50%"
                    mx={3}
                    bgColor={primaryColor.color}
                    color="white"
                    isDisabled={!paymentReference}
                    // onClick={addAccountDetails}
                  >
                    Confirm & Save
                    {/* {isLoading ? "Saving.." : "Confirm &  Save"} */}
                  </Button>
                </>
              )}
            </Box>
          </Center>
        </WrapItem>

        <WrapItem
          boxShadow="md"
          flex={1}
          gap={1}
          flexDirection={"column"}
          w={{ base: "100%", md: "50%", lg: "50%" }}
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
                p={2}
                color="white"
                textAlign="center"
                fontSize={22}
                fontWeight="bold"
              >
                Complete Fees Payment
              </Text>
            </Box>
          </Flex>
          <Text
            textAlign={"center"}
            m="auto"
            fontSize={{ base: 10, md: 11, lg: 14 }}
          >
            **** Enter details on the right/up and complete payment here ****
          </Text>
          {detailsRevealed && (
            <iframe
              style={{ width: "100%", height: "100%" }}
              ref={iframeRef}
            ></iframe>
          )}
        </WrapItem>
      </Flex>
    </Box>
  );
};
