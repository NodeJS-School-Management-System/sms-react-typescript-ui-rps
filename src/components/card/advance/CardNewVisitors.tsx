import { Text } from "../../../ui";
import ArrowIndicator from "../../../ui/arrow/ArrowIndicator";
import formatNumber from "../../../utils/formatNumber";
import Box from "../../box/Box";
import Card from "../Card";
import CustomCardTitle from "../titles/CustomCardTitle";


const CardNewVisitors = () => {
  return (
    <Card>
      <CustomCardTitle title="New visitors" showIcon={false} />
      <Box display="flex" align="flex-end" px={20} pb={20}>
        <Box style={{ width: "50%" }}>
          <Text varient="caption" secondary={true}>
            50% new visitors this week
          </Text>
          <Box display="flex" space={0.1} align="center" mt={8}>
            <Text heading="h6" weight="medium">
              {formatNumber(32122)}
            </Text>
            <ArrowIndicator status="inc" color={true} />
            <Text varient="caption" color="success">
              30
            </Text>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
export default CardNewVisitors;
