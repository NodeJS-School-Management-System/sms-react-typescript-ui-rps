import { Box, Text, Center, Flex, WrapItem, Button, Input, FormLabel, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { myAPIClient } from "../../../components/auth/axiosInstance";

export const ViewNoticeBoard = () => {

  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")

  // const [notices, setNotices] = useState();
  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await myAPIClient.get('/noticeboard', {
          headers: {
            token: `Bearer ${token}`
          }
        })
        // setNotices(res.data)
        console.log(res.data);
             
      } catch (err){
        console.log(err);
        
      }
    }
    getNotices()
  }, [])

  const addNotice = async () => {
    try {
      await myAPIClient.post("/noticeboard", {title, info, username}, {
        headers: {
          token: `Bearer ${token}`
        }
      })
      setTitle('')
      setInfo('')
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <Box>
      <Flex justifyContent={'space-between'} pr={10}>
        <Text fontSize={25} fontWeight='bold' ml={3}>Noticeboard</Text>
        <Flex flexDirection={'row'} gap={2} alignItems='center'>
          <Text fontSize={14}>Home</Text><FaAngleRight />
          <Text fontSize={14}>Notice Board</Text>
        </Flex>
      </Flex>

      <Box>
        <Flex boxShadow='md' p={4} w='100%' h='100%' gap={2} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>

          <WrapItem flex={1} gap={6} flexDirection={'column'} h={'max-content'} w={{ base: '100%', md: '50%', lg: '50%' }}>
            <Center flexDirection={'column'} boxShadow={'lg'} borderRadius={2} pb={4} borderTop='3px solid #ccc' bg={'white'} height='auto' w='90%' h='100%'>

              <Box w={'100%'}>
                <Flex p={3} bg={'white'} w={'100%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                  <FormLabel fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Title</FormLabel>
                  <Input type='text' placeholder="Subject" value={title} onChange={e=>setTitle(e.target.value)} />
                </Flex>
                <Flex p={3} bg={'white'} w={'100%'} h={'100%'} flexDirection='column' alignItems={'center'} justifyContent={'center'}>
                  <FormLabel fontSize={20} fontWeight='bold' alignSelf={'flex-start'} color={'gray'} mb={3}>Body</FormLabel>
                  <Textarea placeholder="Body" onChange={e=>setInfo(e.target.value)} value={info}></Textarea>
                </Flex>
                
                <Button disabled={!title || !info} variant={'solid'} w='50%' mx={3} onClick={addNotice} colorScheme={'teal'}>Add</Button>
              </Box>
            </Center>

          </WrapItem>


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
        </Flex>
      </Box>
    </Box>
  )
}