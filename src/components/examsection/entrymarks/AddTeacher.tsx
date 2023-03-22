import { Box, Text, Center, Flex, Heading, Input, WrapItem, InputGroup, InputLeftElement, FormLabel, Button } from "@chakra-ui/react";
import { ClassOutlined, DateRange, Home, HomeOutlined, Person, Person2Outlined, PersonOutline, PersonOutlineOutlined, Phone, PhoneOutlined, SchoolOutlined, SubjectOutlined, VerifiedUserOutlined, ViewStreamOutlined, WcOutlined } from '@mui/icons-material'

export const AddTeacher = () => {
  return (
    <Box>
      <Box w={'100%'} display={'flex'} alignItems={'center'} h={70} p={5} my={3}>
        <Heading as={'h5'}>Teacher Registration</Heading>
        <Text>SMS</Text>
      </Box>
      <Flex boxShadow='md' p={4} w='100%' h='100%' gap={3} flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
        <WrapItem flex={1} gap={2} flexDirection={'column'} w={{ base: '100%', md: '50%', lg: '50%' }}>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>First Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<PersonOutlineOutlined />} />
              <Input
                isRequired
                type="text" placeholder="First Name" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Last Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<PersonOutline />} />
              <Input
                isRequired
                type="text" placeholder="Last Name" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Username</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<Person />} />
              <Input
                isRequired
                type="text" placeholder="Username" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Date of Birth</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<DateRange />} />
              <Input
                isRequired
                type="text" placeholder="Date of Birth" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Address</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<Home />} />
              <Input
                isRequired
                type="text" placeholder="Address" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Contact</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<Phone />} />
              <Input
                isRequired
                type="text" placeholder="Phone" />
            </InputGroup>
          </Center>

          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Gender</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<WcOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Gender" />
            </InputGroup>
          </Center>

        </WrapItem>

        <WrapItem flexDirection={'column'} gap={2} flex={1} w={{ base: '100%', md: '50%', lg: '50%' }}>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Class</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<ClassOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Class" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Stream</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<ViewStreamOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Stream" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Education Level</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<SchoolOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Education Level" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Marital Status</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<PhoneOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Marital Status" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Class</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<ClassOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Class" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Subject</FormLabel>
            <InputGroup>
              <InputLeftElement
                cursor={"pointer"} pointerEvents="none" color="gray.400" width="2.5rem" children={<SubjectOutlined />} />
              <Input
                isRequired
                type="text" placeholder="Subject" />
            </InputGroup>
          </Center>
          <Center flexDirection={'column'} w='90%' h='100%'>
            <FormLabel alignSelf={'flex-start'}>Profile Image</FormLabel>
            <Input
              border={'none'}
              isRequired
              type="file" />
          </Center>
          <Button variant={'solid'} colorScheme='facebook' px={20} py={4}>Add Teacher</Button>
        </WrapItem>
      </Flex>
    </Box>
  )
}
