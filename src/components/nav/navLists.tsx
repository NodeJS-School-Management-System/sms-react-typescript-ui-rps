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

const isStudent: any = localStorage.getItem("isStudent");
const isMember: any = localStorage.getItem("isMember");
const isBursar = localStorage.getItem("isBursar");
const isStoreKeeper = localStorage.getItem("isStoreKeeper");
const isSuperAdmin = localStorage.getItem("isSuperAdmin");
const isLibrarian: any = localStorage.getItem("isLibrarian");

const navList: NavOptions[] = [
  {
    parent:
      isStudent !== "true"
        ? formatGroupButton("Dashboard", <Home />, "/dashboards/")
        : undefined,
    childrens: [
      format("Home", "/dashboards/crm/"),
      format("Departments", "/dashboards/departments/"),
      // format("Analytics", "/dashboards/departments/"),
    ],
  },
  {
    parent: formatGroupButton("Student", <School />, "/student/"),
    childrens:
      isStudent !== "true"
        ? [format("List", "/student/list/"), format("Add", "/student/add/")]
        : [format("List", "/student/list/")],
  },
  {
    parent: formatGroupButton("Teacher", <GroupAdd />, "/teacher/"),
    childrens:
      isStudent !== "true"
        ? [format("List", "/teacher/list/"), format("Add", "/teacher/add/")]
        : [format("List", "/teacher/list/")],
  },
  {
    parent: formatGroupButton("Member", <Person />, "/nonteachingstaff/"),
    childrens:
      isStudent !== "true"
        ? [
            format("List", "/nonteachingstaff/list/"),
            format("Add", "/nonteachingstaff/add/"),
          ]
        : [format("List", "/nonteachingstaff/list/")],
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
    childrens:
      isStudent !== "true" || isMember !== true
        ? [
            format("Manage Exam", "/examsection/manageexam/"),
            format("Entry Marks", "/examsection/entrymarks/"),
            format("View Result", "/examsection/viewresult/"),
          ]
        : [
            format("Manage Exam", "/examsection/manageexam/"),
            format("View Result", "/examsection/viewresult/"),
          ],
  },
  {
    parent: formatGroupButton("Library", <LocalLibrary />, "/library/"),
    childrens:
      isLibrarian === "true" || isSuperAdmin === "true"
        ? [
            format("Manage Library", "/library/manage/"),
            format("View Library", "/library/view/"),
          ]
        : [format("View Library", "/library/view/")],
  },

  {
    parent:
      isBursar === "true" || isSuperAdmin === "true"
        ? formatGroupButton(
            "Accounting",
            <AttachMoney />,
            "/accountingsection/"
          )
        : undefined,
    childrens: [
      format("Manage Accounts", "/accountingsection/manageaccounts/"),
    ],
  },
  {
    parent: formatGroupButton("Pay Fees", <Payment />, "/feespayments/"),
    childrens: [format("Pay Fees", "/feespayments/payfees/")],
  },
  {
    parent:
      isStoreKeeper === "true" || isSuperAdmin === "true"
        ? formatGroupButton(
            "Store Manager",
            <StoreMallDirectory />,
            "/storemanager/"
          )
        : undefined,
    childrens: [
      format("Manage Store", "/storemanager/managestore/"),
      format("View Store", "/storemanager/viewstoreitems/"),
    ],
  },
  {
    parent: formatGroupButton("Notice Board", <Upcoming />, "/noticeboard/"),
    childrens: [format("View", "/noticeboard/view/")],
  },
  {
    parent:
      isStudent !== "true"
        ? formatGroupButton("Message", <Email />, "/message/")
        : undefined,
    childrens: [format("View", "/message/view/")],
  },
];
export default navList;
