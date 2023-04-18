import { Routes, Route } from "react-router-dom";
import { NTStaffMembers } from "./list/NTStaffMembers";
import PageNotFound from "../404/PageNotFound";
import { AddNTStaff } from "./add/AddNTStaff";
const NTStaffMember = () => {
  return (
    <Routes>
      <Route path="/list/" element={<NTStaffMembers />} />
      <Route path="/add/" element={<AddNTStaff />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default NTStaffMember;
