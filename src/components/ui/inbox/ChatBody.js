import React from "react";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Messages from "./message/Messages";
import MessagesFooter from "./message/MessagesFooter";
import MessagesHeader from "./message/MessagesHeader";

const ChatBody = () => {
  let { id } = useParams();
  const {
    data: messages,
    isLoading,
    isError,
    isSuccess,
  } = useGetMessagesQuery(id);

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-full flex justify-center items-center">
        <span>Loading ...</span>
      </div>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className="w-full grid h-full justify-center items-center">
        <span className="font-bold text-red-500">
          Network Error! Failed to Fatch
        </span>
      </div>
    );
  }

  if (!isLoading && !isError && isSuccess) {
    console.log(messages);
    content = (
      <div className="w-full grid conversation-row-grid">
        <MessagesHeader message={messages[0]} />
        <Messages messages={messages} />
        <MessagesFooter info={messages[0]} />
      </div>
    );
  }

  return (
    <section className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">{content}</div>
    </section>
  );
};

export default ChatBody;
