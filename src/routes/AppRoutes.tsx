import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../page/Home";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "../components/loading/PageLoading";
import { UserLogin } from "../components/auth/UserLogin ";
import { CustomLogin } from "../components/auth/CustomeLogin";
import { CustomRegister } from "../components/auth/CustomRegister";
const AppRoutes = () => {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route
        caseSensitive
        path="/auth/register/"
        element={
          <Suspense fallback={<PageLoading />}>
            <CustomRegister />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path="/auth/loginuser/"
        element={
          <Suspense fallback={<PageLoading />}>
            <UserLogin />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path="/auth/login/"
        element={
          <Suspense fallback={<PageLoading />}>
            <CustomLogin />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path={"/*"}
        element={
          token ? (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ) : (
            <Suspense fallback={<PageLoading />}>
              <UserLogin />
            </Suspense>
          )
        }
      />
    </Routes>
  );
};
export default AppRoutes;
