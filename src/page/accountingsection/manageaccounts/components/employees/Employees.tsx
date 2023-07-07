import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../auth/axiosInstance";
import DataTable from "../reusable/DataTable";
import SearchSection from "../reusable/SearchSection";

const Employees = () => {
  const [query, setQuery] = useState("");

  // HEADINGS

  const headerData = [
    "Username",
    "Photo",
    "Name",
    "Designation",
    "Base Salary",
    "Salary Balance",
    "NSSF",
    "Advance1",
    "Advance2",
    "Deductions",
    "Net Salary",
    "Allowances",
    "Action",
  ];

  const [classnumeral, setClassNumeral] = useState("");

  // TOKEN FROM LOCAL STORAGE
  const token = localStorage.getItem("token");

  const [refetch, setRefetch] = useState(false);

  // GET TEACHERS' PAYMENTS
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await myAPIClient.get("/users/teachers/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setTeachers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, [refetch]);

  // GET MEMBERS' PAYMENTS
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await myAPIClient.get("/users/members/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, [refetch]);

  const employees = [...teachers, ...members];

  // Filter employees with search
  const keys = [
    "firstname",
    "lastname",
    "role",
    "membercontact",
    "teachercontact",
  ];

  // FILTER EMPLOYEES
  const filterEmployees = (employees: any) => {
    return employees?.filter((employee: any) => {
      return keys?.some(
        (key: any) =>
          typeof employee[key] === "string" &&
          employee[key].toLowerCase().includes(query)
      );
    });
  };

  return (
    <Box w="100%">
      <Box px={2}>
        <SearchSection
          classnumeral={classnumeral}
          setClassNumeral={setClassNumeral}
          headingText="All Employees"
          query={query}
          renderSelectClass={false}
          setQuery={setQuery}
          isEmployee={false}
          setRefetch={setRefetch}
          refetch={refetch}
        />
      </Box>
      <DataTable
        captionText={"Employees' Table"}
        headerData={headerData}
        employees={query ? filterEmployees(employees) : employees}
      />
    </Box>
  );
};

export default Employees;
