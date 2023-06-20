import {
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { myAPIClient } from "../../../../auth/axiosInstance";
import { SearchProps } from "./types/Reusable.type";

const SearchSection = ({
  classnumeral,
  query,
  setQuery,
  renderSelectClass,
  headingText,
  setClassNumeral,
  isEmployee,
}: SearchProps) => {
  //   SEARCH BY QUERY

  // GET ALL CLASSES
  const [classlist, setClasslist] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClasslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // LIST OF MONTHS
  const months: object[] = [
    {
      id: 1,
      month: "January",
    },
    {
      id: 2,
      month: "February",
    },
    {
      id: 3,
      month: "March",
    },
    {
      id: 4,
      month: "April",
    },
    {
      id: 5,
      month: "May",
    },
    {
      id: 6,
      month: "June",
    },
    {
      id: 7,
      month: "July",
    },
    {
      id: 8,
      month: "August",
    },
    {
      id: 9,
      month: "September",
    },
    {
      id: 10,
      month: "October",
    },
    {
      id: 11,
      month: "November",
    },
    {
      id: 12,
      month: "December",
    },
  ];

  // GET CURRENT MONTH
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  console.log(currentMonth.toString());

  const [monthname, setMonthname] = useState(currentMonth.toString());

  return (
    <Flex
      align={"center"}
      flexDirection={{ base: "column", lg: "row" }}
      justify="center"
    >
      <Box flex={1}>
        <Box fontWeight={"bold"} fontSize={13}>
          {headingText}
        </Box>
      </Box>

      <Box
        flex={1}
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="flex-end"
        h={70}
        p={5}
        pl={0}
        my={3}
        gap={2}
      >
        {renderSelectClass && (
          <Center
            flexDirection={"column"}
            w={{ base: "100%", md: "40%" }}
            h="100%"
          >
            <InputGroup>
              <Select
                fontSize={13}
                placeholder="Select Class"
                value={classnumeral}
                onChange={(e) => setClassNumeral(e.target.value)}
                w={"100%"}
              >
                {classlist?.map((c: any) => (
                  <option key={c.classnumeral} value={c.classnumeral}>
                    {c.classnumeral}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </Center>
        )}

        {isEmployee && (
          <Center
            flexDirection={"column"}
            w={{ base: "100%", md: "40%" }}
            h="100%"
          >
            <InputGroup>
              <Select
                fontSize={13}
                placeholder="Select Month"
                value={monthname}
                onChange={(e) => setMonthname(e.target.value)}
                w={"100%"}
              >
                {months?.map((c: any) => (
                  <option key={c.id} value={c.month}>
                    {c.month}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </Center>
        )}

        <Box
          display="flex"
          alignItems={"center"}
          gap={2}
          justifyContent={"flex-end"}
          w={{ base: "100%", md: "50%" }}
        >
          <Text fontSize={13} display={{ base: "none", md: "block" }}>
            Search:
          </Text>
          <Input
            fontSize={13}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            placeholder="Search here.."
            w={{ base: "100%" }}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default SearchSection;
