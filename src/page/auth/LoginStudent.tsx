import AuthBanner from "../../components/auth/AuthBanner";
import { StudentLogin } from "../../components/auth/StudentLogin";
import ColorBox from "../../components/box/ColorBox";
import AuthLayout from "../../components/layout/auth-form/AuthLayout";

const LoginStudent = () => {
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
          <StudentLogin />
        </ColorBox>
      }
    />
  );
};

export default LoginStudent;
