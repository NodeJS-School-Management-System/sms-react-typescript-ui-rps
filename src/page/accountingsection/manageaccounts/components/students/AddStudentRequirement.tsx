import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Input,
  Select,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";

const AddStudentRequirement = () => {
  const token = localStorage.getItem("token");

  const [termname, setTermname] = useState("");
  const [amount, setAmount] = useState("");
  const [itemname, setItemname] = useState("");
  const [itemquantity, setItemquantity] = useState("");

  // *********************************************************************************************************

  // IFRAME OPENING
  const [iframeUrl, setIframeUrl] = useState<any>("");
  const iframeRef: any = useRef<any>();

  useEffect(() => {
    if (iframeUrl != "") {
      iframeRef.current.src = iframeUrl;
      setIframeUrl("sample");
    }
  }, [iframeUrl]);
  // INITIATE PAYMENT **********************************************************************************
  const [isLoading, setIsLoading] = useState(false);

  const [passcode, setPasscode] = useState("");
  const [detailsRevealed, setDetailsRevealed] = useState(false);

  // ****************************************************************************************************
  // GET STUDENT DETAILS BY PASSCODE
  const [student, setStudent] = useState<any>({});
  const [isgettingStudent, setIsGettingStudent] = useState(false);
  const getStudentByPasscode = async () => {
    setIsGettingStudent(true);
    try {
      const res = await myAPIClient.get(
        `/users/students/getbypasscode/${passcode}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      console.log(student);
      setStudent(res.data);
      setIsGettingStudent(false);

      // GET FEES OF STUDENT"S CLASS******************
      //  ***WILL BE HERE *****

      // ******************
      setDetailsRevealed(true);
    } catch (err) {
      toast.error(
        "Sorry something went wrong getting students details, check your passcode and try again!"
      );
      setDetailsRevealed(false);
      setIsGettingStudent(false);
      console.log(err);
    }
  };

  // ****************************************************************************************************

  // GET TODAYS DATE

  const today = new Date();

  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  // Format the date
  const formattedDate = `${month}/${day}/${year}`;

  console.log(formattedDate);

  // ****************************************************************************************************

  // UPDATE STUDENT WITH PAYMENT INFO FROM RECEIPT
  const updateStudentRequirements = async () => {
    setIsLoading(true);
    try {
      const res = await myAPIClient.put(
        `/studentrequirements/updaterequirement/${passcode}`,
        {
          amount: Number(amount),
          itemname,
          itemquantity,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsLoading(false);
      setItemname("");
      setAmount("");
      setItemquantity("");
      toast.success("Success, student requirements have been updated!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(
        "Sorry, something went wrong updating student's requirements!"
      );
    }
  };

  // ****************************************************************************************************

  //   GET STUDENT REQUIREMENTS
  const [requirements, setRequirement] = useState([]);
  useEffect(() => {
    const getRequirements = async () => {
      try {
        const res = await myAPIClient.get("/studentrequirements/findall", {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setRequirement(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRequirements();
  }, []);

  // ****************************************************************************************************

  // GET THEME WITH PRIMARY COLOR ****************************************************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <WrapItem
        flex={1}
        gap={6}
        flexDirection={"column"}
        h={"max-content"}
        w="100%"
        // w={{ base: "100%", md: "50%", lg: "50%" }}
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
                Add Student Requirement
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
                placeholder="Enter student passcode"
                value={passcode}
                w={{ base: "100%", md: "50%" }}
                type={"number"}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <Button
                bg={primaryColor.color}
                color="white"
                mx={3}
                onClick={getStudentByPasscode}
                disabled={!passcode || passcode.length < 4}
              >
                {isgettingStudent ? (
                  <CircularProgress size="24px" />
                ) : (
                  "Get Student Details"
                )}
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
                    Student Name
                  </Text>

                  <Input
                    placeholder="Student passcode"
                    value={
                      student.firstname
                        ? `${student.firstname} ${student.lastname}`
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
                    Class
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.studentclass}
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
                    Address
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.address}
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
                    Parent Contact
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentcontact}
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
                    Parent Name
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentname}
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
                    Parent Email
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentemail}
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
                    Parent NIN
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.parentnin}
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
                    Status
                  </Text>

                  <Input
                    placeholder="Enter student passcode"
                    value={student?.status_and_payment_info?.day_or_border}
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
                    Select Term <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    placeholder="Select Term"
                    value={termname}
                    onChange={(e) => setTermname(e.target.value)}
                    w={"100%"}
                  >
                    <option value={"Term One"}>Term One</option>
                    <option value={"Term Two"}>Term Two</option>
                    <option value={"Term Three"}>Term Three</option>
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
                    Item Name <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    placeholder="Select Item Name"
                    value={itemname}
                    onChange={(e) => setItemname(e.target.value)}
                    w={"100%"}
                  >
                    {requirements.map((r: any) => (
                      <option key={r._id} value={r.itemname}>
                        {r.itemname}
                      </option>
                    ))}
                  </Select>
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
                    Item Quantity <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    placeholder="Item Quantity"
                    value={itemquantity}
                    onChange={(e) => setItemquantity(e.target.value)}
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
                    Amount <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
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
                isDisabled={!amount || !itemquantity || !termname || !itemname}
                onClick={updateStudentRequirements}
              >
                {isLoading ? "Updating.." : "Update Details"}
              </Button>
            )}
          </Box>
        </Center>
      </WrapItem>
    </Box>
  );
};

export default AddStudentRequirement;
