import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <div>please wait</div>
      </>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" />;
}

export default PrivateRoute;
