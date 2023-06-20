const NewTable = () => {
  return <div>ty</div>;
};

export default NewTable;

// import {
//   CalendarIcon,
//   CheckIcon,
//   InfoIcon,
//   SunIcon,
//   TimeIcon,
// } from "@chakra-ui/icons";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   Box,
//   Flex,
//   DarkMode,
//   Text,
//   Button,
//   Progress,
//   Avatar,
//   AvatarGroup,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

// const NewTable = () => {
//   const exampleBg = "gray.800";
//   const bg = "gray.700";
//   const textColor = "white";
//   const bgColor = "gray.800";
//   const nameColor = "white";
//   return (
//     <DarkMode>
//       <Table variant="simple" color={textColor}>
//         <Thead>
//           <Tr my=".8rem" ps="0px">
//             <Th ps="0px" color="gray.400">
//               Companies
//             </Th>
//             <Th color="gray.400">Members</Th>
//             <Th color="gray.400">Budget</Th>
//             <Th color="gray.400">Completion</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <CheckIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Vision UI Version
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 $14,000
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="cyan.300"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   60%
//                 </Text>
//                 <Progress
//                   colorScheme={"cyan"}
//                   size="xs"
//                   value={60}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <TimeIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Add Progress Track
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 $3,000
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="cyan.300"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   10%
//                 </Text>
//                 <Progress
//                   colorScheme={"cyan"}
//                   size="xs"
//                   value={10}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <SunIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Fix Platform Errors
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 Not set
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="teal.200"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   100%
//                 </Text>
//                 <Progress
//                   colorScheme={"teal"}
//                   size="xs"
//                   value={100}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <InfoIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Launch our Mobile App
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 $32,000
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="teal.200"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   100%
//                 </Text>
//                 <Progress
//                   colorScheme={"teal"}
//                   size="xs"
//                   value={100}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <CalendarIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Add the New Pricing Page
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 $400
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="cyan.300"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   25%
//                 </Text>
//                 <Progress
//                   colorScheme={"cyan"}
//                   size="xs"
//                   value={25}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 <CheckIcon h={"24px"} w={"24px"} pr="5px" />
//                 <Text
//                   fontSize="md"
//                   color={textColor}
//                   fontWeight="bold"
//                   minWidth="100%"
//                 >
//                   Redesign New Online Shop
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <AvatarGroup size="sm">
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//                 <Avatar
//                   name="avatar"
//                   src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/avatar2.e81efbfa.png"
//                   _hover={{ zIndex: "3", cursor: "pointer" }}
//                 />
//               </AvatarGroup>
//             </Td>
//             <Td>
//               <Text
//                 fontSize="md"
//                 color={textColor}
//                 fontWeight="bold"
//                 pb=".5rem"
//               >
//                 $7,600
//               </Text>
//             </Td>
//             <Td>
//               <Flex direction="column">
//                 <Text
//                   fontSize="md"
//                   color="cyan.300"
//                   fontWeight="bold"
//                   pb=".2rem"
//                 >
//                   40%
//                 </Text>
//                 <Progress
//                   colorScheme={"cyan"}
//                   size="xs"
//                   value={40}
//                   borderRadius="15px"
//                 />
//               </Flex>
//             </Td>
//           </Tr>
//         </Tbody>
//       </Table>
//     </DarkMode>
//   );
// };

// export default NewTable;
