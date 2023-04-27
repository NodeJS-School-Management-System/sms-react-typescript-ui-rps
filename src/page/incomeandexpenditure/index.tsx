import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import ManageExpenditure from "./manageexpenditure/ManageExpenditure";
import ManageIncome from "./manageincome/ManageIncome";
const Library = () => {
  return (
    <Routes>
      <Route path="/manageincome/" element={<ManageIncome />} />
      <Route path="/manageexpenditure/" element={<ManageExpenditure />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Library;
