import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  AlertIcon,
  Input,
  FormLabel,
  Flex,
  Box,
  Alert,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useTheme from "../../../theme/useTheme";
import { myAPIClient } from "../../auth/axiosInstance";

const EditModal = ({ isOpen, onClose, selectedId }: any) => {
  const [classname, setClassname] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [classfees, setClassfees] = useState<any>({});
  useEffect(() => {
    const getClassFees = async () => {
      try {
        const res = await myAPIClient.get(`/classfee/${selectedId}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClassfees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getClassFees();
  }, []);

  // EDIT CLASS FEE *************************************************

  const updateFee = async () => {
    try {
      const res = await myAPIClient.put(
        `fees/${selectedId}`,
        {
          class: classname ? classname : classfees.class,
          amount: amount ? amount : classfees.amount,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setIsLoading(false);
      setSuccess(true);
      setError(false);
      // toast.success("Success, class fee has been updated!");
    } catch (err) {
      console.log(err);
      setError(true);
      setSuccess(false);
      setIsLoading(false);
      // toast.error("Error, something went wrong, try again!");
    }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={primaryColor.color} fontSize={22}>
            Update Class Fee
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"}>
              <Flex
                bg={"white"}
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
                  value={classname}
                  onChange={(e) => {
                    setClassname(e.target.value);
                    setError(false);
                    setSuccess(false);
                  }}
                  type="text"
                  placeholder={classfees.class}
                />
              </Flex>

              <Flex
                py={3}
                bg={"white"}
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
                    setError(false);
                    setSuccess(false);
                    setAmount(e.target.value);
                  }}
                  placeholder={classfees.amount}
                />
              </Flex>

              {error && (
                <Alert p={6} w={"90%"} status="error">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              )}

              {success && (
                <Alert p={6} w={"90%"} status="success">
                  <AlertIcon />
                  Success, expense has been updated successfully!
                </Alert>
              )}

              <Button
                my={2}
                variant={"solid"}
                w="50%"
                mx={3}
                onClick={updateFee}
                bgColor={primaryColor.color}
                color="white"
                isDisabled={!classname && !amount}
              >
                {isLoading ? <Spinner color="red.500" /> : "Update Class Fee"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
