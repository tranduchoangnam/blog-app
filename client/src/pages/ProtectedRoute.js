import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Login from "../components/Login";
const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/login" replace="true" />;
  }
  return children;
};
export default ProtectedRoute;
