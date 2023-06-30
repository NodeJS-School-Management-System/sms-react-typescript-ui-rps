import {
  Box,
  Flex,
  WrapItem,
  Input,
  Button,
  FormLabel,
  CircularProgress,
} from "@chakra-ui/react";

import useTheme from "../../../../../theme/useTheme";

const ReusableAddSupplierDetails = ({ creditorobject, itemname }: any) => {
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
            Add Supplier Details
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
                Supplier Name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                value={creditorobject?.suppliername}
                onChange={(e) => {
                  creditorobject?.setSupplierName(e.target.value);
                }}
                type="text"
                placeholder="Name of Supplier"
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
                Supplier Contact <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                required
                type="text"
                value={creditorobject?.suppliercontact}
                onChange={(e) => {
                  creditorobject?.setSupplierContact(e.target.value);
                }}
                placeholder="Supplier Contact"
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
                Supplier Address <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                required
                type="text"
                value={creditorobject?.supplieraddress}
                onChange={(e) => {
                  creditorobject?.setSupplierAddress(e.target.value);
                }}
                placeholder=" Supplier Address"
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
                Supplier Email <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                value={creditorobject?.supplieremail}
                type="text"
                onChange={(e) => {
                  creditorobject?.setSupplierEmail(e.target.value);
                }}
                placeholder=" Supplier Email"
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
                Date of Purchase <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                value={creditorobject?.dateofpurchase}
                type="date"
                onChange={(e) => {
                  creditorobject?.setDateofPurchase(e.target.value);
                }}
                placeholder=""
              />
            </Flex>

            <Button
              my={2}
              variant={"solid"}
              w="50%"
              mx={3}
              onClick={creditorobject?.addCreditor}
              isDisabled={
                !creditorobject?.itemname ||
                !creditorobject?.itemimage ||
                !creditorobject?.invoicenumber ||
                !creditorobject?.supplieraddress ||
                !creditorobject?.supplieremail ||
                !creditorobject?.suppliercontact ||
                !creditorobject?.dateofpurchase ||
                !creditorobject?.suppliername ||
                !creditorobject?.amountpaid ||
                !creditorobject?.totalamount
              }
              backgroundColor={primaryColor.color}
              color="white"
            >
              {creditorobject.isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="white" />
              ) : (
                "Register Supplier"
              )}
            </Button>
          </Box>
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default ReusableAddSupplierDetails;
