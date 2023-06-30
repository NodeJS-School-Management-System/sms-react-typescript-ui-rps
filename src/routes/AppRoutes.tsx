import { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../page/Home";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "../components/loading/PageLoading";
import { UserLogin } from "../components/auth/UserLogin ";
import { CustomLogin } from "../components/auth/CustomeLogin";
import { CustomRegister } from "../components/auth/CustomRegister";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    toast.info("your session has expired, Login again to proceed!");
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/auth/loginuser/");
    window.location.reload();
  };

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(
        token
        // import.meta.env.VITE_REACT_APP_JWT_SECRET
      );

      if (decodedToken.exp) {
        const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
        const currentTime = new Date().getTime();

        if (currentTime < expirationTime) {
          // User is authenticated
          setIsAuthenticated(true);

          // Check token expiration periodically
          const checkTokenExpiration = setInterval(() => {
            const newCurrentTime = new Date().getTime();

            if (newCurrentTime >= expirationTime) {
              // Token expired, log out the user
              clearInterval(checkTokenExpiration);
              logout();
            }
          }, 1000); // Check every second (adjust as needed)
        } else {
          // Token expired, log out the user
          logout();
        }
      } else {
        // logout();
        console.log("No exp time in toke");
        setIsAuthenticated(false);
      }
    } else {
      // logout();
      console.log("No token");
    }
  }, []);

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
          isAuthenticated ? (
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
