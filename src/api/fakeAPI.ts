import { AllInbox, AttachMoney, CalendarMonth, CalendarViewMonthRounded, Class, FoodBank, LocalLibrary, Note } from "@mui/icons-material";
import { RiUserShared2Fill } from "react-icons/ri";

export const homeAnalyticsRowOne = [
    {
        title: "Total Students",
        value: 34,
        icon: CalendarViewMonthRounded,
        bgColor: "teal"
    },
    {
        title: "Total Teachers",
        value: 3,
        icon: RiUserShared2Fill,
        bgColor: "orange"
    },
    {
        title: "Classes",
        value: 53,
        icon: Class,
        bgColor: "darkblue"
    },
]

export const homeAnalyticsRowTwo = [
    {
        title: "Today's Attendence",
        value: 34,
        icon: CalendarMonth,
        bgColor: "teal"
    },
    {
        title: "Exams",
        value: 3,
        icon: Note,
        bgColor: "orange"
    },
    {
        title: "Study Materials",
        value: 53,
        icon: LocalLibrary,
        bgColor: "darkblue"
    },
    {
        title: "Fees Collected",
        value: 4500000,
        icon: AttachMoney,
        bgColor: "purple"
    },
]

export const storeAnalytics = [
    {
        title: "Food Items",
        value: 34,
        icon: FoodBank,
        bgColor: "teal"
    },
    {
        title: "Library Items",
        value: 3,
        icon: LocalLibrary,
        bgColor: "orange"
    },
    {
        title: "All Items",
        value: 53,
        icon: AllInbox,
        bgColor: "darkblue"
    },
    {
        title: "Total Spent",
        value: 4500000,
        icon: AttachMoney,
        bgColor: "purple"
    },
]