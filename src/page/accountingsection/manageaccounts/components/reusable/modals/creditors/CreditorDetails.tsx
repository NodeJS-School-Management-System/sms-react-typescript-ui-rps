import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
} from "@chakra-ui/react";
import useTheme from "../../../../../../../theme/useTheme";
import CreditorPaymentHistory from "./CreditorPaymentHistory";
import UpdateCreditorPayments from "./UpdateCreditorPayments";

const CreditorDetails = ({ user }: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const tabListWidth = useBreakpointValue({ base: "100%", md: "auto" });

  return (
    <Tabs isFitted variant="unstyled" h="100%">
      <TabList
        borderBottom={"1px solid #eee"}
        display="flex"
        flexWrap="wrap"
        width={tabListWidth}
      >
        <Tab
          _selected={{
            color: "white",
            bg: primaryColor.color,
            borderRadius: 0,
          }}
          fontSize={13}
          borderRadius={0}
        >
          Update Details
        </Tab>
        <Tab
          _selected={{
            color: "white",
            bg: primaryColor.color,
            borderRadius: 0,
          }}
          fontSize={13}
          borderRadius={0}
        >
          Payment History
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UpdateCreditorPayments user={user} />
        </TabPanel>
        <TabPanel>
          <CreditorPaymentHistory user={user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreditorDetails;
