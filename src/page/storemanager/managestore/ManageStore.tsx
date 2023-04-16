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
  Image,
  Alert,
  AlertIcon,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit, Home, Store } from "@mui/icons-material";
import { BiTrash } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { storeAnalytics } from "../../../api/fakeAPI";
import AnalyticsBox from "../../../components/uicomponents/AnalyticsBox";
import useTheme from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../auth/axiosInstance";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { SpinnerIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
const ManageStore = () => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState<any>(undefined);
  const [itemQuantity, setItemQuantity] = useState<any>(undefined);
  const [category, setCategory] = useState("");
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

  // DELETE ITEM FROM STORE **********************************************************
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteItem = async (itemId: any) => {
    setIsDeleting(true);
    try {
      const res = await myAPIClient.delete(`storemanager/${itemId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };

  // EDIT ITEM IN STROE **********************************************************
  const [isEditing, setIsEditing] = useState(false);
  const editItem = async (itemId: any) => {
    setIsEditing(true);
    try {
      const res = await myAPIClient.put(`storemanager/${itemId}`, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setIsEditing(false);
    }
  };

  // CREATE NEW ITEM INTO STROE *************************************************
  const createStore = async (e: any) => {
    e.preventDefault();

    const store: any = {
      itemName,
      itemQuantity,
      category,
    };

    setIsLoading(true);
    if (itemImage !== null) {
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
            store.itemImage = downloadURL;
          });
          try {
            const res = await myAPIClient.post("/storemanager", store, {
              headers: {
                token: `token ${localStorage.getItem("token")}`,
              },
            });

            setItemImage("");
            setItemName("");
            setItemQuantity(1);
            setCategory("");

            setIsLoading(false);
            setSuccess(true);
            setError(false);
            console.log(res.data);
          } catch (err) {
            setError(true);
            setSuccess(false);
            setIsLoading(false);
          }
        }
      );
    }
  };

  // GET STORE ITEMS FROM DB ****************************************************************
  const [storeItems, setStoreItems] = useState([]);
  useEffect(() => {
    const getStore = async () => {
      setIsLoadingItems(true);
      try {
        const res = await myAPIClient.get(
          "/storemanager",

          {
            headers: {
              token: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStoreItems(res.data);
        setIsLoadingItems(false);
      } catch (err) {
        console.log(err);
        setIsLoadingItems(false);
      }
    };
    getStore();
  }, [isDeleting, isEditing, onClose]);

  // ***********************************************************************************************

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
          my={3}
        >
          <Box display={"flex"}>
            <Heading as={"h5"} color={primaryColor.color}>
              Store Manager
            </Heading>
            <Text>SMS</Text>
          </Box>
          <Box display={"flex"} alignItems="center" gap={2}>
            <Home />
            <Link to="/">
              <Text fontWeight="bold" fontSize={14}>
                Home
              </Text>
            </Link>
            <FaAngleRight />
            <Store />
            <Text fontWeight="bold" fontSize={14}>
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
              <Button
                colorScheme={"teal"}
                cursor="default"
                fontSize={20}
                w={"100%"}
              >
                Add Store Item
              </Button>

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
                  bg={"white"}
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
                  bg={"white"}
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Item Image <span style={{ color: "red" }}>*</span>
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
                  colorScheme={"teal"}
                  disabled={
                    !itemName || !itemImage || !itemQuantity || !category
                  }
                >
                  {isLoading ? <Spinner color="red.500" /> : "Create Store"}
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
                  <TableCaption>Store Analytics</TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontSize={16}>Item Name</Th>
                      <Th fontSize={16}>Item Category</Th>
                      <Th fontSize={16}>Item Image</Th>
                      <Th fontSize={16}>Total Items</Th>
                      <Th fontSize={16}>Items Used</Th>
                      <Th fontSize={16}>Remaining Items</Th>
                      <Th fontSize={16}>Date Added</Th>
                      <Th fontSize={16}>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {storeItems.map((item: any) => (
                      <Tr key={item.storeId}>
                        <Td>{item.itemName}</Td>
                        <Td>{item.category}</Td>
                        <Td textAlign={"center"} margin="auto" p={0}>
                          <Image
                            w={45}
                            margin="auto"
                            h={45}
                            objectFit="cover"
                            borderRadius={"50%"}
                            src={item.itemImage}
                          />
                        </Td>
                        <Td>{item.itemQuantity}</Td>
                        <Td>40</Td>
                        <Td>80</Td>
                        <Td>12/02/2023</Td>
                        <Td display={"flex"} gap={2}>
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete database"
                            onClick={() => deleteItem(item.storeId)}
                            icon={isDeleting ? <SpinnerIcon /> : <BiTrash />}
                          />
                          <IconButton
                            colorScheme="blue"
                            onClick={onOpen}
                            aria-label="Edit database"
                            icon={<Edit />}
                          />
                          <Box display="none">
                            <EditModal
                              setIsLoadingItems={setIsLoadingItems}
                              item={item}
                              editItem={editItem}
                              onOpen={onOpen}
                              onClose={onClose}
                              isOpen={isOpen}
                            />
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

export default ManageStore;
