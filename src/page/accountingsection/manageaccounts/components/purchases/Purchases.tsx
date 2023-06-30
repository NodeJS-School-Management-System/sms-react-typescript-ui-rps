import { Box, Flex } from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../../../../../firebase/firebase";
import { myAPIClient } from "../../../../auth/axiosInstance";
import ReusableAddItem from "../reusable/ReusableAddItem";
import ReusableAddSupplierDetails from "../reusable/ReusableAddSupplierDetails";

const Purchases = () => {
  // ADD SUPPLIER AND ITEM DETAILS
  const [itemname, setItemName] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [itemimage, setItemImage] = useState<any>(undefined);
  const [amountpaid, setAmountPaid] = useState("");
  const [totalamount, setTotalAmount] = useState("");
  const [suppliername, setSupplierName] = useState("");
  const [supplieraddress, setSupplierAddress] = useState("");
  const [suppliercontact, setSupplierContact] = useState("");
  const [supplieremail, setSupplierEmail] = useState("");
  const [dateofpurchase, setDateofPurchase] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  // IMAGE UPLOAD

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItemImage(e.target.files[0]);
      console.log(e.target.files);
    }
  };

  // ADD CREDITOR
  const addCreditor = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const creditor: any = {
      itemname,
      invoicenumber,
      amountpaid: Number(amountpaid),
      totalamount: Number(totalamount),
      supplieraddress,
      suppliercontact,
      supplieremail,
      suppliername,
      dateofpurchase,
    };

    setIsLoading(true);
    if (itemimage !== null) {
      const datai = new FormData();
      const fileName = Date.now() + itemimage.name;
      datai.append("name", fileName);
      datai.append("file", itemimage);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, itemimage);

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
            (downloadURL: string) => {
              console.log(downloadURL);
              creditor.itemimage = downloadURL;
            }
          );
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

            setItemImage("");
            setItemName("");
            setAmountPaid("");
            setInvoiceNumber("");
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
        }
      );
    }
  };

  const creditorobject = {
    itemname,
    invoicenumber,
    amountpaid,
    totalamount,
    supplieraddress,
    suppliercontact,
    supplieremail,
    suppliername,
    dateofpurchase,
    itemimage,
    setAmountPaid,
    setDateofPurchase,
    setInvoiceNumber,
    setIsLoading,
    setSupplierAddress,
    setSupplierEmail,
    setSupplierContact,
    setSupplierName,
    setTotalAmount,
    setItemImage,
    setItemName,
    isLoading,
    addCreditor,
    onUploadImage,
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
