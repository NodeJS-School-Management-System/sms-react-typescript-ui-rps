import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import { DataTable } from "./DataTable";
import { useState, useEffect } from "react";

// type TableDataProps = {
//   classNumeral: string;
//   className: string;
//   classTeacher?: string;
//   action?: Element;
// };

const columnHelper = createColumnHelper<any>();

export const MarksList = ({ list, exam, clas, subject }: any) => {
  const token = localStorage.getItem("token");

  const [clickedId, setClickedId] = useState("");
  const [mark, setMark] = useState<any>(null);

  const [student, setStudent] = useState<any>({});
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await myAPIClient.get(`/students/${clickedId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    clickedId && getStudent();
  }, [clickedId]);

  const addMarks = async (info: any) => {
    console.log(list);
    const newMark = {
      exam,
      marks: info,
      firstname: student?.firstname,
      lastname: student?.lastname,
      attendence: "sample",
      class: student.class,
      subject: "sample",
    };
    try {
      const res = await myAPIClient.post("/results", newMark, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    columnHelper.accessor(`firstname`, {
      cell: (info) => info.getValue(),
      header: "First Name",
    }),
    columnHelper.accessor(`lastname`, {
      cell: (info) => info.getValue(),
      header: "Last Name",
    }),
    columnHelper.accessor("className", {
      cell: (info) => (
        <Flex gap={2}>
          <Input type="checkbox" w={10} />
        </Flex>
      ),
      header: "Attendence",
    }),
    columnHelper.accessor("classTeacher", {
      cell: (info) => (
        <Flex gap={2}>
          <Input
            type={"text"}
            placeholder="Enter Mark"
            value={mark}
            onChange={(e: any) => {
              setMark(e.target.value);
            }}
          />
        </Flex>
      ),
      header: "Marks",
    }),
    columnHelper.accessor("studentId", {
      cell: (info: any) => (
        <Flex gap={2}>
          <IconButton
            colorScheme="green"
            aria-label="Add to database"
            onClick={() => {
              setClickedId(info.getValue());
              addMarks(info.getValue());
            }}
            icon={<Add />}
          />
        </Flex>
      ),
      header: "Action",
    }),
  ];
  return (
    <Box overflowX={{ base: "auto", md: "auto", lg: "hidden" }}>
      <DataTable columns={columns} data={list} />
    </Box>
  );
};
