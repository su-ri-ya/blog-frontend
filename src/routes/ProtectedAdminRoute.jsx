import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const ProtectedAdminRoute = () => {
  const { admin, loading } = useAuth();

  if (loading) return <div>Loading auth…</div>;

  if (!admin) {
   
    return <Navigate to="/login" replace />;
  }

 
  return <Outlet />;
};


export default ProtectedAdminRoute;
