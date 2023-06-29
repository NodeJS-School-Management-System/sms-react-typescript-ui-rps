import {
  Box,
  Flex,
  Heading,
  WrapItem,
  Input,
  Button,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Agriculture, Download, FeedRounded } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllInbox, AttachMoney } from "@mui/icons-material";

import { useReactToPrint } from "react-to-print";
import { myAPIClient } from "../../../../auth/axiosInstance";
import useTheme from "../../../../../theme/useTheme";
import AnalyticsBox from "../../../../../components/uicomponents/AnalyticsBox";
import ReusableAnalytics from "../reusable/ReusableAnalytics";

const Incomes = () => {
  const incomeStmtRef = useRef<any>();
  const [showPrint, setShowPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => incomeStmtRef.current,
    documentTitle: "Income Statement",
  });

  const {
    theme: { primaryColor },
  } = useTheme();

  const [isLoadingItems, setIsLoadingItems] = useState(false);

  // EXPENSES

  const [expenses, setExpenses] = useState([]);
  const getExpesnes = async () => {
    try {
      const res = await myAPIClient.get("/expenses/findall", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpesnes();
  }, []);

  // INCOMES
  const tableHeaders = ["Item Name", "Item Category", "Amount", "Action"];

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [itemname, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const newincome = {
    itemname,
    category,
    amount,
  };
  const addIncome = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.post("/incomes/newincome", newincome, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setAmount("");
      setCategory("");
      setItemName("");
      setIsLoadingItems(!isLoadingItems);
      toast.success("Success, income has been added!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Sorry, something went wrong adding new income!");
    }
  };

  // DELETE INCOME
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteIncome = async (id: any) => {
    try {
      await myAPIClient.delete(`incomes/remove/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsDeleting(!isDeleting);
      toast.success("Success, income has been deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  // ALL INCOMES
  const [incomes, setIncomes] = useState([]);
  const getData = async () => {
    try {
      const res = await myAPIClient.get("/incomes/findall", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIncomes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoadingItems, isDeleting]);

  // FILTER BY CATEGORY
  const filterIncomesByCategory = (category: string) => {
    const filteredIncomes = incomes.filter(
      (income: any) => income.category.toLowerCase() === category.toLowerCase()
    );

    const totalAmount = filteredIncomes.reduce(
      (total: any, income: any) => total + income.amount,
      0
    );

    return totalAmount;
  };

  // TOTAL AMOUNT
  const getTotal = () => {
    const totalAmount = incomes.reduce(
      (total: any, income: any) => total + income.amount,
      0
    );
    return totalAmount;
  };

  // OPEN MODAL ***********************************************************************************************

  // ANALYTICS
  const incomeAnalytics = [
    {
      title: "Agriculture",
      value: filterIncomesByCategory("Agriculture"),
      icon: Agriculture,
      bgColor: "teal",
    },
    {
      title: "School Fees",
      value: filterIncomesByCategory("School Fees"),
      icon: FeedRounded,
      bgColor: "orange",
    },
    {
      title: "Accounts Receivable",
      value: filterIncomesByCategory("Accounts Receivable"),
      icon: AllInbox,
      bgColor: "darkblue",
    },
    {
      title: "Total Received",
      value: getTotal(),
      icon: AttachMoney,
      bgColor: "purple",
    },
  ];

  return (
    <Box>
      <Flex
        boxShadow="base"
        p={4}
        w="100%"
        h="100%"
        gap={3}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        {incomeAnalytics.map((item: any) => (
          <AnalyticsBox item={item} />
        ))}
      </Flex>

      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        boxShadow={"lg"}
      >
        <Box w={{ base: "100%", lg: "100%" }} boxShadow={"lg"} m={2} flex={1}>
          <WrapItem flex={1} gap={6} flexDirection={"column"} h={"max-content"}>
            <Box
              backgroundColor={primaryColor.color}
              color="white"
              cursor="default"
              fontSize={16}
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              w="100%"
              py={2}
            >
              Add Income
            </Box>

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
                <FormLabel
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Item Name <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={itemname}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name e.g School Fees"
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
                <FormLabel
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Category <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="text"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  placeholder="Category e.g Accounts Receivalble"
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
                <FormLabel
                  fontSize={16}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Amount <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={amount}
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Amount e.g 400,000"
                />
              </Flex>

              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={addIncome}
                isDisabled={!itemname || !category || !amount}
                backgroundColor={primaryColor.color}
                color="white"
              >
                {loading ? <Spinner color="white" /> : "Add Income"}
              </Button>
            </Box>
          </WrapItem>
        </Box>

        <Box
          w={{ base: "100%", lg: "50%" }}
          h={600}
          overflowY="scroll"
          boxShadow={"lg"}
          m={2}
          flex={1}
        >
          {loading ? (
            <Flex align="center" m="auto" mt={20} justify="center">
              <Spinner style={{ margin: "auto" }} color="teal" />
            </Flex>
          ) : (
            <ReusableAnalytics
              tableHeaders={tableHeaders}
              captionText="List of Incomes"
              data={incomes}
              deleteIncome={deleteIncome}
            />
          )}
        </Box>
      </Flex>

      {/* GET INCOME STATEMENT BUTTON */}
      <Box position="fixed" bottom="50px" right="50px">
        <IconButton
          w={70}
          h={70}
          bgColor={primaryColor.color}
          color="white"
          onClick={() => {
            setShowPrint(true);
            setTimeout(() => {
              handlePrint();
            }, 2000);
          }}
          aria-label="Add to database"
          icon={<Download style={{ width: "60%", height: "60%" }} />}
        />
      </Box>

      {/* Income statement */}
      <Box
        display={showPrint ? "block" : "none"}
        w="70%"
        m="auto"
        ref={incomeStmtRef}
      >
        <Box m="auto">
          <Heading m="auto" textAlign={"center"}>
            Rwebita Preparatory School
          </Heading>
          <Box m="auto" textAlign={"center"} fontSize={16} fontWeight="bold">
            Income Statement for the Year {new Date().getFullYear()}
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <TableCaption></TableCaption>
              <Thead>
                <Th fontSize={18} fontWeight="bold">
                  REVENUES
                </Th>
                <Tr>
                  <Th fontSize={16}>Item Name</Th>
                  <Th fontSize={16}>Category</Th>
                  <Th fontSize={16}>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr></Tr>
                {incomes?.map((item: any) => (
                  <Tr key={item._id}>
                    <Td>{item.itemname}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.amount}/=</Td>
                  </Tr>
                ))}
                <Tr>
                  <Th fontSize={16}>Total Revenue</Th>
                  <Th fontSize={16}></Th>
                  <Th fontSize={16}>
                    {incomes.reduce(
                      (total: any, item: any) => total + item.amount,
                      0
                    )}
                    /=
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Income Statement</TableCaption>
              <Thead>
                <Th fontSize={18} fontWeight="bold">
                  EXPENSES
                </Th>
                <Tr>
                  <Th fontSize={16}>Item Name</Th>
                  <Th fontSize={16}>Category</Th>
                  <Th fontSize={16}>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr></Tr>
                {expenses?.map((item: any) => (
                  <Tr key={item.expenditureId}>
                    <Td>{item.itemname}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.amount}/=</Td>
                  </Tr>
                ))}
                <Tr>
                  <Th fontSize={16}>Total Expenses</Th>
                  <Th fontSize={16}></Th>
                  <Th fontSize={16}>
                    {expenses.reduce(
                      (total: any, item: any) => total + item.amount,
                      0
                    )}
                    /=
                  </Th>
                </Tr>
                <Tr></Tr>
                <Tr>
                  <Th fontSize={16}>Net Income</Th>
                  <Th></Th>
                  <Th fontSize={16}>
                    {incomes.reduce(
                      (total: any, item: any) => total + item.amount,
                      0
                    ) -
                      expenses.reduce(
                        (total: any, item: any) => total + item.amount,
                        0
                      )}
                    /=
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Incomes;
