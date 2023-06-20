import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ExamRoutine } from "./examroutine/ExamRoutine";
import { ViewResult } from "./viewresult/ViewResult";
const ExamAndResult = () => {
  return (
    <Routes>
      <Route path="/examroutine/" element={<ExamRoutine />} />
      <Route path="/viewresult/" element={<ViewResult />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default ExamAndResult;
