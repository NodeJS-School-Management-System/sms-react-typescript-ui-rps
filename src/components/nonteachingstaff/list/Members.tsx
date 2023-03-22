import { Box, Text, Center, Flex, Heading, WrapItem, Select, Input } from "@chakra-ui/react";
import { Diversity3, Home } from "@mui/icons-material";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { ImUsers, ImMan, ImWoman } from "react-icons/im";
import { MdClass } from "react-icons/md";
import { Link } from "react-router-dom";
import { NTStaffList } from "./NTStaffList";
import useTheme from "../../../theme/useTheme";

export const Members = () => {

  const {
    theme: { primaryColor }
  } = useTheme();

  return (
    <>

      <Box>
        <Flex w={'100%'} display={'flex'} alignItems={'center'} justify='space-between' h={70} p={5} my={3}>
          <Box display={'flex'}>
            <Heading as={'h5'} color={primaryColor.color}>Non Teaching Staff</Heading>
            <Text>SMS</Text>
          </Box>
          <Box display={'flex'} alignItems='center' gap={2}>
            <Home /><Link to='/'><Text fontWeight='bold' fontSize={14}>Home</Text></Link><FaAngleRight />
            <Diversity3 /><Text fontWeight='bold' fontSize={14}>Non Teaching Staff</Text>
          </Box>
        </Flex>
        <Flex boxShadow='base' p={4} w='100%' h='100%' gap={3} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
          <WrapItem boxShadow={'base'} flex={1} gap={2} borderRadius={4} flexDirection={'column'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'row'} w='100%' h='100%' boxShadow={'base'}>
              <Flex bgColor={'#2e5984'} color={'white'} w={'30%'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                <FaPlay size={'3em'} />
              </Flex>
              <Flex p={3} w={'70%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                <Text fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Running Session</Text>
                <Select placeholder='(2022 - 2023)' size={'lg'}>
                  <option value='option1'>(2022 - 2023)</option>
                  <option value='option2'>(2021 - 2022)</option>
                  <option value='option3'>(2020 - 2021)</option>
                </Select>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem boxShadow={'base'} flex={1} gap={2} flexDirection={'column'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'row'} w='100%' h='100%' boxShadow={'base'}>
              <Flex bgColor={'teal'} w={'30%'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                <ImMan size={'3em'} color='white' />
              </Flex>
              <Flex p={3} w={'70%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                <Text fontSize={20} fontWeight='bold' color={'gray'} mb={3}>Male</Text>
                <Heading as='h2'>29</Heading>
              </Flex>
            </Center>
          </WrapItem>

          <WrapItem boxShadow={'base'} flex={1} gap={2} flexDirection={'column'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'row'} w='100%' h='100%' boxShadow={'base'}>
              <Flex bgColor={'#2e5984'} w={'30%'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                <ImWoman size={'3em'} color='white' />
              </Flex>
              <Flex p={3} w={'70%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                <Text fontSize={20} fontWeight='bold' color={'gray'} mb={3}>Female</Text>
                <Heading as='h2'>19</Heading>
              </Flex>
            </Center>
          </WrapItem>
          <WrapItem boxShadow={'base'} flex={1} gap={2} flexDirection={'column'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'row'} w='100%' h='100%' boxShadow={'base'}>
              <Flex bgColor={'teal'} w={'30%'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                <ImUsers size={'3em'} color='white' />
              </Flex>
              <Flex p={3} w={'70%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                <Text fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Total Members</Text>
                <Heading as='h2'>19</Heading>
              </Flex>
            </Center>
          </WrapItem>
        </Flex>
      </Box>

      <Box>
        <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent='space-between' h={70} p={5} pl={0} my={3}>
          <Flex mt={5} pt={5} align={'center'} justify='center' direction={'column'}>
            <Text fontSize={25} mt={4} fontWeight={'bold'} color={primaryColor.color}>List of Non Teaching Staff Members</Text>
            <Flex p={3} px={0} h={'100%'} direction='row' align={'center'} justify={'space-between'}>
              <Flex mb={2} p={3} px={0} w={'max-content'} h={'100%'} direction='row' align={'center'} justify={'flex-start'}>
                <Text ml={2} fontSize={17} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Show</Text>
                <Select mx={2} mb={4} placeholder='10' size={'sm'}>
                  <option value='option2'>50</option>
                  <option value='option3'>100</option>
                  <option value='option3'>500</option>
                </Select>
                <Text fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>entries</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box display='flex' alignItems={'center'} gap={2} justifyContent={'flex-end'}>
            <Text>Search</Text><Input type='search' placeholder="Search.." />
          </Box>
        </Box>
        <Flex boxShadow='base' p={4} w='100%' h='100%' gap={3} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
          <NTStaffList />
        </Flex>
      </Box>
    </>
  )
}
