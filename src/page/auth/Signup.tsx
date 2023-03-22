import AuthBanner from "../../components/auth/AuthBanner";
import { CustomRegister } from "../../components/auth/CustomRegister";
import ColorBox from "../../components/box/ColorBox";
import AuthLayout from "../../components/layout/auth-form/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout
      LeftContent={
        <AuthBanner
          bgDark="https://i.ibb.co/kqMh25P/signup-dark.png"
          bgLight="https://i.ibb.co/cT8K3th/signup-light.png"
        />
      }
      RightContent={
        <ColorBox backgroundTheme="foreground" width="100%">
          <CustomRegister />
        </ColorBox>
      }
    />
  );
};
export default Signup;
