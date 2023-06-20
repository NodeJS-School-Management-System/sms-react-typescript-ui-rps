import {
  Box,
  Flex,
  WrapItem,
  Input,
  Button,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { FeedRounded } from "@mui/icons-material";
import { BiFoodMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AllInbox, AttachMoney } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";
import AnalyticsBox from "../../../../../components/uicomponents/AnalyticsBox";
import ReusableAnalytics from "../reusable/ReusableAnalytics";

const Expenses = () => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [isLoadingItems, setIsLoadingItems] = useState(false);

  // INCOMES
  const tableHeaders = ["Item Name", "Item Category", "Amount", "Action"];

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [itemname, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const newexpense = {
    itemname,
    category,
    amount,
  };
  const addExpense = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.post("/expenses/newexpense", newexpense, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setAmount("");
      setCategory("");
      setItemName("");
      setIsLoadingItems(true);
      toast.success("Success, expense has been added!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Sorry, something went wrong adding new expense!");
    }
  };

  const [expenses, setExpenses] = useState([]);
  const getData = async () => {
    try {
      const res = await myAPIClient.get("/expenses/findall", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoadingItems]);

  // ANALYTICS
  const storeAnalytics = [
    {
      title: "Food",
      value: 34,
      icon: BiFoodMenu,
      bgColor: "teal",
    },
    {
      title: "Staff Salary",
      value: 3,
      icon: FeedRounded,
      bgColor: "orange",
    },
    {
      title: "Others",
      value: 53,
      icon: AllInbox,
      bgColor: "darkblue",
    },
    {
      title: "Total Spent",
      value: 4500000,
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
        {storeAnalytics.map((item: any) => (
          <AnalyticsBox item={item} />
        ))}
      </Flex>

      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        boxShadow={"lg"}
      >
        <Box w={{ base: "100%", lg: "50%" }} boxShadow={"lg"} m={2} flex={1}>
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
              {loading ? "Adding.." : "Add Expense"}
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
                  placeholder="Name e.g Staff Salary"
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
                  Category <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="text"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  placeholder="Category e.g Accounts Payable"
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
                onClick={addExpense}
                isDisabled={!itemname || !category || !amount}
                backgroundColor={primaryColor.color}
                color="white"
              >
                {loading ? <Spinner color="white" /> : "Add Expense"}
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
          <ReusableAnalytics
            tableHeaders={tableHeaders}
            captionText="List of Expenses"
            data={expenses}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Expenses;
