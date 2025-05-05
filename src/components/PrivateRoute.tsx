import { Navigate } from "react-router-dom";
import { isEmpty } from "lodash";

import { RouteBase } from "@/routes/routeUrl";
import { useAuth } from "@/providers/AuthProvider";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (isEmpty(user)) {
    // user is not authenticated
    return <Navigate to={RouteBase.RegisterTMN} />;
  }
  return children;
};
export default PrivateRoute;
