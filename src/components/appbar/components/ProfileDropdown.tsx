import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Text } from "../../../ui";
import Box from "../../box/Box";
import {
  ChatBubbleOutline,
  ExitToApp,
  MailOutlineRounded,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import DropdownV2, { DropdownV2Item } from "../../dropdown/DropdownV2";
import useLogout from "../../../hooks/useLogout";

const ProfileDropdown = () => {
  const username = localStorage.getItem("username");
  const student = localStorage.getItem("isStudent");
  const teacher = localStorage.getItem("isTeacher");
  const member = localStorage.getItem("isMember");
  const admin = localStorage.getItem("isAdmin");
  const route = useNavigate();
  const logout = useLogout();
  const pushRoutes = (path: string) => route(path);
  const dropdownItems: DropdownV2Item[] = [
    {
      type: "component",
      content: (
        <Box display="flex" align="center" space={0.6} padding={16}>
          <Avatar
            src={
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683014096~exp=1683014696~hmac=21316efa5253c58a4501926c1c4c466c0e79f8d7704acf5f53030a5fc9fe5239"
            }
            alt="Logged In User"
          />
          <Box>
            <Text varient="body1" weight="bold" paragraph>
              {username}
            </Text>
            <Text varient="caption" weight="medium" secondary>
              {student === "true"
                ? "Student"
                : admin === "true"
                ? "Admin"
                : teacher === "true"
                ? "Teacher"
                : member === "true"
                ? "Member"
                : "N/A"}
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      type: "component",
      content: <Divider />,
    },
    {
      icon: <PersonOutlineOutlined />,
      title: "Profile",
      onClickHandle: () => pushRoutes("/pages/user-profile/profile/"),
    },
    {
      icon: <MailOutlineRounded />,
      title: "Inbox",
      onClickHandle: () => pushRoutes("/apps/email/"),
    },
    {
      icon: <ChatBubbleOutline />,
      title: "Chat",
      onClickHandle: () => pushRoutes("/apps/chat/"),
    },
    {
      type: "component",
      content: <Divider />,
    },
    {
      icon: <SettingsOutlined />,
      title: "Settings",
      onClickHandle: () => pushRoutes("/pages/account-settings/account/"),
    },
    {
      type: "component",
      content: <Divider />,
    },
    {
      icon: <ExitToApp />,
      title: "Logout",
      onClickHandle: logout,
    },
  ];
  return (
    <DropdownV2
      labelContent={
        <Avatar
          src={
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683014096~exp=1683014696~hmac=21316efa5253c58a4501926c1c4c466c0e79f8d7704acf5f53030a5fc9fe5239"
          }
          alt="john doe"
        />
      }
      dropdownList={dropdownItems}
      width="250px"
    />
  );
};

export default ProfileDropdown;
