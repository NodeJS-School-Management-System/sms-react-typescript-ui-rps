import { Box, Text, Center, Flex, WrapItem, Select } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

export const ViewLibrary = () => {

  return (
    <Box>
      <Flex justifyContent={'space-between'} pr={10}>
        <Text fontSize={25} fontWeight='bold' ml={3}>Library</Text>
        <Flex flexDirection={'row'} gap={2} alignItems='center'>
          <Text fontSize={14}>Home</Text><FaAngleRight />
          <Text fontSize={14}>Library</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex boxShadow='md' p={4} w='100%' h='100%' gap={2} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>

          <WrapItem flexDirection={'column'} gap={2} h={'max-content'} flex={2} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Box flexDirection={'column'} boxShadow={'lg'} borderRadius={2} p={4} borderTop='3px solid #ccc' bg={'white'} height='auto' w='90%' h='100%'>
              <Box w={'100%'}>
                <Flex overflowX={'auto'} alignItems='flex-start' justifyContent='flex-start' flexDirection='column'>
          
                  <Flex w={'100%'} p={3} alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={19} fontWeight='bold'>Name</Text>
                    <Text fontSize={19} fontWeight='bold'>Author</Text>
                    <Text fontSize={19} fontWeight='bold'>Publication</Text>
                    <Text fontSize={19} fontWeight='bold'>Subject</Text>
                    <Text fontSize={19} fontWeight='bold'>Class</Text>
                  </Flex>
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>Back House</Text>
                    <Text fontSize={17} fontWeight='bold'>Jack Ma</Text>
                    <Text fontSize={17} fontWeight='bold'>Sample</Text>
                    <Text fontSize={17} fontWeight='bold'>Mathematics</Text>
                    <Text fontSize={17} fontWeight='bold'>P4</Text>
                  </Flex>
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>Back House</Text>
                    <Text fontSize={17} fontWeight='bold'>Jack Ma</Text>
                    <Text fontSize={17} fontWeight='bold'>Sample</Text>
                    <Text fontSize={17} fontWeight='bold'>Mathematics</Text>
                    <Text fontSize={17} fontWeight='bold'>P4</Text>
                  </Flex>
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>Back House</Text>
                    <Text fontSize={17} fontWeight='bold'>Jack Ma</Text>
                    <Text fontSize={17} fontWeight='bold'>Sample</Text>
                    <Text fontSize={17} fontWeight='bold'>Mathematics</Text>
                    <Text fontSize={17} fontWeight='bold'>P4</Text>
                  </Flex>


                </Flex>
              </Box>
            </Box>
          </WrapItem>

          <WrapItem flex={1} gap={6} flexDirection={'column'} h={'max-content'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'column'} boxShadow={'lg'} borderRadius={2} pb={4} borderTop='3px solid #ccc' bg={'white'} height='auto' w='90%' h='100%'>
              <Box w={'100%'}>

                <Flex p={3} bg={'white'} w={'100%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                  <Text fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Class In Numeric</Text>
                  <Select placeholder='Select Class' w={'100%'}>
                    <option value='option1'>P1</option>
                    <option value='option2'>P2</option>
                    <option value='option3'>P3</option>
                    <option value='option3'>P4</option>
                  </Select>
                </Flex>

              </Box>
            </Center>

          </WrapItem>
        </Flex>
      </Box>
    </Box>
  )
}
