import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FullPageLoader } from "../common/organisms/FullPageLoader/FullPageLoader";

export const PrivateRoute = ({ children }) => {
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const loading = useSelector((state) => state.authentication.loading);

  if (loading) {
    return <FullPageLoader />;
  } else if (authenticated && !loading) {
    return children;
  }
  return <Navigate to="/login" />;
};
