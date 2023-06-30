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

  // const [clas, setClas] = useState("");
  const [termname, setTermname] = useState("");
  const [amount, setAmount] = useState("");

  const [contact, setContact] = useState("");

  // IFRAME OPENING
  const [iframeUrl, setIframeUrl] = useState<any>("");
  const iframeRef: any = useRef<any>();

  useEffect(() => {
    if (iframeUrl != "") {
      iframeRef.current.src = iframeUrl;
    }
  }, [iframeUrl]);

  // INITIATE PAYMENT **********************************************************************************

  // ****************************************************************************************************

  // GET TODAYS DATE

  const today = new Date();

  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  // Format the date
  const formattedDate = `${month}/${day}/${year}`;

  // ****************************************************************************************************

  const [isLoading, setIsLoading] = useState(false);
  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.post(
        `/users/students/initiatepayment/${passcode}`,
        {
          phone_number: contact,
          amount,
          currentterm: termname,
          currentdate: formattedDate,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
     

      setIframeUrl(res.data.redirect_url);
      setIsLoading(false);

      toast.success(
        `Success: Payment initiation in progress, confirm details on the right/down to proceed`,
        {
          autoClose: 30000,
        }
      );
    } catch (err) {
      console.log(err);
      setIsLoading(false);

      toast.error("Sorry, something went wrong, try again!");
    }
  };

  const [passcode, setPasscode] = useState<any>(null);
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // ****************************************************************************************************
  // GET STUDENT DETAILS BY PASSCODE
  const [student, setStudent] = useState<any>({});
  const getStudentByPasscode = async () => {
    setIsRevealing(true);
    try {
      const res = await myAPIClient.get(
        `/users/students/getbypasscode/${passcode}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setStudent(res.data);
      console.log(student);
      setIsRevealing(false);
      setDetailsRevealed(true);
    } catch (err) {
      setDetailsRevealed(false);
      console.log(err);
      setIsRevealing(false);
      toast.error(
        "Sorry, something went wrong retrieving students details, check your passcode and try again!"
      );
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
                  fontSize={16}
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
                  type="number"
                  w={{ base: "100%", md: "50%" }}
                  onChange={(e) => setPasscode(e.target.value)}
                />
                <Button
                  bg={primaryColor.color}
                  color="white"
                  mx={3}
                  disabled={!passcode || passcode.length < 4}
                  onClick={getStudentByPasscode}
                >
                  {isRevealing ? "Fetching.." : "Get Student Details"}
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
                      Sponsorship Scheme
                    </Text>

                    <Input
                      placeholder="Enter student passcode"
                      value={student?.status_and_payment_info?.bursary_scheme}
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
                      fontSize={16}
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
                  isDisabled={!amount || !termname || !contact}
                  onClick={initiatePayment}
                >
                  {isLoading ? "Initiating.." : "Initiate Payment"}
                </Button>
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
                fontSize={16}
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
