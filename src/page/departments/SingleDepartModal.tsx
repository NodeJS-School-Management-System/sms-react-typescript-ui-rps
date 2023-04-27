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
import { useEffect, useState } from "react";

const SingleDepartModal = ({ isOpen, onOpen, onClose, selectedId }: any) => {
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState<any>(undefined);
  const [itemQuantity, setItemQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [takenBy, setTakenBy] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setItemImage("");
    setIsLoading(false);
  }, []);

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
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
                  // placeholder={item.itemName}
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
                  // placeholder={item.category}
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
                  Taken By <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="text"
                  value={takenBy}
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setTakenBy(e.target.value);
                  }}
                  // placeholder={item.category}
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
                  // placeholder={item.itemQuantity}
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
                  // onChange={onUploadImage}
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
                //   onClick={updateStore}
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

export default SingleDepartModal;
