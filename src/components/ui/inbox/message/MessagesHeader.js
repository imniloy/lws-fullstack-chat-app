import React from 'react';
import { useSelector } from 'react-redux';
import gravatarUrl from 'gravatar-url';

const MessagesHeader = ({ message }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: loggedInUserEmail } = loggedInUser || {};
  const { receiver, sender } = message;
  const user = receiver?.email !== loggedInUserEmail ? receiver : sender;

  return (
    <div
      className="relative flex items-center p-3 border-b border-gray-300"
    >
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={gravatarUrl(user?.email, { size: 80 })}
        alt="username"
      />
      <span className="block ml-2 font-bold text-gray-600"
      >{user?.name}</span
      >
      <span
        className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"
      >
      </span>
    </div>
  );
}

export default MessagesHeader;
