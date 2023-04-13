import { Routes, Route } from "react-router-dom";
// import { Profile } from "../../components/student/profile/Profile";
import PageNotFound from "../404/PageNotFound";
import { AddStudent } from "./add/AddStudent";
import { Students } from "./list/Students";
const Student = () => {
  return (
    <Routes>
      <Route path="/list/" element={<Students />} />
      {/* <Route path="/profile/" element={<Profile />} /> */}
      <Route path="/add/" element={<AddStudent />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Student;
