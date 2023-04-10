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
  NoteAlt,
  LocalLibrary,
  AttachMoney,
  Upcoming,
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

const isAdmin = localStorage.getItem("isAdmin");
const isStudent: any = localStorage.getItem("isStudent");
const isTeacher: any = localStorage.getItem("isTeacher");
const isMember: any = localStorage.getItem("isMember");

console.log(isStudent);

const navList: NavOptions[] = [
  {
    parent: formatGroupButton("Dashboard", <Home />, "/dashboards/"),
    childrens: [
      format("Home", "/dashboards/crm/"),
      // format("Analytics", "/dashboards/analytics/"),
    ],
  },
  {
    parent: formatGroupButton("Student", <School />, "/student/"),
    childrens: [
      format("List", "/student/list/"),
      format("Add", "/student/add/"),
      // format("Profile", "/student/profile/"),
      isStudent && format("Profile", "/student/profile/"),
    ],
  },
  {
    parent: formatGroupButton("Teacher", <GroupAdd />, "/teacher/"),
    childrens: [
      format("List", "/teacher/list/"),
      format("Add", "/teacher/add/"),
      isTeacher && format("Profile", "/teacher/profile/"),
    ],
  },
  {
    parent: formatGroupButton(
      "Non Teaching Staff",
      <Person />,
      "/nonteachingstaff/"
    ),
    childrens: [
      format("List", "/nonteachingstaff/list/"),
      format("Add", "/nonteachingstaff/add/"),
      isMember && format("Profile", "/nonteachingstaff/profile/"),
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
    ],
  },
  {
    parent: formatGroupButton(
      "Exam Routine & Results",
      <NoteAlt />,
      "/examandresult/"
    ),
    childrens: [
      format("Exam Routine", "/examandresult/examroutine/"),
      format("View Result", "/examandresult/viewresult/"),
    ],
  },
  {
    parent: formatGroupButton("Library", <LocalLibrary />, "/library/"),
    childrens: [
      format("Manage", "/library/manage/"),
      format("View", "/library/view/"),
    ],
  },
  {
    parent: formatGroupButton(
      "Accounting Section",
      <AttachMoney />,
      "/accountingsection/"
    ),
    childrens: [
      format("Manage Fees", "/accountingsection/managefees/"),
      format("Fees Payment", "/accountingsection/feespayment/"),
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