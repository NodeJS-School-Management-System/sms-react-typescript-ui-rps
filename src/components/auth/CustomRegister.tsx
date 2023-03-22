import {
  Box,
  Heading,
  FormControl,
  InputRightElement,
  chakra,
  FormLabel,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MongoAPIClient, myAPIClient } from "./axiosInstance";
import axios from "axios";

const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);

export const CustomRegister = () => {
  const PF = MongoAPIClient;

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      username,
      password,
      email,
    };
    try {
      const res = await myAPIClient.post("auth/register", user);
      console.log(res.data);

      // Also interact with mongo ***************************************************
      try {
        const res = await axios.post(`${PF}staff/registerstaff`, {
          firstname: "Admin",
          lastname: "Admin",
          email,
          username,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }

      setEmail("");
      setPassword("");
      setUsername("");

      navigate("/auth/login/");
    } catch (err) {
      console.log(err);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box
        my={3}
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow={"lg"}
        textAlign={"left"}
      >
        <Box textAlign={"center"}>
          <Heading color="teal">Register</Heading>
        </Box>
        <Box my={3}>
          <form style={{ color: "white" }}>
            {/* {error instanceof Error && (
              <ErrorMessage
                message={
                  (axios.isAxiosError(error) && error.response?.data) ||
                  error.message
                }
              /> */}
            {/* )} */}
            <FormControl alignItems={"center"}>
              <FormLabel color={"black"}>Email</FormLabel>
              <InputGroup alignItems={"center"}>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<FaUserAlt color="gray.300" />}
                />
                <Input
                  isRequired
                  value={email}
                  color={"black"}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"email"}
                  placeholder="example@gmail.com"
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5} alignItems={"center"}>
              <FormLabel color={"black"}>Username</FormLabel>
              <InputGroup alignItems={"center"}>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<FaUserAlt color="gray.300" />}
                />
                <Input
                  isRequired
                  value={username}
                  color={"black"}
                  onChange={(e) => setUsername(e.target.value)}
                  type={"email"}
                  placeholder="example"
                />
              </InputGroup>
            </FormControl>
            <FormControl alignItems={"center"} mt={5}>
              <FormLabel color={"black"}>Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                  color={"black"}
                  type={togglePassword ? "text" : "password"}
                  placeholder="********"
                />
                <InputRightElement
                  onClick={handleTogglePassword}
                  cursor={"pointer"}
                  width="2.5rem"
                >
                  {togglePassword ? (
                    <InputLeftElement
                      color={"black"}
                      children={<CFaEyeSlash color={"black"} />}
                    />
                  ) : (
                    <InputLeftElement children={<CFaEye />} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              disabled={!username || !password || !email}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
              variant="outline"
              width="full"
              mt={4}
            >
              {/* {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : ( */}
              Sign Up
              {/* )} */}
            </Button>
          </form>
        </Box>
        <Box display={"flex"} gap={"3"} textAlign={"center"}>
          Already have an account?
          <Link to="/auth/login">
            <Text color="teal.500">Sign In</Text>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
