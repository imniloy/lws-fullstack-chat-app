import React from 'react';
import Navbar from '../components/ui/header/Navbar';
import ChatBody from '../components/ui/inbox/ChatBody';
import SideBar from '../components/ui/inbox/SideBar';

const InboxPage = () => {

  return (
    <div>
      <Navbar />
      <section className={`max-w-7xl mx-auto -mt-1 calc(h-[100%] -129px)`}>
        <div
          className="min-w-full border rounded flex lg:grid lg:grid-cols-3 min-h-full">
          <SideBar />
          <ChatBody />
        </div>
      </section>
    </div>
  );
}

export default InboxPage;
