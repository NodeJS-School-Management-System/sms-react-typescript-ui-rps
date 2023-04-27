import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTheme from "../../theme/useTheme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "./axiosInstance";
import NewPassword from "./NewPassword";

const OTPConfirmation = ({ email }: any) => {
  const {
    theme: { primaryColor },
  } = useTheme();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    console.log(email);
  }, []);

  const verifyOTP = async () => {
    const user = {
      email,
      otp,
    };
    setLoading(true);
    try {
      const res = await myAPIClient.post("/otp/confirmotp", user);
      console.log(res.data);
      setOtp("");
      setLoading(false);
      setShowPwd(true);
      toast.success("Success! you can now enter your new password!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, try again!");
      setLoading(false);
    }
  };

  return (
    <Box>
      {!showPwd && (
        <Box>
          <FormControl isRequired id="email">
            <FormLabel>Enter your OTP:</FormLabel>
            <Input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              type="number"
              fontSize={16}
            />
          </FormControl>
          <ToastContainer />
          <Button
            onClick={verifyOTP}
            isDisabled={!otp}
            bgColor={primaryColor.color}
            color="white"
            mt={5}
            w="100%"
          >
            {loading ? "Checking.." : "Verify"}
          </Button>
        </Box>
      )}
      <Box>{showPwd && <NewPassword email={email} />}</Box>
    </Box>
  );
};

export default OTPConfirmation;
