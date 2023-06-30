import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../auth/axiosInstance";
import ReusableAnalytics from "../reusable/ReusableAnalytics";
import AddAsset from "./AddAsset";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FixedAssets = () => {
  const tableHeaders = ["Item Name", "Item Category", "Networth", "Action"];
  const token = localStorage.getItem("token");
  const [assets, setAssets] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getData = async () => {
    try {
      const res = await myAPIClient.get("/fixedasset/findall", {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setAssets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [refetch]);

  // DELETE ASSET
  const deleteAsset = async (id: any) => {
    try {
      await myAPIClient.delete(`/fixedasset/remove/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setRefetch(!refetch);
      console.log("Success");
      toast.success("Asset has been deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Error processing your request!");
    }
  };

  return (
    <Flex w="100%" gap={2} flexDir={{ base: "column", md: "row" }}>
      <Box boxShadow="md" flex={1}>
        <AddAsset setRefetch={setRefetch} refetch={refetch} />
      </Box>
      <Box flex={1} boxShadow="md">
        <ReusableAnalytics
          tableHeaders={tableHeaders}
          captionText="List of Assets"
          data={assets}
          deleteAsset={deleteAsset}
        />
      </Box>
    </Flex>
  );
};

export default FixedAssets;
