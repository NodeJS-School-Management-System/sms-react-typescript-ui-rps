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
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OptionalMaker } from "../../../../../components/student/add/AddStudent";
import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";

const AddPayments = () => {
  const token = localStorage.getItem("token");
  const [deductions, setDeductions] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  // *********************************************************************************************************

  const [isLoading, setIsLoading] = useState(false);

  const [bank, setBank] = useState("");

  const [username, setUsername] = useState("");
  const [detailsRevealed, setDetailsRevealed] = useState(false);

  // ****************************************************************************************************
  // GET EMPLOYEE DETAILS BY USERNAME
  const [employee, setemployee] = useState<any>({});
  const [isgettingemployee, setIsGettingemployee] = useState(false);
  const getemployeeByusername = async () => {
    setIsGettingemployee(true);
    try {
      const res = await myAPIClient.get(
        `/users/teachers/findbyusername/${username}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      setemployee(res.data);
      console.log(employee);
      setIsGettingemployee(false);

      // ******************
      setDetailsRevealed(true);
    } catch (err) {
      toast.error(
        "Sorry something went wrong getting employee details, check your username and try again!"
      );
      setDetailsRevealed(false);
      setIsGettingemployee(false);
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

  console.log(formattedDate);

  // ****************************************************************************************************

  // UPDATE employee WITH PAYMENT INFO FROM RECEIPT
  const updateemployeeFees = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.put(
        `/employeemanager/updateemployee/${username}`,
        {
          amount: Number(amount),
          paymentmethod: bank,
          payment_reference: paymentReference,
          dateofpayment: formattedDate,
          deductions: Number(deductions),
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsLoading(false);
      setBank("");
      setAmount("");
      setDeductions("");
      setPaymentReference("");
      toast.success("Success, employee payments have been updated!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Sorry, something went wrong updating employee's fees!");
    }
  };

  // *********************************************************************************************************

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
                placeholder="Enter employee username"
                value={username}
                w={{ base: "100%", md: "50%" }}
                type={"text"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                bg={primaryColor.color}
                color="white"
                mx={3}
                fontSize={14}
                onClick={getemployeeByusername}
                disabled={!username || username.length < 3}
              >
                {isgettingemployee ? (
                  <CircularProgress size="24px" />
                ) : (
                  "Get Employee Details"
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
                    Employee Name
                  </Text>

                  <Input
                    placeholder="employee username"
                    value={
                      employee.firstname
                        ? `${employee.firstname} ${employee.lastname}`
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
                    Designation
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee.designation || "N/A"}
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
                    Allowances
                  </Text>

                  <Input
                    value={
                      employee.salary_and_payment_info.allowance_amount || "N/A"
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
                    Base Salary
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee?.salary_and_payment_info?.salary_amount}
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
                    Contact
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee?.contact}
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
                    Email
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee?.email}
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
                    NIN
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee?.NIN}
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
                    Address
                  </Text>

                  <Input
                    placeholder="Enter employee username"
                    value={employee?.address.district}
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
                    Deductions <OptionalMaker />
                  </Text>
                  <Input
                    placeholder="Deductions"
                    value={deductions}
                    type="number"
                    onChange={(e) => setDeductions(e.target.value)}
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
                    Payment Method <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    placeholder="Select Payment Method"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    w={"100%"}
                  >
                    <option value={"Bank"}>Bank</option>
                    <option value={"Cash"}>Cash</option>
                    <option value={"Mobile Money"}>Mobile Money</option>
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
                    Payment Reference <OptionalMaker />
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
                    value={amount}
                    type="number"
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
                isDisabled={!amount || !bank}
                onClick={updateemployeeFees}
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

export default AddPayments;
