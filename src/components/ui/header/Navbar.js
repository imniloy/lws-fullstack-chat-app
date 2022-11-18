import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/lws-logo-dark.svg';
import { userLoggedOut } from '../../../features/auth/authSlice';
import { useEffect } from 'react';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const [loggedout, setLoggedOut] = useState(false);
  const logoutHandler = () => setLoggedOut((prev) => !prev);

  useEffect(() => {
    if (loggedout) {
      dispatch(userLoggedOut());
      localStorage.clear();
    };
  }, [loggedout, dispatch]);


  return (
    <nav
      className="border-general relative border-b bg-violet-700 transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/inbox">
            <img className="h-10 cursor-pointer" src={LogoImage} alt="lws logo" />
          </Link>
          <ul>
            <li className="text-white p-1 cursor-pointer font-bold" onClick={logoutHandler}>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
