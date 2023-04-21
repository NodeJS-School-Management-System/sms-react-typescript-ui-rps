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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import app from "../../../firebase/firebase";
import useTheme from "../../../theme/useTheme";

export const ManageLibrary = () => {
  const token = localStorage.getItem("token");

  const [clas, setClas] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [file, setFile] = useState('')

  // Get all classes
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

  // Get all subjects
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

  // ADD NEW LIB BOOK *****************************************************************************

  const [className, setClassName] = useState("");
  const [status, setStatus] = useState("");
  const [subjectName, setSubjectName] = useState("");
  // const [releasedAgainst, setReleasedAgainst] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [publication, setPublication] = useState<any>(undefined);
  const [bookTitle, setBookTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // upload image
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPublication(e.target.files[0]);

      console.log(publication);
    }
  };

  const addBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newBook = {
      className,
      subjectName,
      bookAuthor,
      bookTitle,
      publication,
    };

    // setIsLoading(true);
    if (publication !== null) {
      const datai = new FormData();
      const fileName = Date.now() + publication?.name;
      datai.append("name", fileName);
      datai.append("file", publication);
      // student.profileimage = fileName;

      // Upload image to firebase storage ******************************************************************
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, publication);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: any) => {
              console.log(downloadURL);
              newBook.publication = downloadURL;
            }
          );
          try {
            const res = await myAPIClient.post("/library", newBook, {
              headers: {
                token: `Bearer ${token}`,
              },
            });
            console.log(res.data);
            setIsLoading(false);
            setBookAuthor("");
            setPublication("");
            setBookTitle("");
            setClassName("");
          } catch (err) {
            console.log(err);
            setIsLoading(false);
          }
        }
      );
    }
  };

  // ****************************************************************************************************
  // UPDATE LIB BOOK *****************************************************************************

  const [classNameUpdate, setClassNameUpdate] = useState("");
  // const [statusUpdate, setStatusUpdate] = useState("");
  // const [subjectNameUpdate, setSubjectNameUpdate] = useState("");
  // const [releasedAgainstUpdate, setReleasedAgainstUpdate] = useState("");
  const [bookAuthorUpdate, setBookAuthorUpdate] = useState("");
  const [bookTitleUpdate, setBookTitleUpdate] = useState("");
  // const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const updateBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setIsLoadingUpdate(true);
    const updatedBook = {
      className: classNameUpdate,
      // subjectName: subjectNameUpdate,
      bookAuthor: bookAuthorUpdate,
      bookTitle: bookTitleUpdate,
      // releasedAgainst,
      status,
    };

    // setIsLoadingUpdate(true);

    try {
      const res = await myAPIClient.put("/library", updatedBook, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      // setIsLoadingUpdate(false);
      setBookAuthorUpdate("");
      setBookTitleUpdate("");
      setClassNameUpdate("");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStatus("availabe");
  }, []);

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
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
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
                    value={subjectName}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSubjectName(e.target.value);
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
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
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
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
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
                  <Input type="file" onChange={onUploadImage} />
                </Flex>

                <Button
                  onClick={addBook}
                  isDisabled={
                    !bookTitle || !bookAuthor || !className || !subjectName
                  }
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  color="white"
                  backgroundColor={primaryColor.color}
                >
                  {isLoading ? "Adding.." : "Add Book"}
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
                  // onClick={addBook}
                  disabled={!title || !author || !clas || !subject}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  color="white"
                  onClick={updateBook}
                  backgroundColor={primaryColor.color}
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
