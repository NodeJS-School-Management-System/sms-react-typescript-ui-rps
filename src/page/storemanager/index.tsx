import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import ManageStore from "./managestore/ManageStore";
const StoreManager = () => {
  return (
    <Routes>
      <Route path="/managestore/" element={<ManageStore />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default StoreManager;
