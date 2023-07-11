import {
  Box,
  Flex,
  WrapItem,
  Input,
  Button,
  FormLabel,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OptionalMaker } from "../../../../../../../components/student/add/AddStudent";
import useTheme from "../../../../../../../theme/useTheme";
import { myAPIClient } from "../../../../../../auth/axiosInstance";

const UpdateCreditorPayments = ({ user }: { user: any }) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [amount, setAmount] = useState("");
  const [dateofpurchase, setDateofPurchase] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateCreditor = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.put(
        `/creditors/update/${user._id}`,
        {
          amount_paid: Number(amount),
          date_of_payment: dateofpurchase,
          quantity_supplied: Number(quantity),
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsLoading(false);
      toast.success("Success, details have been updated!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Error processing your request, try again!");
    }
  };

  return (
    <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
      <Box w={"100%"} flex={1}>
        <WrapItem flex={1} gap={6} flexDirection={"column"} h={"max-content"}>
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
                fontSize={16}
                fontWeight="bold"
                alignSelf={"flex-start"}
                color={"gray"}
                mb={3}
              >
                Amount Paid <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount Paid"
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
                Quantity Supplied <OptionalMaker />
              </FormLabel>
              <Input
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                placeholder="quantity Supplied"
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
                Date of Payment <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                value={dateofpurchase}
                type="date"
                onChange={(e) => {
                  setDateofPurchase(e.target.value);
                }}
                placeholder=""
              />
            </Flex>

            <Button
              my={2}
              variant={"solid"}
              w="50%"
              mx={3}
              onClick={updateCreditor}
              isDisabled={!amount || !dateofpurchase}
              backgroundColor={primaryColor.color}
              color="white"
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="white" />
              ) : (
                " Update Supplier"
              )}
            </Button>
          </Box>
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default UpdateCreditorPayments;
