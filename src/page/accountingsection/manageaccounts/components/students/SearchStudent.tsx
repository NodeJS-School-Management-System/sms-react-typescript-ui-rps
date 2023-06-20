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

const SearchStudent = () => {
  // SEARCH BY CLASSNAME
  const [clas, setClass] = useState("");

  //   SEARCH BY QUERY
  const [query, setQuery] = useState("");

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
  return (
    <Flex
      align={"center"}
      flexDirection={{ base: "column", lg: "row" }}
      justify="center"
    >
      <Box flex={1}>
        <Box fontWeight={"bold"} fontSize={13}>
          Students' Fees Collection Table
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
        <Center
          flexDirection={"column"}
          w={{ base: "100%", md: "40%" }}
          h="100%"
        >
          <InputGroup>
            <Select
              fontSize={13}
              placeholder="Select Class"
              value={clas}
              onChange={(e) => setClass(e.target.value)}
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

export default SearchStudent;
