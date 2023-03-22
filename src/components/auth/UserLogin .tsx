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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);

export const UserLogin = () => {
  const PF = MongoAPIClient;

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    console.log(user);

    try {
      const res = await myAPIClient.post("/auth/loginuser", user);
      console.log(res.data);

      // Also interact with mongo ***************************************************
      try {
        const res = await axios.post(`${PF}staff/loginstaff`, user);
        console.log(res.data);
        res.data && localStorage.setItem("_id", res.data.staff._id);
      } catch (err) {
        console.log(err);
        // toast.error("Error, something went wron, try again!");
      }

      // teacher
      res.data?.user?.isTeacher &&
        localStorage.setItem("isTeacher", res.data.user.isTeacher);
      res.data?.user?.isTeacher &&
        localStorage.setItem("teacherId", res.data.user.teacherId);

      // student
      res.data?.user?.isStudent &&
        localStorage.setItem("isStudent", res.data.user.isStudent);
      res.data?.user?.studentId &&
        localStorage.setItem("studentId", res.data.user.studentId);

      // non teaching staff
      res.data?.user?.isNonteachingstaff &&
        localStorage.setItem(
          "isNonteachingstaff",
          res.data.user.isNonteachingstaff
        );
      res.data?.user?.nonteachingstaffId &&
        localStorage.setItem(
          "nonteachingstaffId",
          res.data.user.nonteachingstaffId
        );

      // Both
      res.data && localStorage.setItem("username", res.data?.user?.username);
      localStorage.setItem("token", res.data.token);

      setUsername("");
      setPassword("");

      // Call toast for a success alert*********************************
      toast.success("Success, redirecting...");
      setTimeout(() => {
        navigate("/dashboards/crm/");
        window.location.reload();
      }, 4000);
    } catch (err) {
      console.log(err);
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
                  type={"text"}
                  placeholder="Enter Username"
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
              {/* <ToastContainer /> */}
              {/* {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : ( */}
              Sign In
              {/* )} */}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
