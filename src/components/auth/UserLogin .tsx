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
import RecoverPassword from "./RecoverPassword";

export function UserLogin() {
  // GLOBAL THEME
  const {
    theme: { primaryColor },
  } = useTheme();

  // const PF = MongoAPIClient;

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN USER ***************************************************************
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    setIsLoading(true);

    try {
      const res = await myAPIClient.post("/auth/loginuser", user);
      console.log(res?.data);

      // teacher
      res?.data?.user?.isTeacher &&
        localStorage.setItem("isTeacher", res?.data?.user?.isTeacher);
      res?.data?.user?.isTeacher &&
        localStorage.setItem("id", res?.data?.user?._id);

      // student
      res?.data?.user?.isStudent &&
        localStorage.setItem("isStudent", res?.data?.user?.isStudent);
      res?.data?.user?.isStudent &&
        localStorage.setItem("id", res?.data?.user?._id);

      // non teaching staff
      res?.data?.user?.isMember &&
        localStorage.setItem("isMember", res?.data?.user?.isMember);
      res?.data?.user?.isMember &&
        localStorage.setItem("id", res?.data?.user?._id);

      // HANDLE OTHER MEMBER PREVILAGES HERE
      res?.data?.user?.isMember &&
        localStorage.setItem("isBursar", res?.data?.user?.isBursar);
      res?.data?.user?.isMember &&
        localStorage.setItem("isLibrarian", res?.data?.user?.isLibrarian);
      res?.data?.user?.isMember &&
        localStorage.setItem("isStoreKeeper", res?.data?.user?.isStoreKeeper);

      // Both
      res?.data && localStorage.setItem("username", res?.data?.user?.username);
      res?.data?.user?.isMember ||
        (res?.data?.user?.isTeacher &&
          localStorage.setItem("isAdmin", res?.data?.user?.isAdmin));
      res?.data && localStorage.setItem("token", res?.data?.token);

      // Call toast for a success alert*********************************
      setIsLoading(false);
      setUsername("");
      setPassword("");
      toast.success("Login successful, redirecting...");
      setTimeout(() => {
        res?.data?.user?.isBursar
          ? navigate("/accountingsection/manageaccounts/")
          : res?.data?.user?.isStudent
          ? navigate("/student/list/")
          : res?.data?.user?.isBursar
          ? navigate("/library/manage/")
          : res?.data?.user?.isStoreKeeper
          ? navigate("/storemanager/managestore/")
          : navigate("/dashboards/crm/");
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // ***************************************************************************

  const [isHoveringPassword, setIsHoveringPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRecoverPwd, setShowRecoverPwd] = useState(false);

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
      <>
        {!showRecoverPwd && (
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
              <Heading
                overflowY={"hidden"}
                fontSize={{ base: "2xl", lg: "3xl" }}
              >
                Sign in to Your Account
              </Heading>
              <span style={{ fontSize: 12 }}>
                ***teacher, student or non teaching staff***
              </span>

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
                  <Box
                    cursor={"pointer"}
                    color={"blue.500"}
                    onMouseOver={handleMouseOverPassword}
                    onMouseOut={handleMouseOutPassword}
                    onClick={() => setShowRecoverPwd(true)}
                    style={{
                      color: isHoveringPassword ? primaryColor.color : "gray",
                    }}
                  >
                    Forgot password?
                  </Box>
                  <ToastContainer />
                </Stack>
                <Button
                  _hover={{ color: "white", opacity: 0.7 }}
                  bgColor={primaryColor.color}
                  color={"white"}
                  isDisabled={!username || !password}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="white"
                    />
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
        )}

        {showRecoverPwd && (
          <Flex
            flexDir={"column"}
            p={{ sm: 1, lg: 6 }}
            justify="center"
            flex={1}
            align={"center"}
          >
            <RecoverPassword />
          </Flex>
        )}
      </>

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
