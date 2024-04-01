import { Navigate, Outlet } from "react-router";

import { useAuthContext } from "../../../context/context";
import { LoadingPageState } from "../layout/loading-page-state";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return <LoadingPageState />;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return <>{children ?? <Outlet />}</>;
}
