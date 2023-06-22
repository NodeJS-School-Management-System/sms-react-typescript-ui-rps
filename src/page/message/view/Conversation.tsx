import { Box, Text } from "@chakra-ui/react";
import { format } from "timeago.js";

const Conversation = ({ item, triggerMessage }: any) => {
  return (
    <Box
      h={70}
      display={"flex"}
      gap={2}
      flexDirection="column"
      borderBottom={"1px solid #ccc"}
      padding={2}
      marginBottom={0}
      paddingBottom={0}
      _hover={{ backgroundColor: "#eee", cursor: "pointer" }}
      onClick={() => triggerMessage(item)}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          fontWeight={"600"}
          fontSize={{ base: 10, md: 13, lg: 16 }}
        >
          {item.sender_fullname}
        </Box>
        <Box fontWeight={"500"} fontSize={16}>
          {item.title}
        </Box>
        <Box fontWeight={"300"} fontSize={14}>
          {format(item.createdAt)}
        </Box>
      </Box>
      <Box>
        <Text textOverflow={"ellipsis"} whiteSpace="nowrap" overflow={"hidden"}>
          {item.messagebody} 
        </Text>
      </Box>
    </Box>
  );
};

export default Conversation;
