import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (typeof isAuthenticated === "boolean") {
      if (token || token !== null) {
        navigate("/dashboards/crm/");
        if (pathname === "/") {
          navigate("/dashboards/crm/");
        }
      }
      if (!token || token === null) {
        navigate("/auth/loginuser");
      }
    }
  }, [isAuthenticated, token, pathname, navigate]);
  if (typeof isAuthenticated !== "boolean") {
    return <></>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
