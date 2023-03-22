import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ManageClass } from "./manageclass/ManageClass";
import { ViewClass } from "./manageclass/ViewClass";
import { ManageSubject } from "./managesubject/ManageSubject";
import { ManageSyllabus } from "./managesyllabus/ManageSyllabus";

const Class = () => {
  return (
    <Routes>
      <Route path="/manageclass/" element={<ManageClass />} />
      {/* <Route path="/manageclass/:classid" element={<ViewClass />} /> */}
      <Route path="/managesyllabus/" element={<ManageSyllabus />} />
      <Route path="/managesubjects/" element={<ManageSubject />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Class;
