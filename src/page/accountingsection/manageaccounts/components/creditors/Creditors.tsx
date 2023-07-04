import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { myAPIClient } from "../../../../auth/axiosInstance";
import DataTable from "../reusable/DataTable";
import SearchSection from "../reusable/SearchSection";

const Creditors = () => {
  const [query, setQuery] = useState("");

  // HEADINGS
  const headerData = [
    "Inoive No.",
    "Itemname",
    "Amount Paid",
    "Total Amount",
    "Balance",
    "Supplier Name",
    "Supplier Address",
    "Supplier Email",
    "Supplier Contact",
    "Date of Purchase",
    "Action",
  ];

  const [deleting, setDeleting] = useState(false);
  const deleteCreditor = async (id: any) => {
    try {
      await myAPIClient.delete(`/creditors/remove/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDeleting(!deleting);
      toast.success("Success, supplier has been deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  // GET CREDITORS
  const [creditors, setCreditors] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const getCreditors = async () => {
      try {
        const res = await myAPIClient.get("/creditors/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCreditors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCreditors();
  }, [deleting, refetch]);

  // Filter students with search
  const keys = [
    "suppliername",
    "invoicenumber",
    "suppliercontact",
    "supplieremail",
    "dateofpurchase",
    "itemname",
  ];

  // FILTER STUDENTS
  const filterCreditors = (creditors: any) => {
    return creditors?.filter((creditor: any) => {
      return keys?.some(
        (key: any) =>
          typeof creditor[key] === "string" &&
          creditor[key].toLowerCase().includes(query)
      );
    });
  };

  return (
    <Box w="100%">
      <Box px={2}>
        <SearchSection
          refetch={refetch}
          setRefetch={setRefetch}
          headingText="All Creditors"
          query={query}
          renderSelectClass={false}
          setQuery={setQuery}
        />
      </Box>
      <DataTable
        captionText={"Creditors' Table"}
        creditors={query ? filterCreditors(creditors) : creditors}
        emailAvailable={false}
        headerData={headerData}
        deleteCreditor={deleteCreditor}
      />
    </Box>
  );
};

export default Creditors;
