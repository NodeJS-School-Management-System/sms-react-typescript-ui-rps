import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ViewNoticeBoard } from "./view/ViewNoticeBoard";
const NoticeBoard = () => {

  return (
    <Routes>
      <Route path="/view/" element={<ViewNoticeBoard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default NoticeBoard;
