import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ReportTable from "./ReportTable";

const ReportModal = ({ isOpen, onClose, data }: any) => {
  useEffect(() => {
    console.log(data, "reeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  }, []);
  return (
    <>
      {/* {results.map((result: any) => ( */}
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            RWEBIITA PREPARATORY SCHOOL{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            h={"90%"}
            px={10}
          >
            <Flex flexDirection={"column"} w="90%">
              <Box
                mb={5}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text>P.O BOX 101, KABWOHE, SHEEMA DISTRICT</Text>
                <Text>
                  TEL. 256-789-576065/704010650 Email: mkatusiimeh@gmail.com
                </Text>
                <Text>Website: www.rwebiitapreparatory.com</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text>END OF TERM REPORT </Text>
              </Box>
              <Box>
                <Text>
                  Name: {`${data.firstname} ${data.lastname}`}{" "}
                  Class............................. Term
                  .......................{" "}
                </Text>
                <ReportTable />
              </Box>
            </Flex>
          </ModalBody>

          <Flex justifyContent="center">
            <Box>
              <Text
                textAlign={"center"}
                fontSize={13}
                mb={15}
                fontWeight="bold"
              >
                MOTTO: WE CARE, WE SHARE, WE LEARN TOGETHER
              </Text>
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
      {/* ))} */}
    </>
  );
};

export default ReportModal;
