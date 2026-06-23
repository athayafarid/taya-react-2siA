import { Navigate, useLocation } from "react-router-dom";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    const redirectTo = role === "member" ? "/member-dashboard" : "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
