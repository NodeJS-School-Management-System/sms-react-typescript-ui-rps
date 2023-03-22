import AuthBanner from "../../components/auth/AuthBanner";
import { CustomLogin } from "../../components/auth/CustomeLogin";
import ColorBox from "../../components/box/ColorBox";
import AuthLayout from "../../components/layout/auth-form/AuthLayout";

const Signin = () => {
  return (
    <AuthLayout
      LeftContent={
        <AuthBanner
          bgDark="https://i.ibb.co/n8YcMNb/login-dark.png"
          bgLight="https://i.ibb.co/n8YcMNb/login-light.png"
        />
      }
      RightContent={
        <ColorBox backgroundTheme="foreground">
          <CustomLogin />
        </ColorBox>
      }
    />
  );
};
export default Signin;
