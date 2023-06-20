import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ViewResult } from "../examandresult/viewresult/ViewResult";
import { EntryMarks } from "./entrymarks/EntryMarks";
import { ManageExam } from "./manageexam/ManageExam";
const ExamSection = () => {
  return (
    <Routes>
      <Route path="/manageexam/" element={<ManageExam />} />
      <Route path="/entrymarks/" element={<EntryMarks />} />
      <Route path="/viewresult/" element={<ViewResult />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default ExamSection;
