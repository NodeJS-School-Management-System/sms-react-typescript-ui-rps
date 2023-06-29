import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../../../../../../theme/useTheme";
// import { myAPIClient } from "../../../../../../auth/axiosInstance";

const FeesDetails = ({ student }: any) => {
  //   GET STUDENT DETAILS OVER SPECIFIED PERIOD
  const [year, setYear] = useState("");
  const [termname, setTermname] = useState("");
  //   const [isFetching, setIsFetching] = useState(false);
  //   const token = localStorage.getItem("token");
  const [revealDetails, setRevealDetails] = useState(false);
  //   const [details, setDetails] = useState({});
  const getDetails = async () => {
    // setIsFetching(true);
    // try {
    //   const res = await myAPIClient.get(
    //     `/users/students/details/${termname}/${year}`,
    //     {
    //       headers: {
    //         token: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(res.data);
    //   //   setDetails(res.data);
    setRevealDetails(!revealDetails);
    //   setIsFetching(false);
    //   toast.success("Request processed successfully!");
    // } catch (err) {
    //   console.log(err);
    //   setIsFetching(false);
    //   toast.error("Error processing your request!");
    // }
  };

  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Box>
      <Box>
        <Flex gap={2} mb={2}>
          {/* SELECT TERM AND YEAR */}
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
              fontSize={16}
            >
              {/* <option value={"Term One"}>Term One</option> */}
              <option value={"Term Two"}>Term Two</option>
              {/* <option value={"Term Three"}>Term Three</option> */}
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
              Select Year <span style={{ color: "red" }}>*</span>
            </Text>
            <Select
              placeholder="Select Year"
              value={year}
              fontSize={16}
              onChange={(e) => setYear(e.target.value)}
              w={"100%"}
            >
              <option value={"2023"}>2023</option>
            </Select>
          </Flex>
        </Flex>
        <Button
          disabled={!termname || !year}
          onClick={getDetails}
          backgroundColor={primaryColor.color}
          color="white"
          w="50%"
        >
          {/* {isFetching ? "" : "Get Details"} */}
          Get Details
        </Button>
      </Box>

      {/* DETAILS REVEALED */}
      {revealDetails && (
        <Flex flexDir={"column"} gap={2} mt={3}>
          <Flex flexDir={"column"} gap={3}>
            <Box>
              Sponsorship Scheme:{" "}
              <span style={{ fontWeight: "bold" }}>
                {student.status_and_payment_info?.bursary_scheme}
              </span>
            </Box>
            <Box>
              Fees Amount:{" "}
              <span style={{ fontWeight: "bold" }}>
                {student.status_and_payment_info?.currentfees}/=
              </span>
            </Box>
            <Box>
              Fees Status:{" "}
              <span style={{ fontWeight: "bold" }}>
                {student.status_and_payment_info.fees_balance
                  ? "Not Cleared"
                  : "Cleared"}
              </span>
            </Box>
            <Box>
              Fees Balance:{" "}
              <span style={{ fontWeight: "bold" }}>
                {student.status_and_payment_info.fees_balance || 0}/=
              </span>
            </Box>
          </Flex>
          <Box>
            <Button
              w="100%"
              disabled
              backgroundColor={primaryColor.color}
              color="white"
            >
              Generate PDF
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default FeesDetails;
