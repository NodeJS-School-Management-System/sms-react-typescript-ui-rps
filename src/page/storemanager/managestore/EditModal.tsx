import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  AlertIcon,
  Input,
  FormLabel,
  Flex,
  Box,
  Alert,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { myAPIClient } from "../../auth/axiosInstance";

const EditModal = ({ isOpen, onOpen, onClose, setIsEditing, item }: any) => {
  const finalRef = useRef(null);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState<any>(undefined);
  const [itemQuantity, setItemQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(false);

  // EDIT ITEM IN STROE *************************************************

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItemImage(e.target.files[0]);
      setError(false);
      setSuccess(false);
      console.log(itemImage);
    }
  };

  const updateStore = async (e: any) => {
    e.preventDefault();

    const store: any = {
      itemName: itemName ? itemName : item.itemName,
      itemQuantity: itemQuantity ? parseInt(itemQuantity) : item.itemQuantity,
      category: category ? category : item.category,
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
          await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: any) => {
              console.log(downloadURL);
              store.itemImage = downloadURL ? downloadURL : item.itemImage;
            }
          );
          try {
            const res = await myAPIClient.put(
              `/storemanager/${item.storeId}`,
              store,
              {
                headers: {
                  token: `token ${localStorage.getItem("token")}`,
                },
              }
            );
            setItemImage("");
            setItemName("");
            setItemQuantity(item.itemQuantity);
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
    } else {
      try {
        const res = await myAPIClient.put(
          `/storemanager/${item.storeId}`,
          store,
          {
            headers: {
              token: `token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        setItemImage("");
        setItemName("");
        setItemQuantity(item.itemQuantity);
        setCategory("");
        setIsLoading(false);
        setSuccess(true);
        setError(false);
      } catch (err) {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={22}>Update Store Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"}>
              <Flex
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
                    setItemName(e.target.value);
                    setError(false);
                    setSuccess(false);
                  }}
                  type="text"
                  placeholder={item.itemName}
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
                  placeholder={item.category}
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
                  placeholder={item.itemQuantity}
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
                  Success, store item has been updated successfully!
                </Alert>
              )}

              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={updateStore}
                colorScheme={"teal"}
                disabled={!itemName && !itemImage && !itemQuantity && !category}
              >
                {isLoading ? <Spinner color="red.500" /> : "Update Store"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
