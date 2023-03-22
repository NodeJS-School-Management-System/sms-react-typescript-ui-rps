import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { ManageLibrary } from "./manage/ManageLibrary";
import { ViewLibrary } from "./view/ViewLibrary";
const Library = () => {

  return (
    <Routes>
      <Route path="/manage/" element={<ManageLibrary />} />
      <Route path="/view/" element={<ViewLibrary />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Library;
