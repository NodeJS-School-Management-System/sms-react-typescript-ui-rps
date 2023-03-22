import { Box, Text } from "@chakra-ui/react";

const Conversation = ({ item, setShowMessages, setShowMessage }: any) => {
  const triggerMessage = () => {
    setShowMessages(false);
    setShowMessage(true);
  };
  return (
    <Box
      h={70}
      bg={"#eee"}
      display={"flex"}
      gap={2}
      flexDirection="column"
      borderBottom={"1px solid teal"}
      padding={2}
      borderRadius={3}
      marginBottom={0}
      paddingBottom={0}
      _hover={{ backgroundColor: "#ddd", cursor: "pointer" }}
      onClick={triggerMessage}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box fontWeight={"600"} fontSize={18}>
          Abeinemukama Vicent
        </Box>
        <Box fontWeight={"500"} fontSize={16}>
          PTA Meeting
        </Box>
        <Box fontWeight={"300"} fontSize={14}>
          2 min ago
        </Box>
      </Box>
      <Box>
        <Text textOverflow={"ellipsis"} whiteSpace="nowrap" overflow={"hidden"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          tempore minima ipsam molestiae totam, iste modi eaque natus
          repudiandae in fugiat non illo a quibusdam expedita perferendis
          aliquam, unde facilis.
        </Text>
      </Box>
    </Box>
  );
};

export default Conversation;
