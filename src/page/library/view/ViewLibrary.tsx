import { Spinner, Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { myAPIClient } from "../../auth/axiosInstance";
import DataTable from "./DataTable";
import ViewLib from "./ViewLib";
import "react-toastify/dist/ReactToastify.css";
export const ViewLibrary = () => {
  const token = localStorage.getItem("token");
  // GET ALL LIB BOOKS **************************************************************************

  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsFetching(true);
        const res = await myAPIClient.get("/library/findall", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setBooks(res.data);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        console.log(err);
      }
    };
    getBooks();
  }, [isDeleting]);

  const headerData = [
    "Book Number",
    "Title",
    "Author",
    "Class Name",
    "Subject Name",
    "Total Books",
    "Available Books",
    "Lent Books",
    "Action",
  ];

  const deleteBook = async (id: any) => {
    try {
      const res = await myAPIClient.delete(`/library/remove/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      toast.success("Success, book has been deleted!");
      setIsDeleting(true);
    } catch (err) {
      console.log(err);
      toast.error("Error occured processing your request!");
    }
  };

  // SEARCH LIBRARY
  const [query, setQuery] = useState("");

  // Filter students with search
  const keys = ["bookTitle", "bookAuthor", "className", "subjectName"];

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
          captionText="Library Books"
          headerData={headerData}
          books={query ? filterLib(books) : books}
          deleteBook={deleteBook}
        />
      )}
    </Box>
  );
};
