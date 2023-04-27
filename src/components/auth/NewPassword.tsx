import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTheme from "../../theme/useTheme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "./axiosInstance";

const NewPassword = ({ email }: any) => {
  useEffect(() => {
    console.log(email);
  }, []);

  const {
    theme: { primaryColor },
  } = useTheme();

  const [newPassword, setNewPassword] = useState("");
  const [confirmnewPassword, setconfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);

    if (newPassword === newPassword) {
      try {
        const res = await myAPIClient.put("/otp/updatepassword", {
          password: newPassword,
          email,
        });
        console.log(res.data);
        setLoading(false);
        toast.success("Success, password has been updated!");
        window.location.reload();
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong, try again");
      }
    } else {
      setLoading(false);
      toast.info("Passwords didnt match, try again!");
    }
  };

  return (
    <Box>
      <FormControl isRequired id="email">
        <FormLabel>Enter new password:</FormLabel>
        <Input
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          placeholder="New password"
          fontSize={16}
        />
      </FormControl>

      <FormControl mt={4} isRequired id="email">
        <FormLabel>Confirm new passswordP:</FormLabel>
        <Input
          value={confirmnewPassword}
          onChange={(e) => {
            setconfirmNewPassword(e.target.value);
          }}
          placeholder="Confirm password"
          type="number"
          fontSize={16}
        />
      </FormControl>

      <ToastContainer />
      <Button
        onClick={resetPassword}
        isDisabled={!newPassword || !confirmnewPassword}
        bgColor={primaryColor.color}
        color="white"
        mt={5}
        w="100%"
      >
        {loading ? "Updating.." : "Update"}
      </Button>
    </Box>
  );
};

export default NewPassword;
