import { Navigate } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';

const PublicRoute = ({ children }) => {
  const isLogged = useAuth();
  console.log(isLogged);
  return isLogged ? <Navigate to="/inbox" /> : children;
}

export default PublicRoute;
