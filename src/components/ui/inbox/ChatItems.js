import React from 'react';
import { useSelector } from 'react-redux';
import { useGetConversationsQuery } from '../../../features/conversations/conversationsApi';
import ChatItem from './ChatItem';

const ChatItems = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: loggedInUserEmail } = loggedInUser || {};
  const { data: conversations, isLoading, isError, error, isSuccess } = useGetConversationsQuery(loggedInUserEmail);

  let content;
  if (isLoading) {
    content = <li className='w-full flex py-2 justify-center'>
      <span>Loading</span>
    </li>
  };

  if (!isLoading && isError) {
    content = <li className='w-full bg-red-500 text-white font-bold flex py-2 justify-center'>
      <span>{error.error}</span>
    </li>
  };

  if (!isLoading && !isError && isSuccess) {

    content = conversations?.map((conversationItem) => {
      const { id, users, message, timestamp } = conversationItem || {};
      const participantUser = users?.find((user) => user?.email !== loggedInUserEmail) || {};
      const { name: participantName, email: participantEmail } = participantUser || {};
      return <ChatItem key={id} name={participantName} email={participantEmail} message={message} timestamp={timestamp} />
    })
  };

  return (
    <div>
      <ul className="overflow-auto">
        {content}
      </ul>
    </div>
  );
}

export default ChatItems;
