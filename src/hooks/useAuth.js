import { useSelector } from "react-redux";


const useAuth = () => {
  const auth = useSelector(state => state.auth);
  const isLogged = (auth?.accessToken && auth?.user) ? true : false;
  return isLogged;
}

export default useAuth;
