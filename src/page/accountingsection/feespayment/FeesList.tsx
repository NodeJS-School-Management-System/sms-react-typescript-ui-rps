import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  FormLabel,
  TableCaption,
  TableContainer,
  IconButton,
  Spinner,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";

import { useState, useEffect } from "react";
import { myAPIClient } from "../../auth/axiosInstance";
import useTheme from "../../../theme/useTheme";

export const FeesList = ({
  setIsLoading,
  accounts,
  isLoading,
  deleteAccountDetails,
}: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = localStorage.getItem("token");

  const [selectedId, setSelectedId] = useState("");

  // GET SELECTED STUDENT"S PAYMENT DETAILS
  const [pupil, setPupil] = useState<any>({});
  useEffect(() => {
    const getSlectedStudent = async () => {
      try {
        const res = await myAPIClient.get(`/fees/${selectedId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setPupil(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSlectedStudent();
  }, [selectedId]);

  // EDIT ACCOUNT DETAILS ********************************************************
  const [clas, setClas] = useState("");
  const [bankname, setBankname] = useState("");
  const [studentname, setStudentName] = useState("");
  const [termname, setTermname] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [scheme, setScheme] = useState("");

  // UPDATE FUNCTION
  const updateFeesDetails = async () => {
    const newAccount = {
      amount: amount ? amount : pupil.amount,
      bankname: bankname ? bankname : pupil.bankname,
      scheme: scheme ? scheme : pupil.scheme,
      accountType: accountType ? accountType : pupil.accountType,
      termname: termname ? termname : pupil.termname,
      studentName: studentname ? studentname : pupil.studentName,
      class: clas ? clas : pupil.class,
      accountNumber: accountNumber ? accountNumber : pupil.accountNumber,
      paymentReference: paymentReference
        ? paymentReference
        : pupil.paymentReference,
    };
    setIsLoading(true);
    try {
      const res = await myAPIClient.put(`/fees/${selectedId}`, newAccount, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      toast.success("Success, details have been updated!");
      setAccountNumber("");
      setAmount("");
      setClas("");
      setScheme("");
      setTermname("");
      setAccountType("");
      setStudentName("");
      setPaymentReference("");
      setBankname("");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong, try again!");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Flex align="center" m="auto" mt={5} justify="center">
          <Spinner style={{ margin: "auto" }} color="teal" />
        </Flex>
      ) : (
        <TableContainer h={950} overflowY="auto">
          <Table variant="simple">
            <TableCaption>Fees List</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={14}>Student Name</Th>
                <Th fontSize={14}>Class Name</Th>
                <Th fontSize={14}>Term Name</Th>
                <Th fontSize={14}>Bank Name</Th>
                <Th fontSize={14}>Amount Paid</Th>
                <Th fontSize={14}>Balance</Th>
                <Th fontSize={14}>Sponsorship Scheme</Th>
                <Th fontSize={14} m="auto" textAlign={"center"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {accounts.map((ac: any) => (
                <Tr key={ac.accountId}>
                  <Td>{ac.studentName}</Td>
                  <Td>{ac.class}</Td>
                  <Td>{ac.termname}</Td>
                  <Td>{ac.bankname}</Td>
                  <Td>{ac.amount}/=</Td>
                  <Td>{Number(ac.classFeesAMount) - Number(ac.amount)}/=</Td>
                  <Td>{ac.scheme}</Td>
                  <Td>
                    <Td
                      display={"flex"}
                      justifyContent="center"
                      m="auto"
                      textAlign={"center"}
                      gap={2}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete database"
                        onClick={() => deleteAccountDetails(ac.accountId)}
                        icon={<BiTrashAlt />}
                      />
                      <IconButton
                        colorScheme="blue"
                        onClick={() => {
                          setSelectedId(ac.accountId);
                          onOpen();
                        }}
                        aria-label="Edit database"
                        icon={<Edit />}
                      />
                    </Td>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={primaryColor.color} fontSize={22}>
              Update Fees Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box w={"100%"}>
                <Flex
                  // bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Class Name <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={clas}
                    onChange={(e) => {
                      setClas(e.target.value);
                    }}
                    type="text"
                    placeholder={pupil.class}
                  />
                </Flex>

                <Flex
                  py={3}
                  // bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Amount <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    placeholder={pupil.amount}
                  />
                </Flex>

                <Flex
                  py={3}
                  // bg={"white"}
                  w={"100%"}
                  h={"100%"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Amount <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder={pupil.paymentReference}
                  />
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Account Type
                  </FormLabel>
                  <Input
                    placeholder={pupil.accountType}
                    value={accountType}
                    onChange={(e) => {
                      setAccountType(e.target.value);
                    }}
                    w={"100%"}
                  />
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Account Number
                  </FormLabel>
                  <Input
                    placeholder={pupil.accountNumber}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Sponsorship Scheme
                  </FormLabel>
                  <Input
                    placeholder={pupil.scheme}
                    value={scheme}
                    onChange={(e) => setScheme(e.target.value)}
                    w={"100%"}
                  />
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Bank Name
                  </FormLabel>
                  <Input
                    placeholder={pupil.bankname}
                    value={bankname}
                    onChange={(e) => setBankname(e.target.value)}
                  />
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
                  <FormLabel
                    fontSize={20}
                    fontWeight="bold"
                    alignSelf={"flex-start"}
                    color={"gray"}
                    mb={3}
                  >
                    Student Name
                  </FormLabel>
                  <Input
                    placeholder={pupil.studentName}
                    value={studentname}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </Flex>

                <Button
                  my={2}
                  variant={"solid"}
                  w="50%"
                  mx={3}
                  onClick={updateFeesDetails}
                  bgColor={primaryColor.color}
                  color="white"
                  isDisabled={
                    !clas &&
                    !bankname &&
                    !paymentReference &&
                    !accountType &&
                    !amount &&
                    !scheme &&
                    !studentname &&
                    !accountNumber
                  }
                >
                  {isLoading ? <Spinner color="red.500" /> : "Update Class Fee"}
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};
