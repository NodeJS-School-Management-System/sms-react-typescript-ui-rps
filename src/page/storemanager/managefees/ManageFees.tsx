import { Box, Text, Center, Flex, WrapItem, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const ManageFees = () => {

  const token = localStorage.getItem('token')

  const [accountType, setAccountType] = useState('')

  const addAccountType = async () => {
    const res = await myAPIClient.post('/accounttype', {accountType}, {
      headers: {
        token: `Bearer ${token}`
      }
    })
    console.log(res.data)
  }

  useEffect(() => {
    const getAccountTypes = async () => {
      try {
        const res = await myAPIClient.get('/accounttype', {
          headers: {
            token: `Bearer ${token}`
          }
        })
        console.log(res.data);
        
      } catch(err) {
        console.log(err);
      }
    }
    getAccountTypes()

  }, [])

  return (
    <Box>
      <Flex justifyContent={'space-between'} pr={10}>
        <Text fontSize={25} fontWeight='bold' ml={3}>Manage Accounting</Text>
        <Flex flexDirection={'row'} gap={2} alignItems='center'>
          <Text color={'black'} fontWeight={'bold'} fontSize={14}><Link to='/'>Home</Link></Text><FaAngleRight />
          <Text fontSize={14}>Account</Text><FaAngleRight />
          <Text fontSize={14}>Manage Accounting</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex boxShadow='md' p={4} w='100%' h='100%' gap={2} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>

          <WrapItem flex={1} gap={6} flexDirection={'column'} h={'max-content'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'column'} boxShadow={'lg'} borderRadius={2} pb={4} borderTop='3px solid #ccc' bg={'white'} height='auto' w='90%' h='100%'>
              <Flex alignItems='center' bg='blue' w='100%' justifyContent='center' flexDirection='column'>
                <Box>
                  <Text p={2} color='white' textAlign='center' fontSize={22} fontWeight='bold'>Add Account Type</Text>
                </Box>
              </Flex>
              <Box w={'100%'}>

                <Flex p={3} bg={'white'} w={'100%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                  <Text fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Account Type</Text>
                 <Input 
                  placeholder="Account Type" 
                  value={accountType} 
                  onChange={e=>setAccountType(e.target.value)} 
                  w='100%' 
                 />
                </Flex>
              

                <Button variant={'solid'} w='50%' mx={3} colorScheme={'teal'}
                onClick={addAccountType}
                disabled={!accountType}
                >Add</Button>
              </Box>
            </Center>
          </WrapItem>

          <WrapItem flexDirection={'column'} gap={2} h={'max-content'} flex={1} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Box flexDirection={'column'} boxShadow={'lg'} borderRadius={2} p={4} borderTop='3px solid #ccc' bg={'white'} height='auto' w='90%' h='100%'>
              <Box w={'100%'}>
                <Flex overflowX={'auto'} alignItems='flex-start' justifyContent='flex-start' flexDirection='column'>
                  <Box>
                    <Box>
                      <Text p={2} fontSize={22} textAlign='center' fontWeight='bold'>Account Types</Text>
                    </Box>
                  </Box>

                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={19} fontWeight='bold'>Type ID</Text>
                    <Text fontSize={19} fontWeight='bold'>Name</Text>
                  </Flex>
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>1</Text>
                    <Text fontSize={17} fontWeight='bold'>Admission</Text>
                  </Flex>
               
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>2</Text>
                    <Text fontSize={17} fontWeight='bold'>Monthly</Text>
                  </Flex>
               
                  <Flex w={'100%'} p={3} borderTop='1px solid #ccc' alignItems='center' justifyContent='space-between' flexDirection='row'>
                    <Text fontSize={17} fontWeight='bold'>3</Text>
                    <Text fontSize={17} fontWeight='bold'>Examination</Text>
                  </Flex>
               

                </Flex>
              </Box>
            </Box>
          </WrapItem>
        </Flex>
      </Box>
    </Box>
  )
}
