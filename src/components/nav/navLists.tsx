import { ReactNode } from "react";
import { NavItemType } from "./type";
import NavOptions from "./type";

import {
  Home,
  GroupAdd,
  School,
  Class,
  Person,
  Note,
  LocalLibrary,
  AttachMoney,
  Upcoming,
  // Email,
  StoreMallDirectory,
  Payment,
  Email,
} from "@mui/icons-material";

const format = (label: string, path: string, icon?: ReactNode): NavItemType => {
  return icon ? { label, path, icon } : { label, path };
};

const formatGroupButton = (
  title: string,
  icon: ReactNode,
  rootPath: string
) => ({ title, icon, rootPath });

// const isStudent: any = localStorage.getItem("isStudent");
// const isTeacher: any = localStorage.getItem("isTeacher");
// const isMember: any = localStorage.getItem("isMember");

const navList: NavOptions[] = [
  {
    parent: formatGroupButton("Dashboard", <Home />, "/dashboards/"),
    childrens: [
      format("Home", "/dashboards/crm/"),
      format("Departments", "/dashboards/departments/"),
      // format("Analytics", "/dashboards/departments/"),
    ],
  },
  {
    parent: formatGroupButton("Student", <School />, "/student/"),
    childrens: [
      format("List", "/student/list/"),
      format("Add", "/student/add/"),
      // format("Profile", "/student/profile/"),
      // isStudent && format("Profile", "/student/profile/"),
    ],
  },
  {
    parent: formatGroupButton("Teacher", <GroupAdd />, "/teacher/"),
    childrens: [
      format("List", "/teacher/list/"),
      format("Add", "/teacher/add/"),
      // isTeacher && format("Profile", "/teacher/profile/"),
    ],
  },
  {
    parent: formatGroupButton("Member", <Person />, "/nonteachingstaff/"),
    childrens: [
      format("List", "/nonteachingstaff/list/"),
      format("Add", "/nonteachingstaff/add/"),
      // isMember && format("Profile", "/nonteachingstaff/profile/"),
    ],
  },
  {
    parent: formatGroupButton("Classroom", <Class />, "/classroom/"),
    childrens: [
      format("Manage Class", "/classroom/manageclass/"),
      format("Manage Syllabus", "/classroom/managesyllabus/"),
      format("Manage Subjects", "/classroom/managesubjects/"),
    ],
  },
  {
    parent: formatGroupButton("Exam Section", <Note />, "/examsection/"),
    childrens: [
      format("Manage Exam", "/examsection/manageexam/"),
      format("Entry Marks", "/examsection/entrymarks/"),
      format("View Result", "/examsection/viewresult/"),
    ],
  },
  // {
  //   parent: formatGroupButton("Exam Results", <NoteAlt />, "/examandresult/"),
  //   childrens: [
  //     // format("Exam Routine", "/examandresult/examroutine/"),
  //     format("View Result", "/examandresult/viewresult/"),
  //   ],
  // },
  {
    parent: formatGroupButton("Library", <LocalLibrary />, "/library/"),
    childrens: [
      format("Manage Library", "/library/manage/"),
      format("View Library", "/library/view/"),
    ],
  },
  // {
  //   parent: formatGroupButton(
  //     "Income & Expenditure",
  //     <ExpandCircleDownOutlined />,
  //     "/incomeandexpenditure/"
  //   ),
  //   childrens: [
  //     format("Manage Income", "/incomeandexpenditure/manageincome/"),
  //     format("Manage Expenses", "/incomeandexpenditure/manageexpenditure/"),
  //   ],
  // },
  {
    parent: formatGroupButton(
      "Accounting",
      <AttachMoney />,
      "/accountingsection/"
    ),
    childrens: [
      format("Manage Accounts", "/accountingsection/manageaccounts/"),
      // format("Fees Payments", "/accountingsection/feespayment/"),
      // format("Manage Income", "/incomeandexpenditure/manageincome/"),
      // format("Manage Expenses", "/incomeandexpenditure/manageexpenditure/"),
    ],
  },
  {
    parent: formatGroupButton("Pay Fees", <Payment />, "/feespayments/"),
    childrens: [format("Pay Fees", "/feespayments/payfees/")],
  },
  {
    parent: formatGroupButton(
      "Store Manager",
      <StoreMallDirectory />,
      "/storemanager/"
    ),
    childrens: [
      format("Manage Store", "/storemanager/managestore/"),
      // format("View Store Items", "/storemanager/viewstoreitems/"),
    ],
  },
  {
    parent: formatGroupButton("Notice Board", <Upcoming />, "/noticeboard/"),
    childrens: [format("View", "/noticeboard/view/")],
  },
  {
    parent: formatGroupButton("Message", <Email />, "/message/"),
    childrens: [format("View", "/message/view/")],
  },
];
export default navList;
