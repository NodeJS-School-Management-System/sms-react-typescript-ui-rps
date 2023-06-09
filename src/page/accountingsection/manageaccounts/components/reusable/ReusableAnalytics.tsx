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
  IconButton,
} from "@chakra-ui/react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { BiTrashAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { ReusableAnalyticsProps } from "./types/Reusable.type";

const ReusableAnalytics = ({
  captionText,
  tableHeaders,
  data,
  deleteNotice,
  deleteIncome,
  deleteAsset,
  grants,
}: ReusableAnalyticsProps) => {
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
        {captionText}
      </Box>
      <Box>
        <TableContainer h={560} overflowY={"auto"}>
          <Table fontSize={12} variant="striped" colorScheme="gray">
            <TableCaption fontSize={13}>{captionText}</TableCaption>
            <Thead>
              <Tr>
                {tableHeaders.map((thd) => (
                  <Th fontSize={12} key={thd}>
                    {thd}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {data && (
              <Tbody>
                {data.map((d: any) => (
                  <Tr key={d?._id}>
                    <Td fontSize={12}>
                      {d?.itemname || d?.sender || d?.fundername}
                    </Td>
                    <Td fontSize={12}>
                      {d?.category || d?.title || d?.amount}
                    </Td>
                    <Td fontSize={12}>
                      {d?.networth || d?.amount || d?.message || d?.date}
                    </Td>
                    <Td margin="auto">
                      <Flex gap={2}>
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          onClick={() => {
                            d.amount
                              ? deleteIncome(d?._id)
                              : d.message
                              ? deleteNotice(d?._id)
                              : d?.networth
                              ? deleteAsset(d?._id)
                              : null;
                          }}
                          icon={<BiTrashAlt />}
                          size="xs"
                        />
                        <IconButton
                          colorScheme="blue"
                          // onClick={() => openModal(user.studentId)}
                          aria-label="Edit database"
                          icon={<BsEye />}
                          size="xs"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}

            {!data && (
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
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReusableAnalytics;
