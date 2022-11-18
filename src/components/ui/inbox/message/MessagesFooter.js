import React from 'react';
import HappyIcon from '../../../react-svg/HappyIcon';
import SendIcon from '../../../react-svg/SendIcon';
import Button from '../utils/Button';

const MessagesFooter = () => {
  return (
    <div
      className="flex items-center justify-between w-full p-3 border-t border-gray-300"
    >
      <Button Icon={<HappyIcon />} />

      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
      />
      <Button type="submit" Icon={<SendIcon />} />
    </div>
  );
}

export default MessagesFooter;
