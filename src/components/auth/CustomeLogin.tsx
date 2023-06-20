import { myAPIClient } from "./axiosInstance";
import LoginImage from "../../assets/loginimg.png";
import LogoImage from "../../assets/logo.png";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  InputRightElement,
  CircularProgress,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useTheme from "../../theme/useTheme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

export function CustomLogin() {
  // GLOBAL THEME
  const {
    theme: { primaryColor },
  } = useTheme();

  // const PF = MongoAPIClient;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Login Admin *****************************************************************
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    setIsLoading(true);
    try {
      const res = await myAPIClient.post("/auth/login", user);
      console.log(res.data);

      if (res.data.user.isAdmin === true) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        localStorage.setItem("id", res.data.user.userId);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("firstname", res.data.user.firstname);
        localStorage.setItem("lastname", res.data.user.lastname);
        localStorage.setItem("email", res.data.user.email);
        toast.success("Login Successful, redirecting...");
        setIsLoading(false);
        setUsername("");
        setPassword("");
        setTimeout(() => {
          navigate("/dashboards/crm/");
          window.location.reload();
        }, 3000);
        // try {
        //   const res = await axios.post(`${PF}staff/loginstaff`, user);
        //   console.log(res.data);
        //   res.data && localStorage.setItem("_id", res.data.staff?._id);
        // toast.success("Success, redirecting...");
        // setIsLoading(false);
        // setUsername("");
        // setPassword("");
        // setTimeout(() => {
        //   navigate("/dashboards/crm/");
        //   window.location.reload();
        // }, 3000);
        // } catch (err) {
        //   console.log(err);
        //   toast.error("Error, something went wrong, try again!");
        //   setIsLoading(false);
        // }
      } else {
        toast.error("Youre not authorised to login from here!");
        console.log(res.data.user?.isAdmin);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, something went wrong, try again!");
      setIsLoading(false);
    }
  };

  // ***************************************************************************

  const [isHoveringPassword, setIsHoveringPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse Over create account
  const handleMouseOver = () => {
    setIsHovering(true);
    // Other logic to handle mouse over event
  };

  // Mouse out create account
  const handleMouseOut = () => {
    setIsHovering(false);
    // Other logic to handle mouse out event
  };

  // Mouse Over password
  const handleMouseOverPassword = () => {
    setIsHoveringPassword(true);
    // Other logic to handle mouse over event
  };

  // Mouse out password
  const handleMouseOutPassword = () => {
    setIsHoveringPassword(false);
    // Other logic to handle mouse out event
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        flexDir={"column"}
        p={{ sm: 1, lg: 6 }}
        justify="center"
        flex={1}
        align={"center"}
      >
        <Stack p={8} spacing={4} w={"full"} maxW={"md"}>
          <Image
            src={LogoImage}
            style={{ width: "100px", margin: "auto", marginLeft: "10px" }}
          />
          <Heading overflowY={"hidden"} fontSize={{ base: "2xl", lg: "3xl" }}>
            Sign in to Your Account{" "}
          </Heading>
          <span style={{ fontSize: 12 }}>***admin***</span>

          <Link to="/auth/register">
            or{" "}
            <span
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ color: isHovering ? primaryColor.color : "gray" }}
            >
              Create an Account
            </span>
          </Link>

          <FormControl isRequired id="email">
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              type="text"
            />
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
              fontSize={{ base: 13, md: 15, lg: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
              <Link
                to="/"
                color={"blue.500"}
                onMouseOver={handleMouseOverPassword}
                onMouseOut={handleMouseOutPassword}
                style={{
                  color: isHoveringPassword ? primaryColor.color : "gray",
                }}
              >
                Forgot password?
              </Link>
              <ToastContainer />
            </Stack>
            <Button
              _hover={{ opacity: 0.7 }}
              bgColor={primaryColor.color}
              color={"white"}
              onClick={handleSubmit}
              isDisabled={!username || !password}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate color="teal" size="24px" />
              ) : (
                " Sign In"
              )}
            </Button>
          </Stack>
        </Stack>
        <Flex
          px={{ base: 6, lg: 1 }}
          justify={"space-around"}
          align="center"
          gap={3}
        >
          <Box fontSize={{ base: 8, md: 10, lg: 12 }}>
            {" "}
            © {new Date().getFullYear()} Rwebitaps
          </Box>
          <Box fontSize={12} _hover={{ color: primaryColor }}>
            <Link to="/">Terms of Service</Link>
          </Box>
          <Box fontSize={12} _hover={{ color: primaryColor }}>
            <Link to="/">Privacy Policy</Link>
          </Box>
        </Flex>
      </Flex>

      <Flex display={{ base: "none", md: "flex" }} flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={LoginImage}
          // src={
          //   "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          // }
        />
      </Flex>
    </Stack>
  );
}
