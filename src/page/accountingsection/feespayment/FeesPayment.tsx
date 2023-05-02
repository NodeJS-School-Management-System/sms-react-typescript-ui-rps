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
import { FeesList } from "./FeesList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Money } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const FeesPayment = () => {
  const token = localStorage.getItem("token");

  const [clas, setClas] = useState("");
  const [bankname, setBankname] = useState("");
  const [studentname, setStudentName] = useState("");
  const [termname, setTermname] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [scheme, setScheme] = useState("");

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

  // GET CLASS FEES
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

  // Get students by className***********************************************************
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

  // ************************************************************************************

  // Get all account types
  const [accountTypes, setAccountTypes] = useState([]);
  useEffect(() => {
    const getAccountTypes = async () => {
      const res = await myAPIClient.get("/accounttype", {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setAccountTypes(res.data);
    };
    getAccountTypes();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const deleteAccountDetails: any = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.delete(`/fees/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      toast.success("Success, details have been deleted!");

      console.log(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong, try again!");
      setIsLoading(false);
    }
  };

  // ADD ACCOUNT DETAILS ********************************************************
  const addAccountDetails = async () => {
    const newAccount = {
      amount,
      bankname,
      scheme,
      accountType,
      termname,
      studentName: studentname,
      class: clas,
      accountNumber,
      paymentReference,
      classFeesAMount: classfees?.amount,
    };
    setIsLoading(true);
    try {
      const res = await myAPIClient.post("/fees", newAccount, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      toast.success("Success, details have been saved!");
      setAccountNumber("");
      setAmount("");
      setClas("");
      setScheme("");
      setTermname("");
      setAccountType("");
      setStudentName("");
      setPaymentReference("");
      setBankname("");
      console.log(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong, try again!");
      setIsLoading(false);
    }
  };

  // Get all accounts
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await myAPIClient.get("/fees", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccounts();
  }, [isLoading]);

  // GET THEME WITH PRIMARY COLOR ******************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      {/* <Flex justifyContent={"space-between"} pr={10}>
        <Flex>
          <Text
            fontSize={25}
            color={primaryColor.color}
            fontWeight="bold"
            ml={3}
          >
            Fees Payment
          </Text>
          <Text>sms</Text>
        </Flex>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Accounting</Text>
          <FaAngleRight />
          <Text fontSize={14}>Fees</Text>
        </Flex>
      </Flex> */}

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
            Fees Payments
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
          <Money style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Fees Payment
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
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
              borderTop="3px solid #ccc"
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
                    Add Student's Fees
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
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
                    Select Student
                  </Text>

                  <Select
                    placeholder="Select Class"
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
                    Account Type
                  </Text>
                  <Select
                    placeholder="Select Account"
                    value={accountType}
                    onChange={(e) => {
                      setAccountType(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {accountTypes?.map((acc: any) => (
                      <option value={acc?.accountType}>
                        {acc?.accountType}
                      </option>
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
                    Account Number
                  </Text>
                  <Input
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
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
                    Bank Name
                  </Text>
                  <Input
                    placeholder="Bank Name"
                    value={bankname}
                    onChange={(e) => setBankname(e.target.value)}
                  />
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
                    Amount <span style={{ color: "red" }}>*</span>{" "}
                    {clas && (
                      <span style={{ color: "gray", fontSize: 12 }}>
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
                  disabled={
                    !amount ||
                    !accountNumber ||
                    !accountType ||
                    !clas ||
                    !bankname ||
                    !studentname ||
                    !paymentReference
                  }
                  onClick={addAccountDetails}
                >
                  {isLoading ? "Adding.." : "Add Details"}
                </Button>
              </Box>
            </Center>
          </WrapItem>

          {/* LIST OF STUDENTS WITH THEIR FEES PAID */}
          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              // bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              {/* <Flex
                // p={3}
                px={0}
                h={"100%"}
                direction="row"
                align={"center"}
                justify={"space-between"}
              >
                <Flex
                  // mb={2}
                  p={3}
                  px={0}
                  w={"max-content"}
                  h={"100%"}
                  direction="row"
                  align={"center"}
                  justify={"flex-start"}
                >
                  <Text
                    ml={2}
                    fontSize={17}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Show
                  </Text>
                  <Select mx={2} mb={4} placeholder="10" size={"sm"}>
                    <option value="option2">50</option>
                    <option value="option3">100</option>
                    <option value="option3">500</option>
                  </Select>
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    entries
                  </Text>
                </Flex>
                <Flex
                  display="flex"
                  alignItems={"center"}
                  gap={2}
                  justifyContent={"flex-end"}
                >
                  <Text>Search</Text>
                  <Input
                    type="search"
                    // value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search.."
                  />
                </Flex>
              </Flex> */}

              <Flex>
                <Box
                  w={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={{ base: "column", lg: "row" }}
                  justifyContent="flex-end"
                  h={70}
                  p={5}
                  pl={0}
                  my={3}
                >
                  <Box
                    display="flex"
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"flex-end"}
                  >
                    <Text>Search:</Text>
                    <Input
                      type="search"
                      // value={query}
                      // onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search.."
                    />
                  </Box>
                </Box>
              </Flex>

              <FeesList
                accounts={accounts}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                deleteAccountDetails={deleteAccountDetails}
              />
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
