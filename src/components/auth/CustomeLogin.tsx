import {
  Box,
  Heading,
  FormControl,
  InputRightElement,
  FormHelperText,
  chakra,
  FormLabel,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MongoAPIClient, myAPIClient } from "./axiosInstance";
import axios from "axios";
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify/dist/components";

// Configure react-toastify
// toast.configure();

export const CustomLogin = () => {
  const PF = MongoAPIClient;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  // Login Admin *****************************************************************
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // toast.success("Wow so easy !");
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      const res = await myAPIClient.post("/auth/login", user);
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);
      localStorage.setItem("id", res.data.user.userId);
      localStorage.setItem("username", res.data.user.username);
      setUsername("");
      setPassword("");
      // Also interact with mongo ***************************************************
      try {
        const res = await axios.post(`${PF}staff/loginstaff`, user);
        console.log(res.data);
        res.data && localStorage.setItem("_id", res.data.staff._id);

        toast.success("Success, redirecting...");
        setTimeout(() => {
          navigate("/dashboards/crm/");
          window.location.reload();
        }, 4000);
      } catch (err) {
        console.log(err);
        toast.error("Error, something went wron, try again!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, something went wron, try again!");
    }
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
          <Heading color="teal">Welcome Back!</Heading>
        </Box>
        <Box my={3}>
          <form style={{ color: "white" }}>
            {/* {error instanceof Error && (
              <ErrorMessage
                message={
                  (axios.isAxiosError(error) && error.response?.data) ||
                  error.message
                }
              />
            )} */}
            <FormControl alignItems={"center"}>
              <FormLabel>Username</FormLabel>
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
              <FormLabel>Password</FormLabel>
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
                    <InputLeftElement children={<CFaEyeSlash />} />
                  ) : (
                    <InputLeftElement children={<CFaEye />} />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right">
                <Link to="/">Forgot Password?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              disabled={!username || !password}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
              variant="outline"
              width="full"
              mt={4}
            >
              <ToastContainer />
              {/* {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : ( */}
              Sign In
              {/* )} */}
            </Button>
          </form>
        </Box>
        <Box textAlign={"center"}>
          Don't have an account?{" "}
          <Link to="/auth/register" color="teal.500">
            Sign Up
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
