import { Routes, Route } from "react-router-dom";
// import { Members } from "../../components/nonteachingstaff/list/Members";
import { NTStaffMembers } from "./list/NTStaffMembers";
import { Profile } from "./profile/Profile";
import PageNotFound from "../404/PageNotFound";
import { AddNTStaff } from "./add/AddNTStaff";
const NTStaffMember = () => {
  return (
    <Routes>
      <Route path="/list/" element={<NTStaffMembers />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/add/" element={<AddNTStaff />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default NTStaffMember;
