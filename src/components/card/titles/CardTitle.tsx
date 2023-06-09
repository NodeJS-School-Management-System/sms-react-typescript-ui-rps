import { FC, ReactNode, CSSProperties } from "react";
import { Text } from "../../../ui";
import CardHeaderTitle from "./styled";
import Box from "../../box/Box";

const CardTitle: FC<Props> = (props) => {
  return (
    <CardHeaderTitle style={{ ...props.styles }} display="flex" padding={20}>
      <Box display="flex" flex={1}>
        <Text
          heading="h6"
          textTransform="capitalize"
          styles={{ flex: "1 1 auto" }}
        >
          {props.title}
        </Text>
        {props.showIcon === false ? (
          ""
        ) : (
          <span style={{ position: "relative" }}>
            {props.component && (
              <div className="current-action-dropdown">{props.component}</div>
            )}
          </span>
        )}
      </Box>
    </CardHeaderTitle>
  );
};
export default CardTitle;
interface Props {
  title: string;
  icons?: ReactNode;
  component?: ReactNode;
  styles?: CSSProperties;
  showIcon?: boolean;
}
