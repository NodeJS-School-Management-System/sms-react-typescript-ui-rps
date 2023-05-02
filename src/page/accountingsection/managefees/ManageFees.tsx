import {
  Box,
  Text,
  Center,
  Flex,
  WrapItem,
  Button,
  Input,
  Select,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import useTheme from "../../../theme/useTheme";
import { ClassFeesList } from "./ClassFeesList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrencyBitcoin, Home } from "@mui/icons-material";

export const ManageFees = () => {
  const token = localStorage.getItem("token");

  // IMPORT PRIMARY COLOR ***********************************************
  const {
    theme: { primaryColor },
  } = useTheme();

  // GET ALL CLASSES ****************************************************
  const [classUpdate, setClassUpdate] = useState("");
  const [fees, setFees] = useState("");
  const [classlist, setClasslist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // DELETE CLASS FEE ***********************************************************
  const [isDeleting, setIsdeleting] = useState(false);
  const deleteClassFee = async (id: any) => {
    setIsdeleting(true);
    try {
      const res = await myAPIClient.delete(`classfee/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setIsdeleting(false);
      toast.success("Success, class fee has been deleted!");
    } catch (err) {
      console.log(err);
      setIsdeleting(false);
      toast.error("Error, something went wrong, try again!");
    }
  };

  useEffect(() => {
    const getClasses = async () => {
      setIsLoading(true);
      try {
        const res = await myAPIClient.get("/classroom", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setClasslist(res.data);
        console.log(classlist);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getClasses();
  }, []);

  const addClassFees = async () => {
    try {
      await myAPIClient.post(
        "/classfee",
        { class: classUpdate, amount: fees },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      toast.success("Success, fees have been added!");
    } catch (err) {
      console.log(err);
      toast.error("Error, something went wrong, try again!");
    }
  };

  // GET CLASS FEES **************************************************************************************
  const [feess, setFeess] = useState([]);
  useEffect(() => {
    const getClassFees = async () => {
      try {
        const res = await myAPIClient.get("/classfee", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setFeess(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClassFees();
  }, [isDeleting]);

  const [accountType, setAccountType] = useState("");

  const addAccountType = async () => {
    try {
      const res = await myAPIClient.post(
        "/accounttype",
        { accountType },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Success, account type has been added!");
    } catch (err) {
      console.log(err);
      toast.error("Error, something went wrong, try again!");
    }
  };

  return (
    <Box>
      {/* <Flex justifyContent={"space-between"} pr={10}>
        <Flex>
          <Text
            fontSize={25}
            fontWeight="bold"
            color={primaryColor.color}
            ml={3}
          >
            Manage Accounting
          </Text>
          <Text>SMS</Text>
        </Flex>
        <Flex flexDirection={"row"} gap={2} alignItems="center">
          <Text color={"black"} fontWeight={"bold"} fontSize={15}>
            <Link to="/">Home</Link>
          </Text>
          <FaAngleRight />
          <Text fontSize={15}>Accounting</Text>
          <FaAngleRight />
          <Text>Manage Accounting</Text>
        </Flex>
      </Flex> */}

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
            Manage Fees
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
          <CurrencyBitcoin style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Manage Accounting
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
            {/* ACCOUNT TYPES ******************************************************************/}
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              // borderTop="3px solid #ccc"
              // bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                // color="white"
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
                    Add Fees Structure
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
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Select Class
                  </Text>
                  <Select
                    value={classUpdate}
                    placeholder={"Select Class"}
                    onChange={(e) => {
                      setClassUpdate(e.target.value);
                    }}
                    w={"100%"}
                  >
                    {classlist?.map((c: any) => (
                      <option key={c.classroomId}>{c.className}</option>
                    ))}
                  </Select>
                </Flex>

                <Flex
                  p={3}
                  // bg={"white"}
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
                    Fees
                  </Text>
                  <Input
                    placeholder="Enter fees"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    w="100%"
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  color="white"
                  bgColor={primaryColor.color}
                  onClick={addClassFees}
                  disabled={!fees || !classUpdate}
                >
                  Add Fees
                </Button>
              </Box>
            </Center>

            {/* ACCOUNT TYPES ****************************************************************/}
            <Center
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              pb={4}
              borderTop="3px solid #ccc"
              // bg={"white"}
              height="auto"
              w="90%"
              h="100%"
            >
              <Flex
                alignItems="center"
                bg={primaryColor.color}
                // color="white"
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
                    Add Account Types
                  </Text>
                </Box>
              </Flex>

              <Box w={"100%"}>
                <Flex
                  p={3}
                  // bg={"white"}
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
                    Account Type
                  </Text>
                  <Input
                    placeholder="Account Type"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    w="100%"
                  />
                </Flex>

                <Button
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  color="white"
                  bgColor={primaryColor.color}
                  onClick={addAccountType}
                  disabled={!accountType}
                >
                  Add Account
                </Button>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem
            flexDirection={"column"}
            gap={2}
            h={"max-content"}
            flex={1}
            w={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Box
              flexDirection={"column"}
              boxShadow={"lg"}
              borderRadius={2}
              p={4}
              borderTop="3px solid #ccc"
              height="auto"
              w="90%"
              h="100%"
            >
              <Box w={"100%"}>
                <ClassFeesList
                  deleteClassFee={deleteClassFee}
                  isLoading={isLoading}
                  list={feess}
                />
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  );
};
