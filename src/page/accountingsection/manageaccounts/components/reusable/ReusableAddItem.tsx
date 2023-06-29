import {
  Box,
  Flex,
  WrapItem,
  Input,
  FormLabel,
  CircularProgress,
  Button,
} from "@chakra-ui/react";

import useTheme from "../../../../../theme/useTheme";

const ReusableAddItem = ({ itemname, grantObj, creditorobject }: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
      {itemname === "Grant" ? (
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
              Add {itemname}
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
                  Funder Name <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  value={grantObj.fundername}
                  onChange={(e) => {
                    grantObj.setFundername(e.target.value);
                  }}
                  placeholder="Funder Name"
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
                  value={grantObj.amount}
                  type="number"
                  onChange={(e) => {
                    grantObj.setAmount(e.target.value);
                  }}
                  placeholder="Amount"
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
                  Date Received <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={grantObj.date}
                  type="date"
                  onChange={(e) => {
                    grantObj.setDate(e.target.value);
                  }}
                  placeholder="Date"
                />
              </Flex>

              {/* SUBMIT BTN */}
              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={grantObj.addGrant}
                isDisabled={
                  !grantObj.amount || !grantObj.fundername || !grantObj.date
                }
                backgroundColor={primaryColor.color}
                color="white"
              >
                {grantObj.loading ? (
                  <CircularProgress isIndeterminate size="24px" color="white" />
                ) : (
                  "Register Supplier"
                )}
              </Button>
            </Box>
          </WrapItem>
        </Box>
      ) : (
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
              Add {itemname}
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
                  value={creditorobject?.itemname}
                  onChange={(e) => {
                    creditorobject?.setItemName(e.target.value);
                  }}
                  type="text"
                  placeholder="Item Name"
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
                  Invoice Number <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="text"
                  value={creditorobject?.invoicenumber}
                  onChange={(e) => {
                    creditorobject?.setInvoiceNumber(e.target.value);
                  }}
                  placeholder="Invoice Number"
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
                  Invoice File <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="file"
                  // value={creditorobject?.itemimage}
                  onChange={creditorobject?.onUploadImage}
                  placeholder=""
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
                  Amount Paid <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  required
                  type="number"
                  value={creditorobject?.amountpaid}
                  onChange={(e) => {
                    creditorobject?.setAmountPaid(e.target.value);
                  }}
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
                  fontSize={20}
                  fontWeight="bold"
                  alignSelf={"flex-start"}
                  color={"gray"}
                  mb={3}
                >
                  Total Amount <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  value={creditorobject?.totalamount}
                  type="number"
                  onChange={(e) => {
                    creditorobject?.setTotalAmount(e.target.value);
                  }}
                  placeholder="Total Amount"
                />
              </Flex>
            </Box>
          </WrapItem>
        </Box>
      )}
    </Flex>
  );
};

export default ReusableAddItem;
