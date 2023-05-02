import {
  Box,
  Text,
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
  Alert,
  AlertIcon,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit, FeedRounded, Home, Money } from "@mui/icons-material";
import { BiFoodMenu, BiTrash } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnalyticsBox from "../../../components/uicomponents/AnalyticsBox";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../auth/axiosInstance";
import { AllInbox, AttachMoney } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpinnerIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
const ManageExpenditure = () => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [itemname, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // DELETE ITEM FROM income **********************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteItem = async (itemId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`expenditure/${itemId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
      toast.success("Success, item has been deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, try again!");
      setIsDeleting(false);
    }
  };

  // EDIT ITEM IN STROE **********************************************************
  const editItem = async (itemId: any) => {
    try {
      const res = await myAPIClient.put(`expenditure/${itemId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE NEW EXPENDITURE ************************************************************************************
  const addIncome = async (e: any) => {
    e.preventDefault();

    const income: any = {
      itemname,
      amount: Number(amount),
      category,
    };

    setIsLoading(true);

    try {
      const res = await myAPIClient.post("/expenditure", income, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsLoading(false);
      setItemName("");
      setAmount("");
      setCategory("");
      toast.success("Success, expense has been added!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Something went wrong, try again!");
    }
  };

  // GET EXPENDITURE ITEMS FROM DB ****************************************************************
  const [incomeItems, setincomeItems] = useState([]);
  useEffect(() => {
    const getincome = async () => {
      setIsLoadingItems(true);
      try {
        const res = await myAPIClient.get("/expenditure", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setincomeItems(res.data);
        setIsLoadingItems(false);
      } catch (err) {
        console.log(err);
        setIsLoadingItems(false);
      }
    };
    getincome();
  }, [isDeleting]);

  // OPEN MODAL ***********************************************************************************************

  const [selectedId, setSelectedId] = useState("");
  const openModel = (id: any) => {
    setSelectedId(id);
    onOpen();
  };

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
    <Flex direction="column" style={{ width: "100%" }}>
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
              Manage Expenses
            </Heading>
            <Text fontSize={{ base: 10, lg: 16 }}>SMS</Text>
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
              Manage Expenses
            </Text>
          </Box>
        </Flex>

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
            <WrapItem
              flex={1}
              gap={6}
              flexDirection={"column"}
              h={"max-content"}
            >
              <Button
                backgroundColor={primaryColor.color}
                color="white"
                cursor="default"
                fontSize={20}
                w={"100%"}
              >
                Add Expense
              </Button>

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
                    fontSize={20}
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
                      setError(false);
                      setSuccess(false);
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
                    fontSize={20}
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
                      setError(false);
                      setSuccess(false);
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
                    fontSize={20}
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
                      setError(false);
                      setSuccess(false);
                      setAmount(e.target.value);
                    }}
                    placeholder="Amount e.g 400,000"
                  />
                </Flex>

                {error && (
                  <Alert p={6} w={"90%"} status="error">
                    <AlertIcon />
                    There was an error processing your request
                  </Alert>
                )}

                {success && (
                  <Alert ml={3} p={6} w={"90%"} status="success">
                    <AlertIcon />
                    Success, expense has been added successfully!
                  </Alert>
                )}

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
                  {isLoading ? <Spinner color="white" /> : "Add Expense"}
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
            {isLoadingItems ? (
              <Flex align="center" m="auto" mt={20} justify="center">
                <Spinner style={{ margin: "auto" }} color="teal" />
              </Flex>
            ) : (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Expenditure Analytics</TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontSize={16}>Item Name</Th>
                      <Th fontSize={16}>Category</Th>
                      <Th fontSize={16}>Amount</Th>
                      <Th fontSize={16}>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {incomeItems?.map((item: any) => (
                      <Tr key={item.expenditureId}>
                        <Td>{item.itemname}</Td>
                        <Td>{item.category}</Td>

                        <Td>{item.amount}/=</Td>

                        <Td display={"flex"} gap={2}>
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete database"
                            onClick={() => deleteItem(item.expenditureId)}
                            icon={isDeleting ? <SpinnerIcon /> : <BiTrash />}
                          />
                          <IconButton
                            colorScheme="blue"
                            onClick={() => openModel(item.expenditureId)}
                            aria-label="Edit database"
                            icon={<Edit />}
                          />
                          <Box display="none">
                            {isOpen ? (
                              <EditModal
                                setIsLoadingItems={setIsLoadingItems}
                                item={item}
                                editItem={editItem}
                                onOpen={onOpen}
                                onClose={onClose}
                                isOpen={isOpen}
                                selectedId={selectedId}
                              />
                            ) : null}
                          </Box>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ManageExpenditure;
