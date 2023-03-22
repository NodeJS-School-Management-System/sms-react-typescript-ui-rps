import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ViewMessage } from "./view/ViewMessage";
const ExamAndResult = () => {

  return (
    <Routes>
      <Route path="/view/" element={<ViewMessage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default ExamAndResult;
