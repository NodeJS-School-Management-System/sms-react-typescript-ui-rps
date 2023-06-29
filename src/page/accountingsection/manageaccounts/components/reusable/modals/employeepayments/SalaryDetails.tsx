import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../../../../../../theme/useTheme";
// import { myAPIClient } from "../../../../../../auth/axiosInstance";

const SalaryDetails = ({ user }: any) => {
  //   GET STUDENT DETAILS OVER SPECIFIED PERIOD
  const [year, setYear] = useState("");
  const [termname, setTermname] = useState("");
  //   const [isFetching, setIsFetching] = useState(false);
  //   const token = localStorage.getItem("token");
  const [revealDetails, setRevealDetails] = useState(false);
  //   const [details, setDetails] = useState({});
  const getDetails = async () => {
    setRevealDetails(!revealDetails);
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
              Role :{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.designation || user?.role}
              </span>
            </Box>
            <Box>
              Base Salary:{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.salary_and_payment_info.salary_amount.toLocaleString()}
              </span>
            </Box>
            <Box>
              Salary Balance:{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.salary_and_payment_info.salary_balance || "N/A"}
              </span>
            </Box>
            <Box>
              Deductions:{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.salary_and_payment_info.payment_details[
                  user?.salary_and_payment_info.payment_details.length - 1
                ]?.deductions || "N/A"}
              </span>
            </Box>
            <Box>
              Allowances:{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.salary_and_payment_info.allowance_amount || "N/A"}
              </span>
            </Box>
            <Box>
              Net Salary:{" "}
              <span style={{ fontWeight: "bold" }}>
                {user?.salary_and_payment_info.salary_amount -
                  (user?.salary_and_payment_info.payment_details[
                    user?.salary_and_payment_info.payment_details.length - 1
                  ]?.deductions
                    ? user?.salary_and_payment_info.payment_details[
                        user?.salary_and_payment_info.payment_details.length - 1
                      ]?.deductions
                    : 0)}
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

export default SalaryDetails;
