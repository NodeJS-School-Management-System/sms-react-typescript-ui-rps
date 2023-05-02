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
import { useEffect, useState } from "react";
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
  const [clas, setClas] = useState("");
  const [studentname, setStudentName] = useState("");
  const [termname, setTermname] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [scheme, setScheme] = useState("");
  const [contact, setContact] = useState("");

  // UPDATE CLASS NAME ACCORDING TO CLASS NUMMERAL
  let clasn: string = "";
  if (clas === "P1") {
    clasn = "Primary One";
  } else if (clas === "P2") {
    clasn = "Primary Two";
  } else if (clas === "P3") {
    clasn = "Primary Three";
  } else if (clas === "P4") {
    clasn = "Primary Four";
  } else if (clas === "P5") {
    clasn = "Primary Five";
  } else if (clas === "P6") {
    clasn = "Primary Six";
  } else if (clas === "P7") {
    clasn = "Primary Seven";
  }

  // GET CLASS FEES******************************************************************************************
  const [classfees, setClassFees] = useState<any>({});
  useEffect(() => {
    const getClassFees = async () => {
      try {
        const res = await myAPIClient.get(`/classfee/findbyclass/${clasn}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setClassFees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClassFees();
  }, [clas]);
  // *********************************************************************************************************

  // Get students by className*****************************************************************************
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(`/students/find/${clas}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, [clas]);

  // *********************************************************************************************************

  //  Get all classes***********************************************************************************
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);
  // ****************************************************************************************************

  // INITIATE PAYMENT **********************************************************************************
  const [isLoading, setIsLoading] = useState(false);
  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.post(
        "/fees/payment",
        {
          contact,
          studentName: studentname,
          class: clas,
          amount,
          scheme,
          termname,
          classFeesAMount: classfees?.amount,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data);
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
        // boxShadow="md"
        p={4}
        w={{ base: "100%", md: "60%" }}
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
            w="90%"
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
            <Box w={"100%"}>
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
                  Select Class
                </Text>
                <Select
                  placeholder="Select Class"
                  value={clas}
                  onChange={(e) => setClas(e.target.value)}
                  w={"100%"}
                >
                  {classes.map((c: any) => (
                    <option value={c.classNumeral}>{c.className}</option>
                  ))}
                </Select>
              </Flex>

              <Flex
                p={3}
                // bg={"white"}
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
                  Select Term
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

              <Flex
                p={3}
                // bg={"white"}
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
                  Student Name
                </Text>

                <Select
                  placeholder="Select Name"
                  value={studentname}
                  onChange={(e) => setStudentName(e.target.value)}
                  w={"100%"}
                >
                  {students?.map((c: any) => (
                    <option
                      value={`${c.firstname} ${c.lastname}`}
                    >{`${c.firstname} ${c.lastname}`}</option>
                  ))}
                </Select>
              </Flex>

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
                  Sponsorship Scheme
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

              <Flex
                p={3}
                // bg={"white"}
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
                  Contact <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  placeholder="Amount"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Flex>

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
                  Amount <span style={{ color: "red" }}>*</span>{" "}
                  {clas && (
                    <span style={{ color: "gray", fontSize: 14 }}>
                      (Total for {clas}: {classfees?.amount}/=)
                    </span>
                  )}
                </Text>
                <Input
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Flex>

              <Button
                variant={"solid"}
                w={{ base: "90%", md: "50%" }}
                mx={3}
                bgColor={primaryColor.color}
                color="white"
                isDisabled={
                  !amount || !clas || !termname || !scheme || !studentname
                }
                onClick={initiatePayment}
              >
                {isLoading ? "Initiating.." : "Initiate Payment"}
              </Button>
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
      </Flex>
    </Box>
  );
};
