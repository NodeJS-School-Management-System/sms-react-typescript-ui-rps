import {
  Box,
  Text,
  Flex,
  Heading,
  WrapItem,
  Input,
  Button,
  FormLabel,
  Alert,
  AlertIcon,
  Spinner,
  Center,
  Select,
  CircularProgress,
} from "@chakra-ui/react";
import { Home, Store } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { storeAnalytics } from "../../../api/fakeAPI";
import AnalyticsBox from "../../../components/uicomponents/AnalyticsBox";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../auth/axiosInstance";

const ManageStore = () => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [itemName, setItemName] = useState("");
  const [itemCostPrice, setItemCostPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // DELETE ITEM FROM STORE **********************************************************
  // const [isDeleting, setIsDeleting] = useState(false);
  // const deleteItem = async (itemId: any) => {
  //   setIsDeleting(true);
  //   try {
  //     const res = await myAPIClient.delete(`/storemanager/remove${itemId}`, {
  //       headers: {
  //         token: `token ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(res.data);
  //     setIsDeleting(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsDeleting(false);
  //   }
  // };

  // EDIT ITEM IN STROE **********************************************************
  // const editItem = async (itemId: any) => {
  //   try {
  //     const res = await myAPIClient.put(`/storemanager/update/${itemId}`, {
  //       headers: {
  //         token: `token ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // CREATE NEW ITEM INTO STORE ************************************************************

  // /TODAYS DATE

  const today = new Date();

  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  // Format the date
  const formattedDate = `${month}/${day}/${year}`;

  const createStore = async (e: any) => {
    e.preventDefault();

    const store = {
      itemName,
      itemQuantity: Number(itemQuantity),
      itemCategory: category,
      itemCostPrice: Number(itemCostPrice),
      dateAdded: formattedDate,
    };
    setIsLoading(true);
    try {
      const res = await myAPIClient.post("/storemanager/additem", store, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });

      setItemCostPrice("");
      setItemName("");
      setItemQuantity("");
      setCategory("");
      setIsLoading(false);
      setSuccess(true);
      setError(false);
      console.log(res.data);
      toast.success("Store item has been added!");
    } catch (err) {
      setError(true);
      setSuccess(false);
      setIsLoading(false);
      toast.error("Error adding store item!");
    }
  };

  // GET ITEM BY NAME *****************************************************************
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [item_name_finder, setItemNameFinder] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [datereleased, setDateReleased] = useState("");
  const [termname, setTermname] = useState("");
  const [availableItem, setAvailableItem] = useState<any>({});

  const getItemByName = async () => {
    setIsRevealing(true);

    try {
      const res = await myAPIClient.get(
        `/storemanager/findbyname/${item_name_finder}`,
        {
          headers: {
            token: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      setAvailableItem(res.data);
      setDetailsRevealed(true);
      setIsRevealing(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setIsRevealing(false);
      setDetailsRevealed(false);
      toast.error("Error getting store item!");
    }
  };

  // RELEASE ITEM
  // UPDATE LENT BOOK

  const token = localStorage.getItem("token");
  const [isLending, setIsLending] = useState(false);
  const releaseItem = async () => {
    setIsLending(true);
    try {
      const res = await myAPIClient.put(
        `/storemanager/update/${item_name_finder}`,
        {
          released_against: user,
          date_released: datereleased,
          runningterm: termname,
          quantity_released: Number(amount),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setAmount("");
      setTermname("");
      setDateReleased("");
      setUser("");
      setIsLending(false);
      toast.success("Success, item has been released!");
    } catch (err) {
      setIsLending(false);
      toast.error("Error processing your request!");
    }
  };

  // USERS *************************************************************************************
  // GET TEACHERS' PAYMENTS
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  // GET MEMBERS' PAYMENTS
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await myAPIClient.get("/users/members/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, []);

  // GET STUDENTS
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/users/students/all", {
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
  }, []);

  const users = [...teachers, ...members, ...students];

  // GET STORE ITEMS FROM DB ****************************************************************
  // const [storeItems, setStoreItems] = useState([]);
  // useEffect(() => {
  //   const getStore = async () => {
  //     setIsLoadingItems(true);
  //     try {
  //       const res = await myAPIClient.get(
  //         "/storemanager/findall",
  //         {
  //           headers: {
  //             token: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       setStoreItems(res.data);
  //       setIsLoadingItems(false);
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoadingItems(false);
  //     }
  //   };
  //   getStore();
  // }, []);

  //  ***********************************************************************************************

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
              Manage Store
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
            <Store style={{ fontSize: 16 }} />
            <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
              Manage Store
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
              <Box
                backgroundColor={primaryColor.color}
                color="white"
                alignItems={"center"}
                justifyContent="center"
                cursor="default"
                display={"flex"}
                p={2}
                fontSize={20}
                w={"100%"}
              >
                Add Store Item
              </Box>

              <Box w={"100%"}>
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
                    placeholder="Name e.g Firewood"
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
                    placeholder="Category e.g Library"
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
                    Item Quantity <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={itemQuantity}
                    onChange={(e) => {
                      setError(false);
                      setSuccess(false);
                      setItemQuantity(e.target.value);
                    }}
                    placeholder="Quantity e.g 40"
                    type="number"
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
                    Item Cost Price <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={itemCostPrice}
                    onChange={(e) => setItemCostPrice(e.target.value)}
                    isRequired
                    type="number"
                    placeholder="Item Cost Price"
                  />
                </Flex>
                {error && (
                  <Alert p={6} w={"90%"} status="error">
                    <AlertIcon />
                    There was an error processing your request
                  </Alert>
                )}

                {success && (
                  <Alert p={6} w={"90%"} status="success">
                    <AlertIcon />
                    Success, store item has been added successfully!
                  </Alert>
                )}

                <Button
                  my={2}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={createStore}
                  backgroundColor={primaryColor.color}
                  color="white"
                  disabled={
                    !itemName || !itemCostPrice || !itemQuantity || !category
                  }
                >
                  {isLoading ? <Spinner color="white" /> : "Create Store"}
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
            <WrapItem
              flex={1}
              gap={6}
              flexDirection={"column"}
              height={"max-content"}
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
                      Release Store Item Book
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
                      placeholder="Enter item name"
                      value={item_name_finder}
                      type="text"
                      w={{ base: "100%", md: "50%" }}
                      onChange={(e) => setItemNameFinder(e.target.value)}
                    />
                    <Button
                      bg={primaryColor.color}
                      color="white"
                      mx={3}
                      disabled={!item_name_finder}
                      onClick={getItemByName}
                    >
                      {isRevealing ? "Fetching.." : "Get Item Details"}
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
                          Item Category
                        </Text>

                        <Input
                          placeholder="Enter student passcode"
                          value={
                            availableItem?.itemCategory
                              ? availableItem?.itemCategory
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
                          Item Quantity
                        </Text>

                        <Input
                          placeholder="Enter student passcode"
                          value={availableItem?.itemQuantity}
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
                          Item Cost Price
                        </Text>

                        <Input
                          value={availableItem?.itemCostPrice}
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
                          Quantity Remaining
                        </Text>

                        <Input
                          placeholder=""
                          value={availableItem?.quantity_remaining || "N/A"}
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
                          Released Against{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Text>

                        <Select
                          placeholder="Select User"
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          w={"100%"}
                        >
                          {users?.map((c: any) => (
                            <option key={c._id} value={c.username}>
                              {c.username}
                            </option>
                          ))}
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
                          Quantity Released
                          <span style={{ color: "red" }}>*</span>{" "}
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
                          Date of Release{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Text>
                        <Input
                          placeholder="Date Released"
                          type="date"
                          value={datereleased}
                          onChange={(e) => setDateReleased(e.target.value)}
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
                          Running Term <span style={{ color: "red" }}>*</span>{" "}
                        </Text>
                        <Select
                          placeholder="Select Term"
                          onChange={(e) => setTermname(e.target.value)}
                          value={termname}
                        >
                          <option value={"Term One"}>Term One</option>
                          <option value={"Term Two"}>Term Two</option>
                          <option value={"Term Three"}>Term Three</option>
                        </Select>
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
                      isDisabled={
                        !amount || !termname || !datereleased || !user
                      }
                      onClick={releaseItem}
                    >
                      {isLending ? (
                        <CircularProgress
                          isIndeterminate
                          color="white"
                          size={"24px"}
                        />
                      ) : (
                        "Release Item"
                      )}
                    </Button>
                  )}
                </Box>
              </Center>
            </WrapItem>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ManageStore;
