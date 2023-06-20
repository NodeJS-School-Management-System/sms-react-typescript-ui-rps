import { Box } from "@chakra-ui/react";
import { useState } from "react";
import DataTable from "../reusable/DataTable";
import SearchSection from "../reusable/SearchSection";

const Creditors = () => {
  const [query, setQuery] = useState("");

  // HEADINGS
  const data = [
    {
      id: 1,
      header: "Username",
      row: "abeine",
    },
    {
      id: 2,
      header: "Photo",
      row: "",
    },
    {
      id: 3,
      header: "Name",
      row: "Abeinemukama Vicent",
    },
    {
      id: 4,
      header: "DOB",
      row: "12/2/2000",
    },
    {
      id: 5,
      header: "Gender",
      row: "Female",
    },
    {
      id: 6,
      header: "Address",
      row: "Mbarara",
    },
  ];

  const headerData = [
    "Fullname",
    "Invoice No.",
    "Items",
    "Amount",
    "Balance",
    "Address",
    "Phone",
    "Date",
    "Action",
  ];

  return (
    <Box w="100%">
      <Box px={2}>
        <SearchSection
          headingText="All Creditors"
          query={query}
          renderSelectClass={false}
          setQuery={setQuery}
        />
      </Box>
      <DataTable
        captionText={"Creditors' Table"}
        data={data}
        emailAvailable={false}
        headerData={headerData}
      />
    </Box>
  );
};

export default Creditors;
