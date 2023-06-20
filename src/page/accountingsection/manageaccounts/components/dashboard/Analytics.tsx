import {
  Table,
  Thead,
  Tbody,
  Tr,
  Box,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
const Analytics = () => {
  return (
    <Box>
      <Box
        fontWeight={"bold"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        margin="auto"
        fontSize={13}
      >
        KPI
      </Box>
      <Box>
        <TableContainer>
          <Table fontSize={12} variant="striped" colorScheme="gray">
            <TableCaption fontSize={13}>Finance Analytics</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12}>Type</Th>
                <Th fontSize={12}>Amount</Th>
                <Th fontSize={12}>Previous Paid</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={12}>Accounts Receivable</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color="red">
                      -5.6K
                    </Box>
                    <ArrowDropDown style={{ color: "red" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Cash & Bank</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color={"teal"}>
                      10.1K
                    </Box>
                    <ArrowDropUp style={{ color: "teal" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Cost of Sales</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color="red">
                      -15.6K
                    </Box>
                    <ArrowDropDown style={{ color: "red" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Creditors</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color="red">
                      -5.6K
                    </Box>
                    <ArrowDropDown style={{ color: "red" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Fixed Assets</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color="red">
                      -9.6K
                    </Box>
                    <ArrowDropDown style={{ color: "red" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Gross Margin</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color={"teal"}>
                      7.6K
                    </Box>
                    <ArrowDropUp style={{ color: "teal" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Gross Profit</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color={"teal"}>
                      7.6K
                    </Box>
                    <ArrowDropUp style={{ color: "teal" }} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={12}>Net Profit(Loss)</Td>
                <Td fontSize={12}>56000</Td>
                <Td fontSize={12}>35000</Td>
                <Td>
                  <Flex>
                    <Box fontSize={12} color="red">
                      -5.6K
                    </Box>
                    <ArrowDropDown style={{ color: "red" }} />
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Analytics;
