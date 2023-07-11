import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "../../../../auth/axiosInstance";
import ReusableAddItem from "../reusable/ReusableAddItem";
import ReusableAddSupplierDetails from "../reusable/ReusableAddSupplierDetails";

const Purchases = () => {
  // ADD SUPPLIER AND ITEM DETAILS
  const [itemname, setItemName] = useState("");
  const [amountpaid, setAmountPaid] = useState("");
  const [quantity_supplied, setQuantity] = useState("");
  const [item_unit_of_measurement, setUnit] = useState("");
  const [totalamount, setTotalAmount] = useState("");
  const [suppliername, setSupplierName] = useState("");
  const [supplieraddress, setSupplierAddress] = useState("");
  const [suppliercontact, setSupplierContact] = useState("");
  const [supplieremail, setSupplierEmail] = useState("");
  const [dateofpurchase, setDateofPurchase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ADD CREDITOR
  const addCreditor = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const creditor: any = {
      itemname,
      amount_paid: Number(amountpaid),
      total_amount: Number(totalamount),
      supplieraddress,
      suppliercontact,
      supplieremail,
      suppliername,
      dateofpurchase,
      quantity_supplied,
      item_unit_of_measurement,
    };

    setIsLoading(true);

    try {
      const res = await myAPIClient.post(
        "/creditors/addnewcreditor",
        creditor,
        {
          headers: {
            token: `token ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success(`Success! item has been added!`, {
        autoClose: false,
      });

      setItemName("");
      setAmountPaid("");
      setTotalAmount("");
      setSupplierContact("");
      setDateofPurchase("");
      setSupplierEmail("");
      setSupplierAddress("");
      setSupplierName("");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsLoading(false);
      toast.error("Error processing your request, try again!");
    }
  };

  const creditorobject = {
    itemname,
    amountpaid,
    totalamount,
    supplieraddress,
    suppliercontact,
    supplieremail,
    suppliername,
    dateofpurchase,
    setAmountPaid,
    setDateofPurchase,
    setIsLoading,
    setSupplierAddress,
    setSupplierEmail,
    setSupplierContact,
    setSupplierName,
    setTotalAmount,
    setItemName,
    isLoading,
    addCreditor,
    item_unit_of_measurement,
    setUnit,
    quantity_supplied,
    setQuantity,
  };

  return (
    <Flex w="100%" gap={2} flexDir={{ base: "column", md: "row" }}>
      <Box boxShadow="md" flex={1}>
        <ReusableAddItem creditorobject={creditorobject} itemname="Purchases" />
      </Box>
      <Box flex={1} boxShadow="md">
        <Box boxShadow="md" flex={1}>
          <ReusableAddSupplierDetails
            creditorobject={creditorobject}
            itemname="Purchases"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Purchases;
