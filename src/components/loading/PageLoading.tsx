// import Box from "../box/Box";
import Logo from "../logo/Logo";
import { Text } from "../../ui";
import { Icon } from "@iconify/react";
import { Box } from "@chakra-ui/react";
const PageLoading = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Logo height="16px" width="35%" />
        <Text size={100} align="center" lineHeight="48px" skinColor paragraph>
          <Icon icon="eos-icons:three-dots-loading" />{" "}
        </Text>
      </Box>
    </Box>
  );
};
export default PageLoading;
