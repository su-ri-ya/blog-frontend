import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = () => {
  const { admin, loading } = useAuth();

  if (loading) return null;

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
