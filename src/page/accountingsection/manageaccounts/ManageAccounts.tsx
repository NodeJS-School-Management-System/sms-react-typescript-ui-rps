import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Home, Money } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";
import Admissions from "./components/admissions/Admissions";
import Creditors from "./components/creditors/Creditors";
import Dashboard from "./components/dashboard/Dashboard";
import Employees from "./components/employees/Employees";
import Incomes from "./components/expenses/Income";
import FeesManager from "./components/feesmanager/FeesManager";
import FixedAssets from "./components/fixedassets/FixedAssets";
import Grants from "./components/Grants/Grants";
import Expenses from "./components/incomes/Expenses";
import Payments from "./components/Payments/Payments";
import Purchases from "./components/purchases/Purchases";
import StudentRequirements from "./components/students/StudentRequirements";
import Students from "./components/students/Students";

export default function ManageAccounts() {
  const {
    theme: { primaryColor },
  } = useTheme();

  const tabListWidth = useBreakpointValue({ base: "100%", md: "auto" });

  return (
    <Box h="100%">
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        // h={70}
        mb={2}
      >
        <Box display={"flex"}>
          <Heading fontSize={{ base: 20, md: 30 }} color={primaryColor.color}>
            Manage Accounts
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
          <Money style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            Manage Finances
          </Text>
        </Box>
      </Flex>

      {/* TABLIST */}
      <Box boxShadow={"md"}>
        <Tabs variant="unstyled" h="100%">
          <TabList
            borderBottom={"1px solid #eee"}
            display="flex"
            flexWrap="wrap"
            width={tabListWidth}
            pb={1}
          >
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Dashboard
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Fees Manager
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Income
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Expenditure
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Purchases
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Creditors
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Income Analysis
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Expenditure Analysis
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Payments
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Grants
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Employees
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Students
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Admissions
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Fixed Assets
            </Tab>

            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Student Requirements
            </Tab>

            {/* `<Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Projects
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Reports
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Emailing
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Bulk SMS
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Bank
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: primaryColor.color,
                borderRadius: 0,
              }}
              fontSize={13}
              borderRight={"1px solid #ddd"}
              borderRadius={0}
            >
              Sales
            </Tab>` */}
          </TabList>

          <TabPanels>
            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <FeesManager />
            </TabPanel>
            <TabPanel>
              <Incomes />
            </TabPanel>
            <TabPanel>
              <Expenses />
            </TabPanel>
            <TabPanel>
              <Purchases />
            </TabPanel>
            <TabPanel>
              <Creditors />
            </TabPanel>
            <TabPanel>
              <Incomes />
            </TabPanel>
            <TabPanel>
              <Expenses />
            </TabPanel>
            <TabPanel>
              <Payments />
            </TabPanel>
            <TabPanel>
              <Grants />
            </TabPanel>
            <TabPanel>
              <Employees />
            </TabPanel>
            <TabPanel>
              <Students />
            </TabPanel>
            <TabPanel>
              <Admissions />
            </TabPanel>
            <TabPanel>
              <FixedAssets />
            </TabPanel>
            <TabPanel>
              <StudentRequirements />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
