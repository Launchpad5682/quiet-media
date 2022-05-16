import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FullPageLoader } from "../../common/organisms//FullPageLoader/FullPageLoader";

export const Landing = () => {
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const loading = useSelector((state) => state.authentication.loading);

  if (loading) {
    return <FullPageLoader />;
  } else if (authenticated && !loading) {
    return <Navigate to="/home" />;
  }

  return <>Landing Page</>;
};
