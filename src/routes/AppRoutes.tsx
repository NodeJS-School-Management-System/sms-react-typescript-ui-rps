import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// const Signin = lazy(() => import("../page/auth/Signin"));
const Signup = lazy(() => import("../page/auth/Signup"));
import Dashboard from "../page/Home";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "../components/loading/PageLoading";
import { UserLogin } from "../components/auth/UserLogin ";
import { CustomLogin } from "../components/auth/CustomeLogin";
const AppRoutes = () => {
  // const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route
        caseSensitive
        path="/auth/register/"
        element={
          <Suspense fallback={<PageLoading />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path="/auth/loginuser/"
        element={
          <Suspense fallback={<PageLoading />}>
            <CustomLogin />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path="/auth/login/"
        element={
          <Suspense fallback={<PageLoading />}>
            <UserLogin />
          </Suspense>
        }
      />
      <Route
        caseSensitive
        path="/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    // <Routes>
    //   {token ? (
    //     <Route
    //       caseSensitive
    //       path="/*"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   ) : (
    //     <Route
    //       caseSensitive
    //       path="/auth/register/"
    //       element={
    //         <Suspense fallback={<PageLoading />}>
    //           <Signup />
    //         </Suspense>
    //       }
    //     />
    //   )}

    //   {token ? (
    //     <Route
    //       caseSensitive
    //       path="/*"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   ) : (
    //     <Route
    //       caseSensitive
    //       path="/auth/loginuser/"
    //       element={
    //         <Suspense fallback={<PageLoading />}>
    //           <UserLogin />
    //         </Suspense>
    //       }
    //     />
    //   )}

    //   {token ? (
    //     <Route
    //       caseSensitive
    //       path="/*"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   ) : (
    //     <Route
    //       caseSensitive
    //       path="/auth/login/"
    //       element={
    //         <Suspense fallback={<PageLoading />}>
    //           <Signin />
    //         </Suspense>
    //       }
    //     />
    //   )}
    // </Routes>
  );
};
export default AppRoutes;
