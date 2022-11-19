import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = ({ messages }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: loggedInUserEmail } = loggedInUser || {};
  let content = null;

  if (messages.length === 0) {
    content = <div className="flex w-full font-bold min-h-full text-xl text-violet-700 my-auto justify-center">Start Your Conversation</div>
  } else {
    content = messages
      .slice()
      .sort((messageOne, messageTwo) => messageOne?.timestamp - messageTwo?.timestamp)
      .map((messageData) => {
        const { id, sender, message } = messageData || {};
        return <Message key={id}
          justify={sender?.email === loggedInUserEmail ? "end" : "start"}
          message={message} />
      });
  }

  return (
    <div
      className={`relative p-6 
    ${messages.length === 0 ? 'flex flex-col' : 'flex flex-col-reverse'} 
    overflow - y - auto w - full h - [calc(100vh_ - _197px)]`}
    >

      <ul className="space-y-3">
        {content}
      </ul>

    </div>
  );
}

export default Messages;
