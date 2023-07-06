import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
