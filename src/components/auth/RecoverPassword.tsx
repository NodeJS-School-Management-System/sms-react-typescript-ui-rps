import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import useTheme from "../../theme/useTheme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "./axiosInstance";
import OTPConfirmation from "./OTPConfirmation";

const RecoverPassword = () => {
  // GLOBAL THEME
  const {
    theme: { primaryColor },
  } = useTheme();

  //   RECOVER PASSWORD BY SENDING EMAIL TO USER WITH OTP
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const generateOTP = () => {
    let otp = "";
    const possible = "0123456789";
    for (let i = 0; i < 6; i++) {
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return otp;
  };

  const onSendPressed = async () => {
    if (email) {
      const user = {
        email,
        otp: generateOTP(),
      };
      setLoading(true);
      try {
        const res = await myAPIClient.post("/otp/sendotp", user);
        setEmail("");
        setLoading(false);
        setTimeout(() => {
          toast.success("Success! OTP has been sent to your registered email!");
          setShowOTP(true);
        }, 2000);
        console.log(res.data);
      } catch (err) {
        toast.error("Something went wrong, try again!");
        setLoading(false);
      }
    } else {
      toast.info(
        "Email is still empty, fill in your registered email to continue!"
      );
    }
  };

  return (
    <Box>
      <Box>
        {!showOTP && (
          <Box>
            <FormControl isRequired id="email">
              <FormLabel>Enter your registered email:</FormLabel>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
                fontSize={13}
              />
            </FormControl>
            <Button
              onClick={onSendPressed}
              isDisabled={!email}
              bgColor={primaryColor.color}
              color="white"
              mt={5}
              w="100%"
            >
              {loading ? "Sending.." : "Recover Password"}
            </Button>
          </Box>
        )}
      </Box>
      <Box>{showOTP && <OTPConfirmation email={email} />}</Box>
    </Box>
  );
};

export default RecoverPassword;
