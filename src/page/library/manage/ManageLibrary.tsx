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
  CircularProgress,
} from "@chakra-ui/react";
import { Home, LibraryAdd } from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import app from "../../../firebase/firebase";
import useTheme from "../../../theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ManageLibrary = () => {
  const token = localStorage.getItem("token");

  // Get all classes
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await myAPIClient.get("/classrooms/findall", {
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
        const res = await myAPIClient.get("/subjects/findall", {
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
  const [subjectName, setSubjectName] = useState("");
  // const [releasedAgainst, setReleasedAgainst] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [publication, setPublication] = useState<any>(undefined);
  const [bookTitle, setBookTitle] = useState("");
  const [quantityinstock, setQuantityinstock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // upload image
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPublication(e.target.files[0]);

      console.log(publication);
    }
  };

  // BOOK NUMBER GENERATOR
  const generateOTP = () => {
    let otp = "";
    const possible = "0123456789";
    for (let i = 0; i < 4; i++) {
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return otp;
  };

  const addBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newBook = {
      className,
      subjectName,
      bookAuthor,
      bookTitle,
      bookNumber: generateOTP(),
      quantity_remaining_instock: Number(quantityinstock),
      publication,
      quantityinstock: Number(quantityinstock),
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
            const res = await myAPIClient.post("/library/addbook", newBook, {
              headers: {
                token: `Bearer ${token}`,
              },
            });
            console.log(res.data);
            setIsLoading(false);
            setBookAuthor("");
            setPublication("");
            setBookTitle("");
            setSubjectName("");
            setClassName("");
            setQuantityinstock("");
            toast.success("Book uploaded successfully!");
          } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast.error("Something went wrong uploading the book, Try again!");
          }
        }
      );
    }
  };

  // *********************************************************************************************
  // UPDATE LIB BOOK *****************************************************************************

  const [book_title_finder, setBookTitleFinder] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [datereleased, setDateReleased] = useState("");
  const [termname, setTermname] = useState("");
  const [availableBook, setAvailableBook] = useState<any>({});

  // GET BOOK BY TITLE
  const getBookByTitle = async () => {
    setIsRevealing(true);
    try {
      const res = await myAPIClient.get(
        `/library/getbytitle/${book_title_finder}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setAvailableBook(res.data);
      setDetailsRevealed(true);
      setIsRevealing(false);
    } catch (err) {
      console.log(err);
      setIsRevealing(false);
      setDetailsRevealed(false);

      toast.error("Error fetching book details!");
    }
  };

  // UPDATE LENT BOOK
  const [isLending, setIsLending] = useState(false);
  const lendBook = async () => {
    setIsLending(true);
    try {
      const res = await myAPIClient.put(
        `/library/lendbook/${book_title_finder}`,
        {
          released_against: user,
          date_released: datereleased,
          runningterm: termname,
          quantitylent: Number(amount),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setAmount("");
      setTermname("");
      setDateReleased("");
      setUser("");
      setIsLending(false);
      toast.success("Success, book has been lent!");
    } catch (err) {
      setIsLending(false);
      toast.error("Error processing your request!");
    }
  };

  // USERS *************************************************************************************
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
  }, []);

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
  }, []);

  // GET STUDENTS
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await myAPIClient.get("/users/students/all", {
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
  }, []);

  const users = [...teachers, ...members, ...students];

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        h={70}
        p={5}
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 30, lg: 35 }}
            color={primaryColor.color}
          >
            Manage Library
          </Heading>
          <Text fontSize={{ base: 12, lg: 16 }}>SMS</Text>
        </Box>
        <Box display={"flex"} alignItems="center" gap={2}>
          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            gap={3}
          >
            <Home style={{ fontSize: 16 }} />
            <Link to="/">
              <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
                Home
              </Text>
            </Link>
            <FaAngleRight />
          </Box>
          <LibraryAdd style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Manage Library
          </Text>
        </Box>
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
              height="auto"
              w="100%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    Add Library Book
                  </Text>
                </Box>
              </Flex>
              <Box w={"100%"}>
                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                    fontSize={16}
                    onChange={(e) => {
                      setClassName(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classes.map((c: any) => (
                      <option style={{ fontSize: 16 }} value={c.classname}>
                        {c.classname}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
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
                    fontSize={16}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSubjectName(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {subjects.map((s: any) => (
                      <option value={s.subjectname}>{s.subjectname}</option>
                    ))}
                  </Select>
                </Flex>

                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                    fontSize={16}
                  >
                    Book Title
                  </Text>
                  <Input
                    value={bookTitle}
                    fontSize={16}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Book title"
                  />
                </Flex>

                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                    fontSize={16}
                  >
                    Quantity in Stock
                  </Text>
                  <Input
                    fontSize={16}
                    type={"number"}
                    value={quantityinstock}
                    onChange={(e) => setQuantityinstock(e.target.value)}
                    placeholder="Quantity in Stock"
                  />
                </Flex>

                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Author
                  </Text>
                  <Input
                    value={bookAuthor}
                    fontSize={16}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="Book Author"
                  />
                </Flex>

                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Book Publication
                  </Text>
                  <Input fontSize={16} type="file" onChange={onUploadImage} />
                </Flex>

                <Button
                  onClick={addBook}
                  fontSize={16}
                  isDisabled={
                    !bookTitle ||
                    !bookAuthor ||
                    !className ||
                    !subjectName ||
                    !publication
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
            height={"max-content"}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              height="auto"
              w="100%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                w="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <Text
                    p={2}
                    color="white"
                    textAlign="center"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    Lend Library Book
                  </Text>
                </Box>
              </Flex>
              <Box px={2} w={"100%"}>
                <Flex
                  p={3}
                  w={"100%"}
                  h={"100%"}
                  flexDirection={{ base: "column", md: "row" }}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Input
                    placeholder="Enter book title"
                    value={book_title_finder}
                    type="text"
                    w={{ base: "100%", md: "50%" }}
                    onChange={(e) => setBookTitleFinder(e.target.value)}
                  />
                  <Button
                    bg={primaryColor.color}
                    color="white"
                    mx={3}
                    disabled={!book_title_finder}
                    onClick={getBookByTitle}
                  >
                    {isRevealing ? "Fetching.." : "Get Book Details"}
                  </Button>
                </Flex>

                {detailsRevealed && (
                  <Flex
                    py={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Class Name
                      </Text>

                      <Input
                        placeholder="Enter student passcode"
                        value={
                          availableBook?.className
                            ? availableBook?.className
                            : "N/A"
                        }
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>

                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Subject Name
                      </Text>

                      <Input
                        placeholder="Enter student passcode"
                        value={availableBook?.subjectName}
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>
                  </Flex>
                )}

                {detailsRevealed && (
                  <Flex
                    py={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Book Author
                      </Text>

                      <Input
                        value={availableBook?.bookAuthor}
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Quantity in Stock
                      </Text>

                      <Input
                        placeholder="Enter student passcode"
                        value={availableBook?.quantityinstock}
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>
                  </Flex>
                )}

                {detailsRevealed && (
                  <Flex
                    py={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Quantity Lent Out
                      </Text>

                      <Input
                        value={availableBook?.quantitylent || "N/A"}
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>

                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Quantity in Stock
                      </Text>

                      <Input
                        placeholder="Enter student passcode"
                        value={availableBook?.quantityinstock}
                        fontWeight={"bold"}
                        disabled
                        style={{ cursor: "default" }}
                      />
                    </Flex>
                  </Flex>
                )}

                {detailsRevealed && (
                  <Flex
                    py={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Released Against <span style={{ color: "red" }}>*</span>
                      </Text>

                      <Select
                        placeholder="Select User"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        w={"100%"}
                      >
                        {users?.map((c: any) => (
                          <option key={c._id} value={c.username}>
                            {c.username}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Quantity Lent<span style={{ color: "red" }}>*</span>{" "}
                      </Text>
                      <Input
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                )}
                {detailsRevealed && (
                  <Flex
                    py={3}
                    w={"100%"}
                    h={"100%"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Date of Release <span style={{ color: "red" }}>*</span>
                      </Text>
                      <Input
                        placeholder="Date Released"
                        type="date"
                        value={datereleased}
                        onChange={(e) => setDateReleased(e.target.value)}
                      />
                    </Flex>
                    <Flex w={{ base: "100%", md: "50%" }} flexDir={"column"}>
                      <Text
                        fontSize={16}
                        fontWeight="bold"
                        alignSelf={"flex-start"}
                        color={"gray"}
                        mb={3}
                      >
                        Running Term <span style={{ color: "red" }}>*</span>{" "}
                      </Text>
                      <Select
                        placeholder="Select Term"
                        onChange={(e) => setTermname(e.target.value)}
                        value={termname}
                      >
                        <option value={"Term One"}>Term One</option>
                        <option value={"Term Two"}>Term Two</option>
                        <option value={"Term Three"}>Term Three</option>
                      </Select>
                    </Flex>
                  </Flex>
                )}

                {/* ***************************** */}

                {detailsRevealed && (
                  <Button
                    variant={"solid"}
                    w={{ base: "90%", md: "50%" }}
                    mx={3}
                    bgColor={primaryColor.color}
                    color="white"
                    isDisabled={!amount || !termname || !datereleased || !user}
                    onClick={lendBook}
                  >
                    {isLending ? (
                      <CircularProgress
                        isIndeterminate
                        color="white"
                        size={"24px"}
                      />
                    ) : (
                      "Lend Book"
                    )}
                  </Button>
                )}
              </Box>
            </Center>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
