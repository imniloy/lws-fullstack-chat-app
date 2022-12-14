import React, { useState } from "react";
import EditSvgIcon from "../../react-svg/EditIcon";
import ChatItems from "./ChatItems";
import Madal from "./utils/Madal";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controller = () => setIsOpen((prevState) => !prevState);

  return (
    <section className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      {isOpen && <Madal controller={controller} />}

      <div className="h-[65px] text-center text-grey-500 p-4 border-b border-gray-300 flex md:justify-end justify-center">
        <EditSvgIcon onClick={controller} />
      </div>
      <ChatItems />
    </section>
  );
};

export default SideBar;
