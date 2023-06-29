import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "../../../../auth/axiosInstance";
import ReusableAddItem from "../reusable/ReusableAddItem";
import ReusableAnalytics from "../reusable/ReusableAnalytics";

const Grants = () => {
  const tableHeaders = ["Grant Provider", "Amount", "Date Received", "Action"];

  const [fundername, setFundername] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem("token");
  const deleteGrant = async (id: any) => {
    try {
      await myAPIClient.delete(`/grants/remove/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setDeleting(!deleting);
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  const [adding, setAdding] = useState(false);
  const addGrant = async () => {
    try {
      await myAPIClient.post(
        "/grants/newgrant",
        {
          fundername,
          date,
          amount,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setAmount("");
      setFundername("");
      setDate("");
      toast.success("Success, grant has been added!");
      setAdding(!adding);
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  const [grants, setGrants] = useState([]);
  const getGrants = async () => {
    try {
      const res = await myAPIClient.get(
        "/grants/findall",

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setGrants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGrants();
  }, [deleting, adding]);

  const grantObj = {
    fundername,
    setFundername,
    amount,
    setAmount,
    addGrant,
    loading,
    date,
    setDate,
    setLoading,
    deleteGrant,
  };

  return (
    <Flex w="100%" gap={2}>
      <Box boxShadow="md" flex={1}>
        <ReusableAddItem grantObj={grantObj} itemname="Grant" />
      </Box>
      <Box flex={1} boxShadow="md">
        <ReusableAnalytics
          data={grants}
          tableHeaders={tableHeaders}
          captionText="List of Grants"
        />
      </Box>
    </Flex>
  );
};

export default Grants;
