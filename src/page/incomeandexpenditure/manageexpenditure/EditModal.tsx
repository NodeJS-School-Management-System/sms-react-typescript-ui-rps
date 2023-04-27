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
import { useState } from "react";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";

const EditModal = ({ isOpen, item, onOpen, onClose, selectedId }: any) => {
  const [itemname, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // EDIT ITEM IN STROE *************************************************
  const updateExpense = async (e: any) => {
    e.preventDefault();

    const store: any = {
      itemname: itemname ? itemname : item?.itemname,
      amount: amount ? Number(amount) : item?.amount,
      category: category ? category : item?.category,
    };
    setIsLoading(true);

    try {
      const res = await myAPIClient.put(`/expenditure/${selectedId}`, store, {
        headers: {
          token: `token ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setItemName("");
      setAmount("");
      setCategory("");
      setIsLoading(false);
      setSuccess(true);
      setError(false);
    } catch (err) {
      setError(true);
      setSuccess(false);
      setIsLoading(false);
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={primaryColor.color} fontSize={22}>
            Update Income
          </ModalHeader>
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
                  value={itemname}
                  onChange={(e) => {
                    setItemName(e.target.value);
                    setError(false);
                    setSuccess(false);
                  }}
                  type="text"
                  placeholder={item.itemname}
                />
              </Flex>
              <Flex
                py={3}
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
                py={3}
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
                  Amount <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={amount}
                  onChange={(e) => {
                    setError(false);
                    setSuccess(false);
                    setAmount(e.target.value);
                  }}
                  placeholder={item.amount}
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
                  Success, expense has been updated successfully!
                </Alert>
              )}

              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={updateExpense}
                bgColor={primaryColor.color}
                color="white"
                isDisabled={!itemname && !amount && !category}
              >
                {isLoading ? <Spinner color="red.500" /> : "Update Income"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
