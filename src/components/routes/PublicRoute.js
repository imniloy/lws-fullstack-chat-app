import { Navigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const isLogged = useAuth();
  return isLogged ? <Navigate to="/inbox" /> : children;
};

export default PublicRoute;
