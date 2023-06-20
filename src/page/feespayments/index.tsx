import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { PayFees } from "../feespayments/payfees/PayFees";
const AccountingSection = () => {
  return (
    <Routes>
      <Route path="/payfees/" element={<PayFees />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AccountingSection;
