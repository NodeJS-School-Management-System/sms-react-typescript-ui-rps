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
import {
  Agriculture,
  Download,
  Edit,
  FeedRounded,
  Home,
  Money,
} from "@mui/icons-material";
import { BiTrash } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnalyticsBox from "../../../components/uicomponents/AnalyticsBox";
import useTheme from "../../../theme/useTheme";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "../../auth/axiosInstance";
import { AllInbox, AttachMoney } from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { SpinnerIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
import { useReactToPrint } from "react-to-print";
const ManageIncome = () => {
  const incomeStmtRef = useRef<any>();
  const [showPrint, setShowPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => incomeStmtRef.current,
    documentTitle: "Income Statement",
  });

  const {
    theme: { primaryColor },
  } = useTheme();

  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState<any>(undefined);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItemImage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(itemImage);
    }
  };

  // DELETE ITEM FROM INCOME **********************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteItem = async (itemId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`income/${itemId}`, {
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
      const res = await myAPIClient.put(`incomemanager/${itemId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE NEW INCOME ************************************************************************************
  const addIncome = async (e: any) => {
    e.preventDefault();

    const income: any = {
      itemName,
      amount: Number(amount),
      category,
    };

    setIsLoading(true);

    if (itemImage && itemImage !== null) {
      const datai = new FormData();
      const fileName = Date.now() + itemImage.name;
      datai.append("name", fileName);
      datai.append("file", itemImage);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, itemImage);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            income.itemImage = downloadURL;
          });
          try {
            const res = await myAPIClient.post("/income", income, {
              headers: {
                token: `token ${localStorage.getItem("token")}`,
              },
            });
            setItemImage("");
            setItemName("");
            setAmount("");
            setCategory("");

            setIsLoading(false);
            setSuccess(true);
            setError(false);
            toast.success("Success, item has been added!");
            console.log(res.data);
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
            toast.error("Something went wrong, try again!");
          }
        }
      );
    } else {
      try {
        const res = await myAPIClient.post("/income", income, {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setIsLoading(false);
        setItemImage("");
        setItemName("");
        setAmount("");
        setCategory("");
        toast.success("Success, item has been added!");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Something went wrong, try again!");
      }
    }
  };

  // GET Income ITEMS FROM DB ****************************************************************
  const [incomeItems, setincomeItems] = useState([]);
  useEffect(() => {
    const getincome = async () => {
      setIsLoadingItems(true);
      try {
        const res = await myAPIClient.get("/income", {
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

  // GET EXPENSES FROM DB ****************************************************************
  const [expenditureItems, setExpenditureItems] = useState([]);
  useEffect(() => {
    const getExpenses = async () => {
      setIsLoadingItems(true);
      try {
        const res = await myAPIClient.get("/expenditure", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setExpenditureItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getExpenses();
  }, []);

  // OPEN MODAL ***********************************************************************************************

  const [selectedId, setSelectedId] = useState("");
  const openModel = (id: any) => {
    setSelectedId(id);
    onOpen();
  };

  // ANALYTICS
  const incomeAnalytics = [
    {
      title: "Agriculture",
      value: 34,
      icon: Agriculture,
      bgColor: "teal",
    },
    {
      title: "School Fees",
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
      title: "Total Received",
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
              Manage Income
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
              Manage Income
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
          {incomeAnalytics.map((item: any) => (
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
                Add Income
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
                    value={itemName}
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
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
                    Image{" "}
                    <span
                      style={{ color: "gray", fontWeight: 300, fontSize: 12 }}
                    >
                      (optional)
                    </span>
                  </FormLabel>
                  <Input
                    border={"none"}
                    onChange={onUploadImage}
                    isRequired
                    type="file"
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
                    Success, income item has been added successfully!
                  </Alert>
                )}

                <Button
                  my={2}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={addIncome}
                  isDisabled={!itemName || !category || !amount}
                  backgroundColor={primaryColor.color}
                  color="white"
                >
                  {isLoading ? <Spinner color="white" /> : "Add Income"}
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
                  <TableCaption>Income Analytics</TableCaption>
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
                      <Tr key={item.incomeId}>
                        <Td>{item.itemName}</Td>
                        <Td>{item.category}</Td>

                        <Td>{item.amount}/=</Td>

                        <Td display={"flex"} gap={2}>
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete database"
                            onClick={() => deleteItem(item.incomeId)}
                            icon={isDeleting ? <SpinnerIcon /> : <BiTrash />}
                          />
                          <IconButton
                            colorScheme="blue"
                            onClick={() => openModel(item.incomeId)}
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
            <Heading color={primaryColor.color} m="auto" textAlign={"center"}>
              Rwebita Preparatory School
            </Heading>
            <Box
              color={primaryColor.color}
              m="auto"
              textAlign={"center"}
              fontSize={20}
              fontWeight="bold"
            >
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
                  {incomeItems?.map((item: any) => (
                    <Tr key={item.incomeId}>
                      <Td>{item.itemName}</Td>
                      <Td>{item.category}</Td>

                      <Td>{item.amount}/=</Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Th fontSize={16}>Total Revenue</Th>
                    <Th fontSize={16}></Th>
                    <Th fontSize={16}>
                      {incomeItems.reduce(
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
                  {expenditureItems?.map((item: any) => (
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
                      {expenditureItems.reduce(
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
                      {incomeItems.reduce(
                        (total: any, item: any) => total + item.amount,
                        0
                      ) -
                        expenditureItems.reduce(
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
    </Flex>
  );
};

export default ManageIncome;
