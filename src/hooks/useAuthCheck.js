import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    
    if (localAuth?.accessToken && localAuth?.user) {
      dispatch(userLoggedIn({
        accessToken: localAuth.accessToken,
        user: localAuth.user
      }));
    };

    setAuthCheck(true);
  }, [authCheck, dispatch]);

  return authCheck;
}

export default useAuthCheck;
