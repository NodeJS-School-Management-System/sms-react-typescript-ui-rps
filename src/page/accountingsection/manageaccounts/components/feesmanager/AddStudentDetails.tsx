import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Select,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useTheme from "../../../../../theme/useTheme";
import { myAPIClient } from "../../../../auth/axiosInstance";

const AddStudentDetails = () => {
  const [scheme, setScheme] = useState("");
  const [bank, setBank] = useState("");

  const [adding, setAdding] = useState(false);
  const [addingBank, setAddingBank] = useState(false);

  // ADD SCHEME
  const addScheme = async () => {
    setAdding(true);
    try {
      const res = await myAPIClient.post(
        "/feesmanager/newpaymentscheme",
        { scheme },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setAdding(false);
      toast.success("Success, payment scheme has been added!");
    } catch (err) {
      console.log(err);
      setAdding(false);
      toast.error("Something went wrong adding payment scheme!");
    }
  };

  // ADD BANK
  const addBank = async () => {
    setAddingBank(true);

    try {
      const res = await myAPIClient.post(
        "/feesmanager/newbank",
        { bankname: bank },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setAddingBank(false);

      toast.success("Success, bank has been added!");
    } catch (err) {
      console.log(err);
      setAddingBank(false);

      toast.error("Something went wrong adding bank!");
    }
  };

  // GET ALL CLASSES
  const [clas, setClas] = useState("");
  const [fees, setFees] = useState<any>(0);
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

  // ADD CLASS FEES
  const addClassFees = async () => {
    try {
      const res = await myAPIClient.post("", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong adding class fees!");
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();
  return (
    <Box w="100%" h="100%" boxShadow={"md"}>
      <WrapItem
        flex={1}
        gap={6}
        flexDirection={"column"}
        h={"max-content"}
        w={"100%"}
      >
        {/* ACCOUNT TYPES ******************************************************************/}
        <Center
          flexDirection={"column"}
          boxShadow={"lg"}
          borderRadius={2}
          pb={4}
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
                p={1}
                fontSize={18}
                color="white"
                textAlign="center"
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
                value={clas}
                placeholder={"Select Class"}
                onChange={(e) => {
                  setClas(e.target.value);
                }}
                w={"100%"}
              >
                {classlist?.map((c: any) => (
                  <option key={c._id}>{c.classnumeral}</option>
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
              disabled={!fees || !clas}
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
                p={1}
                fontSize={18}
                color="white"
                textAlign="center"
                fontWeight="bold"
              >
                Add Payment Scheme
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
                Payment Scheme
              </Text>
              <Input
                placeholder="Scheme e.g Full Barsary"
                value={scheme}
                onChange={(e) => setScheme(e.target.value)}
                w="100%"
              />
            </Flex>

            <Button
              variant={"solid"}
              w="50%"
              mx={3}
              color="white"
              bgColor={primaryColor.color}
              onClick={addScheme}
              disabled={!scheme}
            >
              {adding ? "Adding.." : "addScheme"}
            </Button>
          </Box>
        </Center>

        {/* ADD BANKS */}
        <Center
          flexDirection={"column"}
          boxShadow={"lg"}
          borderRadius={2}
          pb={8}
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
                color="white"
                textAlign="center"
                p={1}
                fontSize={18}
                fontWeight="bold"
              >
                Add Banks
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
                Bank Name
              </Text>
              <Input
                placeholder="Bank Name"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                w="100%"
              />
            </Flex>

            <Button
              variant={"solid"}
              w="50%"
              mx={3}
              color="white"
              bgColor={primaryColor.color}
              onClick={addBank}
              disabled={!bank}
            >
              {addingBank ? "Adding.." : "Add Bank"}
            </Button>
          </Box>
        </Center>
      </WrapItem>
    </Box>
  );
};

export default AddStudentDetails;
