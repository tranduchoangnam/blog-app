import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/login" replace="true" />;
  }
  return children;
};
export default ProtectedRoute;
