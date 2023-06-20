import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../auth/axiosInstance";
import ReusableAnalytics from "../reusable/ReusableAnalytics";
import AddAsset from "./AddAsset";

const FixedAssets = () => {
  const tableHeaders = ["Item Name", "Item Category", "Networth", "Action"];
  const token = localStorage.getItem("token");
  const [assets, setAssets] = useState([]);
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
  }, []);

  return (
    <Flex w="100%" gap={2}>
      <Box boxShadow="md" flex={1}>
        <AddAsset />
      </Box>
      <Box flex={1} boxShadow="md">
        <ReusableAnalytics
          tableHeaders={tableHeaders}
          captionText="List of Assets"
          data={assets}
        />
      </Box>
    </Flex>
  );
};

export default FixedAssets;
