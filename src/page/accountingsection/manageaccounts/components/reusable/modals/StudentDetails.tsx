import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
} from "@chakra-ui/react";
import useTheme from "../../../../../../theme/useTheme";
import FeesDetails from "./StudentFees/FeesDetails";
import Requirements from "./StudentFees/Requirements";

const StudentDetails = ({ student }: any) => {
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
          Fees Details
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
          Requirements Tracker
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FeesDetails student={student} />
        </TabPanel>
        <TabPanel>
          <Requirements student={student} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default StudentDetails;
