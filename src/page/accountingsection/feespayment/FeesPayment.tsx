import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { SelectInput } from "../../../components/reusable/SelectInput";
import useTheme from "../../../theme/useTheme";
import { FeesList } from "./FeesList";

export const FeesPayment = () => {
  const token = localStorage.getItem("token");

  const [clas, setClas] = useState("");
  const [studentName, setStudentName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  // SPONSOR OPTIONS
  const sponsors = [
    {
      label: "Full Bursary",
      value: "Full Bursary",
    },
    {
      label: "Half Bursary",
      value: "Half Bursary",
    },
    {
      label: "Self",
      value: "Self",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<any>(null);

  //  Get all classes
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

  // Get students by className
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(`/students/find/${clas}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStudents(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, [clas]);

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

  const addAccountDetails = async () => {
    const newAccount = {
      amount,
      accountType,
      studentName,
      class: clas,
      accountNumber,
      paymentReference,
    };
    try {
      const res = await myAPIClient.post("/fees", newAccount, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setAccountNumber("");
      setAmount("");
      setAccountType("");
      setClas("");
      setStudentName("");
      setPaymentReference("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get all accounts
  // const [accounts, setAccounts] = useState([])
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await myAPIClient.get("/fees", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccounts();
  }, []);

  // GET THEME WITH PRIMARY COLOR ******************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
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
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={"teal"}
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
                  bg={"white"}
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
                      <option value={c.className}>{c.className}</option>
                    ))}
                  </Select>
                </Flex>

                <Flex
                  p={3}
                  bg={"white"}
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
                    value={clas}
                    onChange={(e) => setClas(e.target.value)}
                    w={"100%"}
                  >
                    {classes.map((c: any) => (
                      <option value={c.className}>{c.className}</option>
                    ))}
                  </Select>
                </Flex>

                <Flex
                  p={3}
                  bg={"white"}
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
                    Student
                  </Text>
                  <SelectInput options={students} />
                </Flex>

                <Flex
                  p={3}
                  bg={"white"}
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
                  bg={"white"}
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
                  bg={"white"}
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
                  <SelectInput
                    options={sponsors}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </Flex>

                <Flex
                  p={3}
                  bg={"white"}
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Flex>

                <Flex
                  p={3}
                  bg={"white"}
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
                    Amount
                  </Text>
                  <Input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
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
                    !paymentReference
                  }
                  onClick={addAccountDetails}
                >
                  Add Details
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
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
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
                    <option value="option3">2000</option>
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
              </Flex>

              <FeesList />
              {/* <Box w={"100%"}>
                <Flex
                  overflowX={"auto"}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box>
                    <Box>
                      <Text
                        p={2}
                        fontSize={22}
                        textAlign="center"
                        fontWeight="bold"
                      >
                        Fees Status of Vicent
                      </Text>
                    </Box>
                  </Box>

                  <Flex
                    w={"100%"}
                    p={3}
                    borderTop="1px solid #ccc"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text fontSize={19} fontWeight="bold">
                      Month
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Status
                    </Text>
                    <Text fontSize={19} fontWeight="bold">
                      Action
                    </Text>
                  </Flex>
                </Flex>
              </Box> */}
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
