import {
  Box,
  Flex,
  WrapItem,
  Input,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";

const AddAsset = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [itemname, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const newAsset = {
    itemname,
    category,
    networth: amount,
  };
  const addAsset = async () => {
    setLoading(true);
    try {
      const res = await myAPIClient.post(
        "/fixedasset/newfixedasset",
        newAsset,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Success, asset has been added!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Sorry, something went wrong adding new asset!");
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
      <Box w={"100%"} flex={1}>
        <WrapItem flex={1} gap={6} flexDirection={"column"} h={"max-content"}>
          <Box
            backgroundColor={primaryColor.color}
            color="white"
            fontSize={18}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            w="100%"
            py={2}
          >
            Add Asset
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
              onClick={addAsset}
              isDisabled={!itemname || !category || !amount}
              backgroundColor={primaryColor.color}
              color="white"
            >
              {loading ? "Adding.." : " Add Asset"}
            </Button>
          </Box>
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default AddAsset;
