import { Spinner, Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { myAPIClient } from "../../auth/axiosInstance";
import DataTable from "./DataTable";
import ViewLib from "./ViewLib";
import "react-toastify/dist/ReactToastify.css";
export const ViewStore = () => {
  const token = localStorage.getItem("token");
  // GET ALL LIB BOOKS **************************************************************************

  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsFetching(true);
        const res = await myAPIClient.get("/storemanager/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setItems(res.data);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        console.log(err);
      }
    };
    getBooks();
  }, [isDeleting]);

  const headerData = [
    "Item Name",
    "Item Category",
    "Item quantity",
    "Item Cost Price",
    "Date Added",
    "Remaining Items",
    "Items Released",
    "Action",
  ];

  const deleteItem = async (id: any) => {
    try {
      const res = await myAPIClient.delete(`/storemanager/remove/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      toast.success("Success, item has been deleted!");
      setIsDeleting(true);
    } catch (err) {
      console.log(err);
      toast.error("Error occured processing your request!");
    }
  };

  // SEARCH LIBRARY
  const [query, setQuery] = useState("");

  // Filter students with search
  const keys = ["itemName", "itemCategory", "itemQuantity", "itemCostPrice"];

  // FILTER STUDENTS
  const filterLib = (libs: any) => {
    return libs?.filter((lib: any) => {
      return keys?.some(
        (key: any) =>
          typeof lib[key] === "string" && lib[key].toLowerCase().includes(query)
      );
    });
  };

  return (
    <Box>
      <ViewLib query={query} setQuery={setQuery} />
      {isFetching ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <DataTable
          captionText="Store Items"
          headerData={headerData}
          items={query ? filterLib(items) : items}
          deleteItem={deleteItem}
        />
      )}
    </Box>
  );
};
