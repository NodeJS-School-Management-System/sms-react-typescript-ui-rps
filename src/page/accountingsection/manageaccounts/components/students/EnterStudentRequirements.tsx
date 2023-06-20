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

const EnterStudentRequirements = () => {
  const [itemquantity, setItemQuantity] = useState("");
  const [itemquantityBorder, setItemQuantityBorder] = useState("");
  const [itemprice, setItemprice] = useState("");
  const [itemname, setItemname] = useState("");
  const [itemcategory, setItemcategory] = useState("");

  // GET ALL CLASSES
  const [clas, setClas] = useState("");
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
  const [feeswithmeals, setFeeswithmeals] = useState("");
  const [feeswithoutmeals, setFeeswithOutmeals] = useState("");
  const [boarders, setBorders] = useState("");
  const addClassFees = async () => {
    try {
      const res = await myAPIClient.post(
        "/feesmanager/newfees",
        {
          classname: clas,
          fees_amount_with_status: {
            dayscholars: {
              lunchtakers: Number(feeswithmeals),
              nonlunchtakers: Number(feeswithoutmeals),
            },

            boarders,
          },
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Success, class fees has been added!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong adding class fees!");
    }
  };

  //   ADD STUDENT REQUIREMENT
  const [isAddingR, setIsAddingR] = useState(false);
  const addRequirement = async () => {
    setIsAddingR(true);
    try {
      const res = await myAPIClient.post(
        "/studentrequirements/addrequirement",
        {
          itemname,
          itemcategory,
          itemprice: Number(itemprice),
          itemquantity: {
            dayscholars: Number(itemquantity),
            borders: Number(itemquantityBorder),
          },
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setItemQuantity("");
      setItemQuantityBorder("");
      setItemcategory("");
      setItemname("");
      setItemQuantity("");
      toast.success("Success, student requirement has been added!");
      setIsAddingR(false);
    } catch (err) {
      console.log(err);
      setIsAddingR(false);
      toast.error(
        "Sorry, somethign went wrong adding student requirement, try again!"
      );
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
        {/* STUDENT FEES ******************************************************************/}
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
                fontSize={16}
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
                fontSize={16}
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

            {/* STUDENT STATUS (DAY OR BORDER) */}

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
                Fees Without Meals(Day Scholars)
              </Text>
              <Input
                placeholder="Enter fees"
                value={feeswithoutmeals}
                onChange={(e) => setFeeswithOutmeals(e.target.value)}
                w="100%"
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
                Fees With Meals(Day Scholars)
              </Text>
              <Input
                placeholder="Enter fees"
                value={feeswithmeals}
                onChange={(e) => setFeeswithmeals(e.target.value)}
                w="100%"
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
                Fees (Borders)
              </Text>
              <Input
                placeholder="Enter fees"
                value={boarders}
                onChange={(e) => setBorders(e.target.value)}
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
              disabled={!feeswithmeals || !clas}
            >
              Add Fees
            </Button>
          </Box>
        </Center>

        {/* OTHER REQUIREMENTS ******************************************************************/}
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
                fontSize={16}
                color="white"
                textAlign="center"
                fontWeight="bold"
              >
                Add Student Requirements
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
                Item Name
              </Text>
              <Input
                placeholder="Item Name"
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
              />
            </Flex>

            <Flex
              p={3}
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
                  Item Quantity(Day)
                </Text>

                <Input
                  value={itemquantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                  type="number"
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
                  Item Quantity(Border)
                </Text>

                <Input
                  value={itemquantityBorder}
                  onChange={(e) => setItemQuantityBorder(e.target.value)}
                  placeholder="Enter Quantity"
                  type="number"
                />
              </Flex>
            </Flex>

            <Flex
              p={3}
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
                  Item Category
                </Text>

                <Input
                  value={itemcategory}
                  onChange={(e) => setItemcategory(e.target.value)}
                  placeholder="Enter category"
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
                  Item Price
                </Text>

                <Input
                  type="number"
                  placeholder="Item Price"
                  value={itemprice}
                  onChange={(e) => setItemprice(e.target.value)}
                />
              </Flex>
            </Flex>

            <Button
              variant={"solid"}
              w="50%"
              mx={3}
              color="white"
              bgColor={primaryColor.color}
              onClick={addRequirement}
              disabled={
                !itemcategory ||
                !itemname ||
                !itemprice ||
                !itemquantityBorder ||
                !itemquantity
              }
            >
              {isAddingR ? "Adding.." : "Add Requirement"}
            </Button>
          </Box>
        </Center>
      </WrapItem>
    </Box>
  );
};

export default EnterStudentRequirements;
