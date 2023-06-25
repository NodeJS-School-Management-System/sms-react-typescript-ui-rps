import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Home, LibraryAddCheckSharp } from "@mui/icons-material";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../../theme/useTheme";

const ViewLib = ({ query, setQuery }: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  return (
    <Flex flexDir={"column"}>
      <Flex
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justify="space-between"
        h={70}
        p={5}
        pt={0}
        mb={3}
      >
        <Box display={"flex"}>
          <Heading
            as={"h5"}
            fontSize={{ base: 20, md: 30, lg: 35 }}
            color={primaryColor.color}
          >
            View Store
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
          <LibraryAddCheckSharp style={{ fontSize: 16 }} />
          <Text fontWeight="bold" fontSize={{ base: 10, md: 12, lg: 14 }}>
            View Store
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="flex-end"
          h={70}
          p={5}
          pl={0}
          my={3}
        >
          <Box
            display="flex"
            alignItems={"center"}
            gap={2}
            justifyContent={"flex-end"}
          >
            <Text>Search:</Text>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search store.."
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ViewLib;
