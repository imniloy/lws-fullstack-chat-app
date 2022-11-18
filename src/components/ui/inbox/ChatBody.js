import React from 'react';
import Messages from './message/Messages';
import MessagesFooter from './message/MessagesFooter';
import MessagesHeader from './message/MessagesHeader';

const ChatBody = () => {
  return (
    <section className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <MessagesHeader />
        <Messages />
        <MessagesFooter />
      </div>
    </section>
  );
}

export default ChatBody;
