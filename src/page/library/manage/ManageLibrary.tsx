import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Select,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";

export const ManageLibrary = () => {
  const token = localStorage.getItem("token");

  const [clas, setClas] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [file, setFile] = useState('')

  // Get al classes
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  // Get al classes
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await myAPIClient.get("/subject", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

  const addBook = async () => {
    const newBook = {
      bookName: title,
      bookAuthor: author,
      class: clas,
      subject,
    };
    try {
      const res = await myAPIClient.post("/library", newBook, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setTitle("");
      setAuthor("");
      setClas("");
      setSubject("");
    } catch (err) {
      console.log(err);
    }
  };

  // Get all library books
  // const [books, setBooks] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const res = await myAPIClient.get("/library", {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      // setBooks(res.data)
    };
    getBooks();
  }, []);

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex justifyContent={"space-between"} pr={10}>
        <Box display={"flex"}>
          <Heading ml={3} as={"h5"} color={primaryColor.color}>
            Manage Library
          </Heading>
          <Text>SMS</Text>
        </Box>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text fontSize={14}>Home</Text>
          <FaAngleRight />
          <Text fontSize={14}>Library</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex
          boxShadow="md"
          p={4}
          w="100%"
          h="100%"
          gap={2}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg="teal"
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={22}
                    fontWeight="bold"
                  >
                    Add Library Book
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Class Name
                  </Text>
                  <Select
                    placeholder="Select Class"
                    value={clas}
                    onChange={(e) => {
                      setClas(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classes.map((c: any) => (
                      <option value={c.className}>{c.className}</option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Subject Name
                  </Text>
                  <Select
                    placeholder="Select Class"
                    value={subject}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSubject(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {subjects.map((s: any) => (
                      <option value={s.subjectName}>{s.subjectName}</option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Title
                  </Text>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book title"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Author
                  </Text>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Book Author"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Publication
                  </Text>
                  <Input type="file" />
                </Flex>

                <Button
                  onClick={addBook}
                  disabled={!title || !author || !clas || !subject}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={"teal"}
                >
                  Add Book
                </Button>
              </Box>
            </Center>
          </WrapItem>
          <WrapItem
            flex={1}
            gap={6}
            flexDirection={"column"}
            h={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg="teal"
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={22}
                    fontWeight="bold"
                  >
                    Lend Library Book
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Lender's ClassName
                  </Text>
                  <Select
                    placeholder="Select Class"
                    value={clas}
                    onChange={(e) => {
                      setClas(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classes.map((c: any) => (
                      <option value={c.className}>{c.className}</option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Subject Name
                  </Text>
                  <Select
                    placeholder="Select Class"
                    value={subject}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSubject(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {subjects.map((s: any) => (
                      <option value={s.subjectName}>{s.subjectName}</option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Title
                  </Text>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book title"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Author
                  </Text>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Book Author"
                  />
                </Flex>
                <Flex
                  p={3}
                  bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Released Against
                  </Text>
                  <Input placeholder="Lender's name" />
                </Flex>

                <Button
                  onClick={addBook}
                  disabled={!title || !author || !clas || !subject}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  colorScheme={"teal"}
                >
                  Lend Book
                </Button>
              </Box>
            </Center>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
