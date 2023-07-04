import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../auth/axiosInstance";
import DataTable from "../reusable/DataTable";

import SearchSection from "../reusable/SearchSection";

const Students = () => {
  // TOKEN FROM LOCAL STORAGE
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState("");

  // HEADINGS
  const headerData = [
    "Code",
    "Photo",
    "Name",
    "Gender",
    "Class",
    "DOB",
    "Fees",
    "Balance",
    "Parent Name",
    "Phone",
    "Action",
  ];

  // GET STUDENTS WITH FEES DETAILS
  const [students, setStudents] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/feesmanager/students", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, [refetch]);

  // Filter students with search
  const keys = [
    "firstname",
    "lastname",
    "studentclass",
    "gender",
    "dateofbirth",
    "contact",
    "address",
    "parentname",
    "parentcontact",
  ];

  // FILTER STUDENTS
  const filterStudents = (students: any) => {
    return students?.filter((student: any) => {
      return keys?.some(
        (key: any) =>
          typeof student[key] === "string" &&
          student[key].toLowerCase().includes(query)
      );
    });
  };

  // /FIND STUDENTS BY CLASS NUMERAL e.g P4
  const [classnumeral, setClassNumeral] = useState("");
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get(
          `/users/students/find/${classnumeral}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        classnumeral && setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    classnumeral && getStudents();
  }, [classnumeral]);

  return (
    <Box w="100%">
      <Box px={2}>
        <SearchSection
          refetch={refetch}
          setRefetch={setRefetch}
          headingText="Students' Fees Collection Table"
          query={query}
          renderSelectClass={true}
          setQuery={setQuery}
          classnumeral={classnumeral}
          setClassNumeral={setClassNumeral}
        />
      </Box>
      <DataTable
        captionText="Student's Collection Fees"
        headerData={headerData}
        students={query ? filterStudents(students) : students}
      />
    </Box>
  );
};

export default Students;
