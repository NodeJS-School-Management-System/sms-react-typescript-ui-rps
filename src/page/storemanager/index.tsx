import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import ManageStore from "./managestore/ManageStore";
import { ViewStore } from "./view/ViewStore";
const StoreManager = () => {
  return (
    <Routes>
      <Route path="/managestore/" element={<ManageStore />} />
      <Route path="/viewstoreitems/" element={<ViewStore />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default StoreManager;
