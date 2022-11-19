import React from 'react';
import HappyIcon from '../../../react-svg/HappyIcon';
import SendIcon from '../../../react-svg/SendIcon';
import Button from '../utils/Button';
import { useState } from 'react';
import { useAddMessageMutation } from '../../../../features/messages/messagesApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MessagesFooter = ({ info }) => {
  const { id } = useParams();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: loggedInUserEmail, name: loggedInUserName, id: loggedInUserId } = loggedInUser || {};
  const { receiver, sender } = info;
  const receiverUser = receiver?.email !== loggedInUserEmail ? receiver : sender;

  const [message, setMessage] = useState('');
  const [addMessage, { data }] = useAddMessageMutation();
  const disableSubmitButton = message.length > 0 ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      addMessage({
        conversationId: id,
        message,
        timestamp: new Date().getTime(),
        receiver: receiverUser,
        sender: {
          email: loggedInUserEmail,
          name: loggedInUserName,
          id: loggedInUserId
        }
      })
    };

    setMessage('');
  };

  console.log(data);
  return (
    <>
      <form
        className="flex items-center justify-between w-full p-3 border-t border-gray-300"
        onSubmit={handleSubmit}>
        <Button Icon={<HappyIcon />} />

        <input
          type="text"
          placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          type="submit"
          className={`disabled:hidden`}
          disabled={disableSubmitButton}
          Icon={<SendIcon />}
        />
      </form>
    </>
  );
}

export default MessagesFooter;
